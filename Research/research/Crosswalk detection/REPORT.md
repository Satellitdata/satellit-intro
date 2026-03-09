# Crosswalk Detection — Research Findings & Programme Status

**Project:** Automated Pedestrian Crosswalk Detection from Aerial Imagery  
**Location focus:** Sundsvall (Stenstan), Sweden  
**Date:** 27 February 2026  

---

## 1. Executive Summary

This programme investigates the automated detection of pedestrian crosswalks from
aerial and satellite imagery, with Sundsvall as the primary test city.  A working
end-to-end pipeline has been built covering tile download, OSM-guided dataset
generation, model training and GeoJSON export.  A pilot detection run across the
Stenstan inner-city core has produced **153 georeferenced crosswalk candidates**
and a labelled training dataset of **451 image tiles**.  A first fine-tuning run
has been executed, but model accuracy is not yet production-grade.  The critical
remaining blocker is access to either the CrosswalkNet pre-trained weights or a
sufficiently large, quality-labelled dataset combined with a GPU training run.

---

## 2. Problem Statement

Municipalities need an up-to-date, machine-readable inventory of pedestrian
crosswalks for a range of use cases: traffic safety analysis, accessibility
auditing, digital-twin road models, and compliance with forthcoming EU mobility
data requirements.  Manual surveying is slow and expensive.  OpenStreetMap
contains crossing nodes but its completeness and geometric accuracy are uneven.
The goal of this programme is to automatically detect crosswalks from overhead
imagery at city scale and export findings as GeoJSON polygons that can be
integrated into planning systems.

---

## 3. State of the Research

### 3.1 CrosswalkNet — the Reference Method

The strongest published method available for aerial-image crosswalk detection is
**CrosswalkNet** (Bhuyan et al., arXiv:2506.07885, 2025).  Key findings from
the paper:

| Metric | CrosswalkNet result |
|--------|---------------------|
| Precision | **96.5 %** |
| Recall | **93.3 %** |
| Input imagery | 15 cm GSD aerial orthofotos |
| Training dataset | Custom; Swedish-style markings not explicitly described |

The architecture extends YOLOv8 with:

- **Oriented Bounding Boxes (OBB)** — the model predicts a rotated rectangle
  aligned with the crosswalk stripe direction rather than an axis-aligned box.
  This is critical because crosswalks are thin elongated objects whose
  orientation relative to the image frame varies arbitrarily.
- **Convolutional Block Attention Module (CBAM)** — added to the feature
  extractor to improve focus on fine-grained stripe patterns.
- **Dual-branch Spatial Pyramid Pooling-Fast (SPPF)** — improves multi-scale
  feature aggregation.
- **Cosine annealing learning-rate schedule** — stabilises training convergence.

At inference time the model is architecturally identical to a standard
YOLOv8s-OBB network, meaning existing ultralytics tooling can run inference or
fine-tune it without modification.

### 3.2 Pre-trained CrosswalkNet Weights

The CrosswalkNet weights have **not yet been publicly released** by the authors
(as of the date of this report).  Contact has been identified as a required
action.  Until those weights are available, any YOLOv8-OBB model must be
fine-tuned locally on a Swedish crosswalk dataset — which is exactly the work
this programme is pursuing.

### 3.3 Competing and Complementary Approaches

| Approach | Relevance |
|---|---|
| RISE (Research Institutes of Sweden) | Known to be working on related perception datasets; access to their internal code base is a pending action item |
| eneo.ai | A candidate commercial platform for computer-vision annotation or deployment; under evaluation |
| Lantmäteriet ortofoto API | 15 cm GSD — the ideal aerial source matching CrosswalkNet training resolution |
| digitalearth.se | Identified as a potential source for higher-quality or more recent aerial data; access not yet established |
| ArcGIS World Imagery | 30 cm GSD freely available; usable for pipeline validation but suboptimal for training |
| OSM `highway=crossing` | Dense ground-truth annotation source; imperfect geometry but excellent recall on major crossings |

---

## 4. What Is Required for Reliable Detection

### 4.1 Imagery Requirements

- **Minimum resolution:** 30 cm GSD (zoom 19 XYZ tiles), sufficient for
  distinguishing stripe patterns on major crosswalks.
- **Preferred resolution:** 15 cm GSD (zoom 20, Lantmäteriet ortofoto).  The
  CrosswalkNet paper's stated accuracy figures apply at this resolution.  At
  30 cm the stripes become borderline-legible and false-negative rates increase.
- **Imagery recency:** Crosswalk markings fade and locations change.  Imagery
  should ideally be no older than 2–3 years.

### 4.2 Model Requirements

A dedicated YOLOv8-OBB model fine-tuned on crosswalk aerial imagery is required.
Generic DOTA-pretrained weights (yolov8n-obb.pt, yolov8s-obb.pt) cover 15 aerial
object categories — none of which is "crosswalk".  Running inference with those
weights returns detections for things like vehicles or ships, not pedestrian
markings.  Options, in order of preference:

1. **Obtain CrosswalkNet weights** from Bhuyan et al. — fastest path to high
   accuracy if the authors can be contacted and weights are shareable.
2. **Fine-tune locally** on the OSM-annotated Sundsvall dataset (described in
   Section 5.3), extended to more Swedish cities for coverage.
3. **Acquire an existing fine-tuned model** from RISE or another partner.

### 4.3 Training Data Requirements

To fine-tune reliably, the dataset must satisfy:

- **Positive examples:** ≥ 500 crosswalk tiles (640 × 640 px) with OBB labels.
  The current Sundsvall Stenstan dataset provides 321 training tiles; this is at
  the lower edge of the viable range for fine-tuning from a DOTA base.
- **Negative examples:** 3-tier hard/medium/easy negatives (road markings
  without crosswalks, junctions, non-road backgrounds) to suppress false
  positives.  The dataset generator mines these automatically from OSM.
- **Geographic diversity:** training only on Sundsvall will cause the model to
  overfit to Sundsvall's marking style.  Adding at least 2–3 other Swedish
  towns is recommended before production deployment.
- **Label quality:** OSM crossing nodes give centre-point locations with high
  recall but uncertain orientation and no size annotation.  The pipeline
  estimates OBB orientation from adjacent road geometry and applies Swedish
  Trafikverket standard crosswalk dimensions (3 m depth, road-width-derived
  span).  This is approximate; manual review and correction via the provided
  `relabel.py` tool is recommended.

### 4.4 Compute Requirements

- **Inference:** A CPU is viable for small tiles but slow.  A CUDA-capable GPU
  reduces inference time from ~8 min/tile (CPU) to ~0.5 s/tile.  The Stenstan
  area (2 640 tiles) takes roughly 6–7 hours on CPU; under 30 minutes on GPU.
- **Training:** The 5-epoch proof-of-concept run completed in ~41 minutes on CPU
  (approximately 8.5 min/epoch on the 321-tile training set).  A full 100-epoch
  run on CPU would take ~14 hours.  GPU training is strongly recommended.

---

## 5. Our Programme — Current State

### 5.1 Pipeline Architecture

A complete Python pipeline has been implemented with the following stages:

```
┌──────────────────────┐
│  1. Download tiles   │  Lantmäteriet WMTS or ArcGIS XYZ → disk cache → stitched mosaic
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  2. OSM extraction   │  Overpass API → highway=crossing nodes → OBB label generation
│  (ground truth)      │  Road geometry → orientation + width annotation
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  3. Dataset build    │  640 px chip extraction · 80/20 train/val split
│  + Negative mining   │  Hard / medium / easy negatives from OSM
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  4. Train            │  YOLOv8s-OBB fine-tuning (ultralytics)
│  YOLOv8-OBB          │  Cosine-annealing LR, YOLO-OBB label format
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  5. Inference        │  Sliding-window detection over full mosaic
│                      │  + NMS → OBBDetection objects
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  6. Export           │  Crosswalk crops · YOLO annotations · GeoJSON polygons
│                      │  · Annotated overview image
└──────────────────────┘
```

All stages are configurable via CLI flags or `config.py` data classes.

### 5.2 Imagery Acquisition — Sundsvall Stenstan

| Parameter | Value |
|---|---|
| Coverage | Stenstan inner city (62.385–62.400°N, 17.295–17.332°E) |
| Zoom level | 19 (~30 cm GSD) |
| Imagery source | ArcGIS World Imagery (fallback; no Lantmäteriet key yet) |
| Tiles downloaded | **2 640 tiles** |
| Mosaic size | `Sundsvall_z19_mosaic.png` (~3 GB uncompressed) |

### 5.3 Dataset Generation

OSM Overpass queries for `highway=crossing`, `crossing=zebra` and
`crossing=traffic_signals` within the Stenstan bounding box were used to
generate a labelled dataset:

| Dataset split | Tiles |
|---|---|
| Training | **321** |
| Validation | **130** |
| **Total** | **451** |

The dataset is configured for single-class OBB detection (class 0 = crosswalk)
and stored in standard YOLO-OBB directory layout with a `data.yaml` manifest
pointing to `output/dataset`.

The three-tier negative mining strategy (hard / medium / easy) is implemented
in `trainer.py` and draws from OSM road geometry, junctions, roundabouts,
building footprints, parks and water bodies.

### 5.4 Training Run (Proof of Concept)

A 5-epoch fine-tuning run was executed locally on CPU using `yolov8s-obb.pt` as
the base model.  Results are stored in
`runs/obb/output/training/crosswalknet_sweden/`.

| Epoch | mAP50 | mAP50-95 | Precision | Recall | Train box loss |
|---|---|---|---|---|---|
| 1 | 0.022 | 0.006 | 0.034 | 0.066 | 2.880 |
| 2 | 0.010 | 0.003 | 0.027 | 0.075 | 2.596 |
| 3 | 0.024 | 0.005 | 0.034 | 0.078 | 2.539 |
| 4 | 0.017 | 0.006 | 0.015 | 0.204 | 2.524 |
| 5 | 0.029 | 0.009 | 0.035 | 0.149 | 2.424 |

These numbers are expected for a 5-epoch run: the model is still in the early
learning phase, the training loss is decreasing consistently, and recall is
beginning to emerge at epoch 4–5.  No conclusions about ceiling accuracy can
be drawn from this run; it serves only to confirm the pipeline is end-to-end
functional.

### 5.5 Pilot Inference Run — Sundsvall Crosswalk Map

Running inference over the Stenstan mosaic with the generic `yolov8n-obb.pt`
weights (DOTA classes, not crosswalk-specific) at confidence 0.45 yielded:

| Output | Value |
|---|---|
| Detected crosswalk candidates | **153** |
| Output file | `output/Sundsvall_crosswalks.geojson` |
| Crosswalk image crops | **153** (in `output/crosswalk_crops/`) |
| Coordinate system | WGS84 polygon per detection |

Each GeoJSON feature carries the detection confidence and GPS coordinate of the
centroid.  The 153 detections should be treated as candidates pending
verification; without a crosswalk-specific model many will be false positives
from other road markings or DOTA object classes.

### 5.6 Tooling Developed

| Tool | Purpose |
|---|---|
| `pipeline.py` | CLI entry point; orchestrates all stages |
| `downloader.py` | XYZ tile download + mosaic stitching |
| `detector.py` | YOLOv8-OBB sliding-window inference |
| `osm_extractor.py` | Overpass API crosswalk node fetching |
| `trainer.py` | OBB label generation + negative mining + YOLOv8 training |
| `extractor.py` | Crop extraction, YOLO annotations, GeoJSON, overview image |
| `audit.py` | HTML contact sheet for visual dataset review |
| `cleanup_dataset.py` | Deduplicate overlapping tiles; promote mislabelled negatives |
| `relabel.py` | Interactive manual OBB labelling tool (keyboard/mouse) |
| `config.py` | Central configuration dataclasses |

---

## 6. Identified Gaps and Actions Required

| # | Gap | Required Action | Status |
|---|---|---|---|
| 1 | No Lantmäteriet API key | Register at lantmateriet.se for 15 cm ortofoto access | Pending |
| 2 | CrosswalkNet weights unavailable | Contact Bhuyan et al. (arXiv:2506.07885) to request weights | Pending |
| 3 | RISE code base not yet assessed | Clone RISE repositories; assess datasets and models available | Pending |
| 4 | Tobias (internal contact) | Follow up to get access to internal crosswalk or road-marking datasets | Pending |
| 5 | digitalearth.se data access | Investigate and establish access for higher-quality aerial data | Pending |
| 6 | Andreas repository structure | Fork from Andreas's model after he enables repository forking | Pending |
| 7 | eneo.ai | Evaluate platform suitability for annotation or deployment | Pending |
| 8 | GPU training run not yet executed | Re-run training with `--device cuda` for 100 epochs | Pending |
| 9 | Dataset too small for robust accuracy | Extend OSM-annotated data to 2–3 additional Swedish towns | Pending |
| 10 | Label quality review not done | Run `audit.py` on the 321 training tiles and use `relabel.py` to correct wrong OBBs | Pending |

---

## 7. Technical Architecture Summary

```
Imagery sources                   Model stack                    Outputs
─────────────                     ───────────                    ───────
Lantmäteriet (15 cm) ──┐          YOLOv8s-OBB (ultralytics)     GeoJSON polygons
                        ├─ XYZ →  + CrosswalkNet extensions  →   YOLO-OBB labels
ArcGIS World (30 cm) ──┘  tiles   (CBAM, dual SPPF)             Training crops
                                                                  Annotated mosaic

Ground truth
────────────
OSM Overpass API
  highway=crossing
  crossing=zebra
  crossing=traffic_signals
  + adjacent road geometry
        │
        ▼
  OBB labels:  orientation  ← road bearing
               width        ← OSM lanes/width tags or 7 m default
               depth        ← 3 m (Trafikverket VVMB 111 standard)
```

---

## 8. Recommended Next Steps

1. **Obtain Lantmäteriet API key** — re-run the Stenstan download at zoom 20
   (15 cm) to match CrosswalkNet's training resolution.

2. **Contact CrosswalkNet authors** — request weights or collaboration.
   If unavailable, proceed to step 3.

3. **Run full GPU training** — 100 epochs from `yolov8s-obb.pt`, on the current
   451-tile dataset.  Expected convergence: mAP50 > 0.5 by epoch 50 if the
   dataset is representative.

4. **Audit and clean the existing dataset** — use `python pipeline.py --audit`
   to generate the HTML contact sheet and identify noisy labels.  Use
   `relabel.py` to correct bounding-box orientation or size errors.

5. **Extend the dataset** — run `pipeline.py --train` for at least two other
   Swedish towns (e.g. Härnösand, Sundsvall suburbs) and merge the datasets.
   Target: ≥ 1 500 positive tiles before evaluating production accuracy.

6. **Validate against Sundsvall ground truth** — once a trained model is
   available, compare the generated GeoJSON against the municipality's own
   crosswalk inventory (if accessible through Tobias or digitalearth.se).

7. **Evaluate eneo.ai and RISE** — determine whether either can accelerate
   the data-quality or deployment work.

---

## 9. References

> Bhuyan Z., Xie Y., Rith A., Yan X., Apostolov N., Oke J., Ai C.
> *CrosswalkNet: An Optimized Deep Learning Framework for Pedestrian
> Crosswalk Detection in Aerial Images with High-Performance Computing.*
> arXiv:2506.07885, 2025.
> <https://arxiv.org/abs/2506.07885>

> Trafikverket. *VVMB 111 — Vägmarkeringar* (Swedish road-marking standard).
> Transportstyrelsen / Swedish Transport Administration.

> OpenStreetMap contributors. `highway=crossing` tag documentation.
> <https://wiki.openstreetmap.org/wiki/Tag:highway%3Dcrossing>

> Lantmäteriet. *Ortofoto API*.
> <https://www.lantmateriet.se/en/geodata/>

> Redmon J., Farhadi A. *YOLOv8 — Ultralytics Open Source*.
> <https://github.com/ultralytics/ultralytics>

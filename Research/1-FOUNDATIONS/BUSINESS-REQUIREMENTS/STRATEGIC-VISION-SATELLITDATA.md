# Strategisk vision – Satellitdata och civil ledningsarkitektur

**Version:** 0.2  
**Datum:** 2026-03-05  
**Status:** Under arbete  
**Grundat på:** Strategiskt samtal 2026-02-24  
**Projektförankring:** RECON – finansierat av Rymdstyrelsen, Sundsvall och Ånge kommun (2026–2027)

---

## Vision

> Vi utvecklar en interoperabel civil ledningsarkitektur där satellitdata är en sensor i ett större ekosystem – och där kommuner, regioner, myndigheter och privata operatörer kan dela lägesbild och samverka vid händelser, utan att ge upp äganderätten till sina egna system och data.
>
> Visionen realiseras initialt genom projektet **RECON** (Resilient miljö- och samhällsobservationsnod), där Sundsvall och Ånge kommun bygger och testar en satellitbaserad dataplattform för kommunal drift, miljötillsyn och samhällsutveckling – finansierat av Rymdstyrelsen 2026–2027.

---

## Strategiska mål

### Mål 1 – Gemensam lägesbild (COP)
Etablera en gemensam operativ bild (Common Operating Picture) baserad på öppna standarder och GIS som nav, tillgänglig för alla samverkande aktörer vid kris och störning.

### Mål 2 – Satellitdata som operativ sensor
Integrera satellitdata (realtid <3 min, kommersiell och historisk) som en standardiserad datakälla i den civila ledningsarkitekturen – jämställd med andra sensorer (IoT, drönare, fältrapporter). I RECON kombineras detta med Lantmäteriets Nationella Geodataplattform (NGP), Diwise IoT och kommunala verksamhetssystem.

### Mål 3 – Federerad samverkan (FMN-inspirerat)
Skapa ett samverkansramverk där varje organisation behåller sina system, men snabbt kan ansluta till en tillfällig samverkansmiljö vid behov. Inspirerat av NATO:s Federated Mission Networking (FMN).

### Mål 4 – Kontrollerad evolution via spiraler
Leverera arkitekturen stegvis i fyra spiraler, där varje spiral ger ett färdigt och användbart resultat:

| Spiral | Fokus | Leveranser |
|--------|-------|------------|
| **Spiral 1** | Minsta samverkan | Gemensam karta + incidentobjekt + grundläggande datadelning *(RECON: miljötillsyn och proaktiv vägdrift)* |
| **Spiral 2** | Realtid och styrning | Realtidsflöden + rollbaserad åtkomst + spårbarhet |
| **Spiral 3** | Automatisering och AI | Automatiserade arbetsflöden + AI-stöd + edge/satellit som sensor |
| **Spiral 4** | Federerad intelligens | Federerad inlärning + agentiska beslut + multi-domän orchestration |

### Mål 5 – Standardiserade informationsformat
Definiera en civil motsvarighet till NATO:s Message Text Formats (MTF/ADatP-3) – ett gemensamt meddelandeformat för händelser, statusrapporter och objekt, serialiserat som JSON och kompatibelt med OGC API Features / SensorThings.

### Mål 6 – Modulär och upphandlingsbar arkitektur (MOSA)
All teknik upphandlas enligt principerna för Modular Open Systems Architecture (MOSA): öppna standarder, utbytbara komponenter, ingen inlåsning mot enskilda leverantörer.

### Mål 7 – Stöd för kommunens dagliga drift och förvaltning
Arkitekturen ska vara användbar inte bara vid kriser, utan integreras i kommunens ordinarie verksamhet. Satellitdata och den gemensamma lägesbilden ska vara ett levande arbetsverktyg i den dagliga förvaltningen – inte enbart ett beredskapsverktyg som aktiveras vid händelse.

---

## Daglig drift och förvaltning i kommunal vardag

En central insikt är att värdet av arkitekturen måste realiseras i det dagliga arbetet – inte bara under kriser. Om systemet bara används vid händelser blir det aldrig välbekant, välunderhållet eller välfinansierat.

### Dagliga användningsfall per förvaltning

| Förvaltning | Dagligt behov | Satellitdata/sensor-bidrag |
|---|---|---|
| **Teknisk förvaltning** | Vägnätsövervakning, skadebedömning, vinterväghållning | Markförändringar, snödjup, vägytestatus |
| **Räddningstjänst** | Riskanalys, resursplanering, tillståndsansökningar | Brandriskkarta, vegetationsanalys, höjddata |
| **Samhällsbyggnad/Plan** | Detaljplaner, exploatering, klimatanpassning | Markrörelser, översvämningsmodellering, markanvändning |
| **VA och renhållning** | Ledningsstatus, dagvattenhantering, sprickbildning | Sättningar, markfukt, flödesanalys |
| **Miljö och hälsa** | Naturinventering, luftkvalitet, algblomning | Vegetationsindex (NDVI), vattentemperatur, partikelspridning |
| **Skola och omsorg** | Trygga skolvägar, tillgänglighet, fastighetsstatus | Snö/is på gångvägar, byggnadsstatus |

### Förvaltningsprinciper

- **Kontinuerlig drift** – Systemet är aktivt och uppdaterat dagligen, inte bara vid aktivering. Aktörer loggar in regelbundet som en del av sitt arbete.
- **Förvaltningsägare** – Varje kommunal förvaltning pekar ut en informationsägare och en teknisk kontaktperson för sin datadelning.
- **Versionshanterad data** – Alla objekt (vägar, anläggningar, riskzoner) versionshanteras så att förändringar över tid kan spåras.
- **Driftsatta SLA:er** – Datakällor och integrationer har definierade tillgänglighets- och uppdateringskrav (t.ex. "GIS-skikt uppdateras senast 24h efter förändring").
- **Utbildning och rutin** – Personal tränas löpande. Systemet övas regelbundet, inte bara vid skarpt läge.

### Från krisverktyg till förvaltningsplattform

Målet är att samma plattform används längs hela beredskapskedjan:

1. **Vardagsförvaltning** – tillståndsärenden, planering, teknisk uppföljning
2. **Förhöjd beredskap** – ökad monitorering, fler aktörer inkopplade, utökad datadelning
3. **Skarp händelse** – full COP, samverkan med region, MSB och privata operatörer
4. **Återgång och utvärdering** – dokumentation, skadebedömning, lärdomar

Detta säkerställer att organisationen alltid är redo – eftersom plattformen redan är en del av vardagen.

---

## Scope

### Ingår
- Civil ledningsförmåga: kommuner, regioner, statliga myndigheter, privata operatörer inom samhällsviktig infrastruktur
- Händelsetyper: naturolyckor (storm, översvämning, brand, ras), infrastrukturstörningar, cyberincidenter, samhällsstörningar
- **Daglig förvaltning**: teknisk förvaltning, samhällsbyggnad, VA, räddningstjänst, miljö, planering
- **Specifika tillämpningar (RECON)**: miljötillsyn, illegal dumpning, vägslitage, slyhantering, invasiva arter, grönstrukturuppföljning
- Datakällor: satellitdata (realtid, kommersiell, historisk), IoT-sensorer (Diwise), drönare, fältrapporter, GIS-skikt, NGP (Lantmäteriet)
- Verktyg och plattformar: Origo Map, QGIS, Eneo AI, Diwise IoT, ärendehanteringssystem
- Domäner: jordbruk, skogsindustri, infrastruktur, räddningstjänst, krisledning, kommunal planering och förvaltning

### Avgränsningar
- Militär klassificerad information ingår inte
- Realtidsvideodistribution och satellitmanövrering hanteras senare
- Federerad inlärning (AI) är ett Spiral 4-mål, ej ett startkrav

---

## Vägledande principer

1. **Federerad äganderätt** – Varje organisation äger sina egna system och data. Samverkan sker via kontrollerade gränssnitt.
2. **Öppna standarder** – OGC, JSON, REST/API-first. Inga proprietära format som primär kanal.
3. **Spiral-driven leverans** – Värde levereras i varje steg. Ingen "big bang"-implementation.
4. **Sekretess by design** – Federated Learning och lokal databehandling där klassificering kräver det.
5. **Undvik inlåsning** – MOSA-principer tillämpas i all upphandling och arkitektur.
6. **Skalbarhet** – Arkitekturen ska fungera för en enskild händelse såväl som för en nationell kris.
7. **Vardagsnytta före krishöjd** – Plattformen ska ge värde i det dagliga arbetet. Beredskapsförmågan är en konsekvens av god vardagsförvaltning, inte ett separat läge.

---

## Begreppsordlista (NATO → Civil)

| NATO-begrepp | Civil motsvarighet |
|---|---|
| FMN | Samverkansramverk för kris/drift |
| Spiral-spec | Samverkansprofiler (versionerade kravpaket) |
| COP | Gemensam lägesbild i GIS |
| C2/C4ISR | Civil ledningsförmåga + sensorer + analys |
| ADatP/APP/MTF | Standardiserade händelse-/åtgärdsmeddelanden |
| MOSA | Modulär, upphandlingsbar arkitektur (undvik inlåsning) |
| Joining/Exit | Onboarding/offboarding för organisationer och system |

---

## Identifierade utmaningar

- Geodata är dyra att underhålla och bygger på manuella inventeringar som uppdateras vart 3–5 år – vilket leder till reaktiv planering och sena upptäckter
- Massiv sensorutbyggnad är kostsam; satellitdata erbjuder täckning utan infrastrukturbehovet
- Små kommuner (som Ånge) saknar resurser att självständigt driva digital transformation
- Små spetsaktörer saknar helhetsperspektiv och riskerar att bygga ö-lösningar
- Stora aktörer tenderar att skapa inlåsning via proprietära plattformar
- Offentlig sektor vet inte alltid vad som ska upphandlas – kravbilden är otydlig
- Myndigheter får inte sälja kommersiella tjänster – affärsmodellen måste designas rätt
- Data ges bort istället för att struktureras och nyttiggöras strategiskt

---

## Öppna strategiska frågor

- Ska civila system formellt följa NATO-standarder (FMN-kompatibilitet) eller en nationell civil profil?
- Hur hanteras juridik och GDPR vid realtidsdatadelning mellan myndigheter och privata aktörer?
- Hur finansieras plattformen – samfinansiering, MSB-uppdrag, EU-medel?
- Vem är ägare av den gemensamma lägesbilden?

---

## Nästa steg

**Pågående (RECON AP1–AP2, jan–jun 2026)**
- [ ] Etablera styrgrupp och projektorganisation (AP1)
- [ ] Genomföra behovsanalys och datainventering per förvaltning (AP2)
- [ ] Definiera och prioritera testcase: miljötillsyn och drift/underhåll (AP2)
- [ ] Kravspecifikation och kartläggning av datakällor inkl. NGP (AP2)

**Kommande (RECON AP3–AP5, apr 2026–dec 2027)**
- [ ] Dokumentera informationsmodell: objekt, händelse, åtgärd
- [ ] Definiera minimal civil samverkansprofil (Spiral 1-krav)
- [ ] Utforma driftsatta SLA:er för datakällor och integrationer
- [ ] Definiera rollprofiler: informationsägare och teknisk kontakt per förvaltning

**Strategiskt (löpande)**
- [ ] Förankra RECON-resultaten i eSamverkan Region Västernorrland
- [ ] Etablera spridningsplan mot SKR:s AI-nätverk och nationella nätverk
- [ ] Initiera dialog om långsiktig finansiering och förvaltning efter projektslut

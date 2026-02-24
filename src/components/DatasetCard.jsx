import { useState } from 'react'
import { ChevronDown, ExternalLink, Scan, Clock, Tag, Scale, Lightbulb } from 'lucide-react'

export default function DatasetCard({ dataset }) {
  const [expanded, setExpanded] = useState(false)

  const isFree = dataset.availability === 'free'

  return (
    <div
      className={`
        rounded-2xl border transition-all duration-500 overflow-hidden
        ${expanded
          ? `bg-surface border-edge-light ${isFree ? 'glow-success' : 'glow-warning'}`
          : 'bg-surface/60 border-edge hover:border-edge-light'
        }
      `}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 sm:p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep rounded-2xl"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-xl font-semibold text-white">
                {dataset.name}
              </h3>
              <span
                className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isFree
                    ? 'bg-success/15 text-success border border-success/20'
                    : 'bg-warning/15 text-warning border border-warning/20'
                }`}
              >
                {isFree ? 'Fri' : 'Kommersiell'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{dataset.provider}</p>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 font-light">
              {dataset.description}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 shrink-0 mt-1 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Scan className="w-3.5 h-3.5 text-accent/50" />
            {dataset.spatialResolution}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent/50" />
            {dataset.temporalResolution}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-accent/50" />
            {dataset.type}
          </span>
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-edge px-6 sm:px-7 pb-7">
            <div className="grid sm:grid-cols-2 gap-8 pt-7">
              {/* Details */}
              <div className="space-y-5">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Detaljer
                </h4>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500 flex items-center gap-1.5 text-xs">
                      <Scan className="w-3.5 h-3.5" /> Spatial upplösning
                    </dt>
                    <dd className="text-white font-medium mt-0.5">{dataset.spatialResolution}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 flex items-center gap-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5" /> Temporal upplösning
                    </dt>
                    <dd className="text-white font-medium mt-0.5">{dataset.temporalResolution}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 flex items-center gap-1.5 text-xs">
                      <Scale className="w-3.5 h-3.5" /> Licens
                    </dt>
                    <dd className="text-white font-medium mt-0.5">{dataset.license}</dd>
                  </div>
                </dl>
                <a
                  href={dataset.accessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Åtkomst / ladda ner
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Use cases */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Kommunala användningsexempel
                </h4>
                <div className="space-y-3">
                  {dataset.useCases.map((uc, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-elevated/80 border border-edge"
                    >
                      <span className="inline-block text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                        {uc.category}
                      </span>
                      <h5 className="text-sm font-medium text-white mb-1">
                        {uc.title}
                      </h5>
                      <p className="text-xs text-gray-500 leading-relaxed font-light">
                        {uc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-edge">
              {dataset.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-elevated text-gray-500 text-xs rounded-md border border-edge"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

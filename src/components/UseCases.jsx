import {
  Building2,
  TreePine,
  Droplets,
  ShieldAlert,
  Wind,
  Landmark,
} from 'lucide-react'
import Reveal from './Reveal'
import datasetsData from '../data/datasets.json'

const categoryMeta = {
  'Stadsplanering & samhällsbyggnad': { icon: Building2, accent: 'accent' },
  'Miljö & klimat': { icon: Wind, accent: 'success' },
  'Skog & jordbruk': { icon: TreePine, accent: 'success' },
  'Vattenresurser': { icon: Droplets, accent: 'accent' },
  'Krisberedskap': { icon: ShieldAlert, accent: 'rose' },
  'Infrastruktur': { icon: Landmark, accent: 'warning' },
}

const accentMap = {
  accent: { iconBg: 'bg-accent/10', iconText: 'text-accent', dot: 'bg-accent', border: 'border-accent/20' },
  success: { iconBg: 'bg-success/10', iconText: 'text-success', dot: 'bg-success', border: 'border-success/20' },
  warning: { iconBg: 'bg-warning/10', iconText: 'text-warning', dot: 'bg-warning', border: 'border-warning/20' },
  rose: { iconBg: 'bg-rose/10', iconText: 'text-rose', dot: 'bg-rose', border: 'border-rose/20' },
  violet: { iconBg: 'bg-violet/10', iconText: 'text-violet', dot: 'bg-violet', border: 'border-violet/20' },
}

function getUseCasesByCategory() {
  const map = {}
  for (const ds of datasetsData.datasets) {
    for (const uc of ds.useCases) {
      if (!map[uc.category]) map[uc.category] = []
      map[uc.category].push({ ...uc, datasetName: ds.name, datasetId: ds.id })
    }
  }
  return map
}

export default function UseCases() {
  const byCategory = getUseCasesByCategory()

  return (
    <section id="anvandning" className="relative py-24 sm:py-32 bg-deep">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-warning/70 text-xs tracking-[0.25em] uppercase mb-4 font-medium">
              Konkret nytta
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 font-bold">
              Kommunala användningsområden
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              Satellitdata kan ge kommuner konkret nytta inom en rad
              verksamhetsområden. Här samlar vi exempel sorterade efter kategori.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(byCategory).map(([category, useCases], i) => {
            const meta = categoryMeta[category] || { icon: Building2, accent: 'accent' }
            const c = accentMap[meta.accent] || accentMap.accent
            const Icon = meta.icon
            return (
              <Reveal key={category} delay={0.08 * i}>
                <div className="h-full p-6 rounded-2xl bg-surface border border-edge hover:border-edge-light transition-colors duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.iconText} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-base">{category}</h3>
                  </div>
                  <div className="space-y-4">
                    {useCases.map((uc, idx) => (
                      <div key={idx} className={`border-l-2 ${c.border} pl-3`}>
                        <h4 className="text-sm font-medium text-gray-200">{uc.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5 font-light">
                          Datakälla: <span className={`font-medium ${c.iconText}`}>{uc.datasetName}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Eye, Radio, Layers, Ruler, Globe } from 'lucide-react'
import Reveal from './Reveal'

const concepts = [
  {
    icon: Eye,
    title: 'Optisk avbildning',
    description: 'Satelliter fotograferar jordens yta med kameror som fångar synligt ljus och närliggande våglängder – som ett flygfoto från rymden.',
    accent: 'accent',
  },
  {
    icon: Radio,
    title: 'Radardata (SAR)',
    description: 'Radarsatelliter sänder ut mikrovågor och mäter reflektionen. Fungerar genom moln och mörker, dygnet runt, året runt.',
    accent: 'violet',
  },
  {
    icon: Layers,
    title: 'Multispektral & hyperspektral',
    description: 'Genom att fånga ljus i många våglängder (även osynliga för ögat) kan satelliter avslöja vegetationshälsa, vatteninnehåll och marktyp.',
    accent: 'success',
  },
  {
    icon: Ruler,
    title: 'Upplösning',
    description: 'Spatial upplösning (meter/pixel) avgör detaljnivån. Temporal upplösning (dagar) avgör hur ofta samma plats avbildas.',
    accent: 'warning',
  },
  {
    icon: Globe,
    title: 'Global täckning',
    description: 'De flesta jordobservationssatelliter täcker hela jorden systematiskt. Data lagras i öppna arkiv och kan laddas ner fritt.',
    accent: 'accent',
  },
]

const accentColors = {
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20', glow: 'rgba(0,200,255,0.08)' },
  violet: { bg: 'bg-violet/10', text: 'text-violet', border: 'border-violet/20', glow: 'rgba(167,139,250,0.08)' },
  success: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', glow: 'rgba(52,211,153,0.08)' },
  warning: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', glow: 'rgba(251,191,36,0.08)' },
}

export default function Introduction() {
  return (
    <section id="introduktion" className="relative py-24 sm:py-32 bg-surface">
      <div className="absolute inset-0 dot-bg opacity-60" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-accent/70 text-xs tracking-[0.25em] uppercase mb-4 font-medium">Grunderna</p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 font-bold">
              Vad är satellitdata?
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              Hundratals satelliter kretsar runt jorden och samlar in data om vår
              planet varje dag. De mäter allt från marktemperatur och vegetation
              till luftkvalitet och havsnivåer. Denna data finns i många fall
              tillgänglig <span className="text-white font-medium">helt gratis</span>.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {concepts.map((concept, i) => {
            const Icon = concept.icon
            const colors = accentColors[concept.accent]
            return (
              <Reveal key={concept.title} delay={0.08 * i}>
                <div
                  className={`group relative p-6 rounded-2xl border ${colors.border} bg-elevated/50 hover:bg-elevated transition-all duration-500 cursor-default`}
                  style={{
                    ['--glow']: colors.glow,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `inset 0 1px 0 ${colors.glow}, 0 0 40px var(--glow)` }}
                  />
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">
                      {concept.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                      {concept.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-20 p-8 sm:p-10 rounded-2xl glass border-accent/10 relative overflow-hidden">
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.15) 0%, transparent 70%)' }}
            />
            <div className="relative">
              <h3 className="font-display text-2xl text-white mb-4 font-bold">
                Behöver man vara expert?
              </h3>
              <p className="text-gray-400 leading-relaxed font-light max-w-3xl">
                Nej! Medan rå satellitdata kan kräva teknisk kompetens att bearbeta,
                finns det alltfler <span className="text-white font-medium">färdigbearbetade produkter</span> som
                kan användas direkt. Molnbaserade plattformar som Google Earth Engine
                och Copernicus Data Space gör det enklare än någonsin att komma igång.
                Många användningsområden kräver inte mer än att ladda ner en kartbild
                och öppna den i ett GIS-verktyg.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

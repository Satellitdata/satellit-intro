import { Building2, Landmark, FlaskConical, Globe2 } from 'lucide-react'
import Reveal from './Reveal'

const categories = [
  {
    icon: Landmark,
    title: 'Offentliga program',
    accent: 'accent',
    actors: [
      {
        name: 'Copernicus (EU/ESA)',
        desc: 'EU:s jordobservationsprogram. Driver Sentinel-satelliterna och erbjuder fria data och tjänster. Världens största leverantör av fri satellitdata.',
      },
      {
        name: 'NASA / USGS',
        desc: 'Amerikanska rymdprogrammet. Driver Landsat, MODIS, VIIRS och många andra missioner. All data fritt tillgänglig.',
      },
      {
        name: 'ECMWF',
        desc: 'Europeiskt centrum för väderprognos. Producerar ERA5-klimatreanalys och driver Copernicus atmosfärstjänster.',
      },
    ],
  },
  {
    icon: Building2,
    title: 'Kommersiella aktörer',
    accent: 'warning',
    actors: [
      {
        name: 'Planet Labs',
        desc: 'Över 200 satelliter som fotograferar hela jorden dagligen (3–5 m). Erbjuder unik daglig täckning.',
      },
      {
        name: 'Maxar Technologies',
        desc: 'Ledande leverantör av mycket högupplösta bilder (30 cm). Driver WorldView-satelliterna.',
      },
      {
        name: 'ICEYE',
        desc: 'Finsk SAR-aktör med en växande konstellation av små radarsatelliter. Specialiserade på snabb respons.',
      },
    ],
  },
  {
    icon: Globe2,
    title: 'Plattformar & åtkomst',
    accent: 'success',
    actors: [
      {
        name: 'Copernicus Data Space',
        desc: 'EU:s plattform för att söka, ladda ner och bearbeta Copernicus-data direkt i molnet. Gratis att använda.',
      },
      {
        name: 'Google Earth Engine',
        desc: 'Molnbaserad analysplattform med petabyte av satellitdata. Kraftfullt verktyg för storskalig analys.',
      },
      {
        name: 'USGS EarthExplorer',
        desc: 'NASAs/USGS portal för att söka och ladda ner Landsat, Sentinel och annan fri data.',
      },
    ],
  },
  {
    icon: FlaskConical,
    title: 'Färdiga tjänster',
    accent: 'violet',
    actors: [
      {
        name: 'Copernicus Land Monitoring (CLMS)',
        desc: 'Levererar färdiga markkartor, vegetationsindex och vattendata för hela Europa.',
      },
      {
        name: 'Copernicus Emergency Management',
        desc: 'Aktiveras vid katastrofer och levererar snabba skadekartor. Gratis för myndigheter.',
      },
      {
        name: 'Copernicus Climate Change (C3S)',
        desc: 'Klimatdata och -indikatorer baserade på ERA5 och satellitobservationer.',
      },
    ],
  },
]

const colorMap = {
  accent: { dot: 'bg-accent', line: 'bg-accent/20', text: 'text-accent', iconBg: 'bg-accent/10' },
  warning: { dot: 'bg-warning', line: 'bg-warning/20', text: 'text-warning', iconBg: 'bg-warning/10' },
  success: { dot: 'bg-success', line: 'bg-success/20', text: 'text-success', iconBg: 'bg-success/10' },
  violet: { dot: 'bg-violet', line: 'bg-violet/20', text: 'text-violet', iconBg: 'bg-violet/10' },
}

export default function Ecosystem() {
  return (
    <section id="ekosystemet" className="relative py-24 sm:py-32 bg-deep">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-violet/70 text-xs tracking-[0.25em] uppercase mb-4 font-medium">
              Aktörer & plattformar
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 font-bold">
              Ekosystemet
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              Satellitdata produceras och distribueras av en blandning av offentliga
              program och kommersiella aktörer. Här är de viktigaste att känna till.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            const c = colorMap[cat.accent]
            return (
              <Reveal key={cat.title} delay={0.1 * i}>
                <div className="h-full p-7 sm:p-8 rounded-2xl bg-surface border border-edge hover:border-edge-light transition-colors duration-500">
                  <div className="flex items-center gap-3 mb-7">
                    <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.text} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">{cat.title}</h3>
                  </div>

                  <div className="space-y-5">
                    {cat.actors.map((actor) => (
                      <div key={actor.name} className="flex gap-3">
                        <div className="flex flex-col items-center pt-1.5">
                          <div className={`w-2 h-2 rounded-full ${c.dot} shrink-0`} />
                          <div className={`w-px flex-1 mt-1 ${c.line}`} />
                        </div>
                        <div className="pb-1">
                          <h4 className="text-white font-medium text-sm mb-1">{actor.name}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed font-light">{actor.desc}</p>
                        </div>
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

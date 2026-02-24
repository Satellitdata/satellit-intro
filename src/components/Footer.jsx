import { Satellite } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-deep border-t border-edge">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 text-white font-display text-lg mb-4 font-semibold">
              <Satellite className="w-5 h-5 text-accent" />
              Satellitdata
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              En samlad överblick över satellitdata och dess möjligheter för
              kommunal verksamhet.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Datakällor
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Copernicus Data Space', url: 'https://dataspace.copernicus.eu/' },
                { label: 'USGS EarthExplorer', url: 'https://earthexplorer.usgs.gov/' },
                { label: 'Copernicus Land Monitoring', url: 'https://land.copernicus.eu/' },
                { label: 'Climate Data Store (C3S)', url: 'https://cds.climate.copernicus.eu/' },
              ].map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-accent transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Lär dig mer
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Copernicus-programmet', url: 'https://www.copernicus.eu/' },
                { label: 'Google Earth Engine', url: 'https://earthengine.google.com/' },
                { label: 'ESA Earth Observation', url: 'https://www.esa.int/Applications/Observing_the_Earth' },
              ].map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-accent transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-edge mt-12 pt-8 text-center text-xs text-gray-600">
          Senast uppdaterad: Februari 2026. Informationen är sammanställd i utbildningssyfte.
        </div>
      </div>
    </footer>
  )
}

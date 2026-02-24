import { useState } from 'react'
import FilterBar from './FilterBar'
import DatasetCard from './DatasetCard'
import Reveal from './Reveal'
import datasetsData from '../data/datasets.json'

function matchesFilter(dataset, filter) {
  if (filter === 'all') return true
  if (filter === 'free') return dataset.availability === 'free'
  if (filter === 'commercial') return dataset.availability === 'commercial'
  if (filter === 'optisk') return dataset.tags.some(t => t.toLowerCase().includes('optisk'))
  if (filter === 'SAR') return dataset.tags.some(t => t.toLowerCase().includes('sar') || t.toLowerCase().includes('radar'))
  if (filter === 'klimat') return dataset.tags.some(t =>
    ['klimat', 'atmosfär', 'luftkvalitet', 'väder', 'termisk'].includes(t.toLowerCase())
  )
  return true
}

export default function DatasetCatalog() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = datasetsData.datasets.filter(ds => matchesFilter(ds, activeFilter))

  return (
    <section id="datamangder" className="relative py-24 sm:py-32 bg-surface">
      <div className="absolute inset-0 dot-bg opacity-40" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-success/70 text-xs tracking-[0.25em] uppercase mb-4 font-medium">Katalog</p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 font-bold">
              Datamängder
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              De viktigaste satellitdatakällorna – från helt fria europeiska och
              amerikanska program till kommersiella högupplösta alternativ.
              Klicka för detaljer och användningsexempel.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-10">
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>
        </Reveal>

        <div className="space-y-4">
          {filtered.map((dataset, i) => (
            <Reveal key={dataset.id} delay={Math.min(0.05 * i, 0.4)}>
              <DatasetCard dataset={dataset} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-600 py-16">
            Inga datamängder matchar valt filter.
          </p>
        )}

        <p className="text-center text-sm text-gray-600 mt-8">
          Visar {filtered.length} av {datasetsData.datasets.length} datamängder
        </p>
      </div>
    </section>
  )
}

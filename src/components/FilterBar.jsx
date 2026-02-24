const filters = [
  { key: 'all', label: 'Alla' },
  { key: 'free', label: 'Fri data' },
  { key: 'commercial', label: 'Kommersiell' },
  { key: 'optisk', label: 'Optisk' },
  { key: 'SAR', label: 'SAR / Radar' },
  { key: 'klimat', label: 'Klimat & atmosfär' },
]

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((f) => {
        const active = activeFilter === f.key
        return (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${active
                ? 'bg-accent text-deep shadow-[0_0_20px_rgba(0,200,255,0.25)]'
                : 'bg-elevated/60 text-gray-400 border border-edge hover:border-edge-light hover:text-gray-200'
              }
            `}
          >
            {f.label}
          </button>
        )
      })}
    </div>
  )
}

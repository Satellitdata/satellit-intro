import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-16 pt-16">
      {/* Deep background */}
      <div className="absolute inset-0 bg-deep" />

      {/* Radial earth glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(0, 200, 255, 0.06) 0%, rgba(0, 100, 200, 0.03) 30%, transparent 70%)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Ring 1 – large, slow */}
        <div
          className="absolute -top-[280px] -left-[280px] w-[560px] h-[560px] rounded-full border border-accent/10"
          style={{ animation: 'orbit 70s linear infinite' }}
        >
          <div
            className="absolute -top-[4px] left-1/2 w-[8px] h-[8px] rounded-full bg-accent/80"
            style={{
              boxShadow: '0 0 12px rgba(0,200,255,0.6), 0 0 24px rgba(0,200,255,0.3)',
            }}
          />
        </div>

        {/* Ring 2 – medium, reverse */}
        <div
          className="absolute -top-[200px] -left-[200px] w-[400px] h-[400px] rounded-full border border-violet/10"
          style={{ animation: 'orbit-reverse 50s linear infinite' }}
        >
          <div
            className="absolute top-1/2 -right-[3px] w-[6px] h-[6px] rounded-full bg-violet/80"
            style={{
              boxShadow: '0 0 10px rgba(167,139,250,0.5)',
            }}
          />
        </div>

        {/* Ring 3 – small, fast */}
        <div
          className="absolute -top-[120px] -left-[120px] w-[240px] h-[240px] rounded-full"
          style={{
            border: '1px dashed rgba(52, 211, 153, 0.12)',
            animation: 'orbit 35s linear infinite',
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 w-[5px] h-[5px] rounded-full bg-success/70"
            style={{
              boxShadow: '0 0 8px rgba(52,211,153,0.5)',
            }}
          />
        </div>

        {/* Center glow */}
        <div
          className="absolute -top-[40px] -left-[40px] w-[80px] h-[80px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)',
            animation: 'pulse-soft 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-20 sm:py-28">
        <div className="max-w-3xl">
          <p
            className="text-accent/80 font-body text-xs tracking-[0.25em] uppercase mb-6"
            style={{ animation: 'hero-text-in 0.8s ease-out 0.2s both' }}
          >
            En samlad överblick
          </p>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 font-bold"
            style={{ animation: 'hero-text-in 0.8s ease-out 0.4s both' }}
          >
            Satellitdata för{' '}
            <span className="text-gradient-accent">
              kommunal nytta
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl font-light"
            style={{ animation: 'hero-text-in 0.8s ease-out 0.6s both' }}
          >
            Upptäck hur satellitdata kan hjälpa din kommun med allt från
            klimatanpassning och stadsplanering till krisberedskap – en guide
            för beslutsfattare och tjänstepersoner.
          </p>

          <div
            className="flex flex-wrap gap-4"
            style={{ animation: 'hero-text-in 0.8s ease-out 0.8s both' }}
          >
            <a
              href="#datamangder"
              className="inline-flex items-center px-7 py-3.5 bg-accent text-deep font-semibold text-sm rounded-full hover:bg-accent/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,200,255,0.3)]"
            >
              Utforska datamängder
            </a>
            <a
              href="#introduktion"
              className="inline-flex items-center px-7 py-3.5 border border-edge-light text-gray-300 font-medium text-sm rounded-full hover:border-accent/30 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Läs introduktionen
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#introduktion"
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-accent transition-colors"
          aria-label="Scrolla ner"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scrolla</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

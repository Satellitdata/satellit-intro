import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`
        fixed bottom-6 right-6 z-40 p-3 rounded-full
        bg-elevated border border-edge text-gray-400
        hover:text-accent hover:border-accent/30 hover:shadow-[0_0_20px_rgba(0,200,255,0.15)]
        transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Tillbaka till toppen"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}

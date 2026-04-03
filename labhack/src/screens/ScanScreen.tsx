import { useState, useEffect } from 'react'

const detectedBiomarkers = [
  { name: 'Glucose', delay: 0.3 },
  { name: 'Vitamin D', delay: 0.8 },
  { name: 'Cholesterol', delay: 1.4 },
]

export default function ScanScreen() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers = detectedBiomarkers.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), (i + 1) * 900)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative h-screen bg-black flex flex-col">
      {/* Camera viewfinder area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated camera background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

        {/* Corner bracket guides */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-72 h-72">
            {/* Top-left */}
            <div className="absolute top-0 left-0 w-12 h-12 animate-pulse-glow">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary rounded-full" />
              <div className="absolute top-0 left-0 h-full w-[3px] bg-primary rounded-full" />
            </div>
            {/* Top-right */}
            <div className="absolute top-0 right-0 w-12 h-12 animate-pulse-glow" style={{ animationDelay: '0.3s' }}>
              <div className="absolute top-0 right-0 w-full h-[3px] bg-primary rounded-full" />
              <div className="absolute top-0 right-0 h-full w-[3px] bg-primary rounded-full" />
            </div>
            {/* Bottom-left */}
            <div className="absolute bottom-0 left-0 w-12 h-12 animate-pulse-glow" style={{ animationDelay: '0.6s' }}>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-full" />
              <div className="absolute bottom-0 left-0 h-full w-[3px] bg-primary rounded-full" />
            </div>
            {/* Bottom-right */}
            <div className="absolute bottom-0 right-0 w-12 h-12 animate-pulse-glow" style={{ animationDelay: '0.9s' }}>
              <div className="absolute bottom-0 right-0 w-full h-[3px] bg-primary rounded-full" />
              <div className="absolute bottom-0 right-0 h-full w-[3px] bg-primary rounded-full" />
            </div>

            {/* Scan line */}
            <div className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scanline opacity-80" />
          </div>
        </div>

        {/* Floating OCR detection pills */}
        <div className="absolute top-16 left-0 right-0 flex flex-wrap justify-center gap-2 px-6">
          {detectedBiomarkers.slice(0, visibleCount).map((bio, i) => (
            <div
              key={bio.name}
              className="animate-float-up flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse-dot" />
              <span className="text-white text-xs font-medium font-[Manrope]">{bio.name}</span>
            </div>
          ))}
        </div>

        {/* Progress label */}
        <div className="absolute bottom-8 left-0 right-0 px-8">
          <div className="text-center mb-3">
            <span className="text-white/80 text-sm font-[Inter]">
              Analyzing… <span className="text-mint font-semibold">3 of 5</span> biomarkers detected
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-mint rounded-full animate-progress-fill"
              style={{ '--tw-progress-width': '65%' } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 bg-gradient-to-t from-black via-black/95 to-transparent pt-8 pb-28 px-8">
        <div className="flex items-center justify-between">
          {/* Gallery button */}
          <button className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="material-icons-round text-white/80 text-[22px]">photo_library</span>
          </button>

          {/* Shutter button */}
          <button className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(0,80,212,0.3)] ring-4 ring-white/20">
            <div className="w-[60px] h-[60px] rounded-full border-[3px] border-primary/30 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-primary" />
            </div>
          </button>

          {/* Help button */}
          <button className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="material-icons-round text-white/80 text-[22px]">help_outline</span>
          </button>
        </div>

        <p className="text-center mt-4 text-white/50 text-xs font-[Inter] underline underline-offset-2 cursor-pointer">
          Or upload file manually
        </p>
      </div>
    </div>
  )
}

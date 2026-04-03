const pastScans = [
  { id: 1, date: 'March 28, 2026', vitality: 78, flagged: 2 },
  { id: 2, date: 'February 12, 2026', vitality: 72, flagged: 3 },
  { id: 3, date: 'January 5, 2026', vitality: 65, flagged: 4 },
  { id: 4, date: 'November 20, 2025', vitality: 61, flagged: 3 },
]

export default function HistoryScreen() {
  const scans = pastScans // swap to [] to see empty state

  return (
    <div className="px-5 pt-14 pb-4">
      <h1 className="font-[Manrope] font-extrabold text-[28px] text-gray-900 leading-tight mb-1">
        History
      </h1>
      <p className="text-gray-400 text-sm font-[Inter] mb-6">Your past lab scans</p>

      {scans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <span className="material-icons-round text-gray-300 text-[36px]">science</span>
          </div>
          <p className="font-[Manrope] font-bold text-gray-400 text-lg">No scans yet</p>
          <p className="font-[Inter] text-gray-400 text-sm mt-1">Scan your first lab report to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scans.map((scan) => (
            <button
              key={scan.id}
              className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow text-left"
            >
              {/* Vitality circle */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                  <circle
                    cx="24" cy="24" r="20"
                    fill="none"
                    stroke="#38EE90"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - scan.vitality / 100)}`}
                    transform="rotate(-90 24 24)"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-[Manrope] text-gray-900">
                  {scan.vitality}%
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-[Manrope] font-bold text-sm text-gray-900">{scan.date}</p>
                <p className="font-[Inter] text-xs text-gray-500 mt-0.5">
                  {scan.flagged} flagged biomarker{scan.flagged !== 1 ? 's' : ''}
                </p>
              </div>

              <span className="material-icons-round text-gray-300 text-[20px]">chevron_right</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

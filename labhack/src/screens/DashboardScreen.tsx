import type { Tab } from '../App'

function SegmentedRangeBar({ value, low, normal, high }: {
  value: number
  low: [number, number]
  normal: [number, number]
  high: [number, number]
}) {
  const min = low[0]
  const max = high[1]
  const range = max - min
  const position = Math.min(Math.max(((value - min) / range) * 100, 2), 98)

  return (
    <div className="mt-3">
      <div className="relative h-2.5 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-blue-400/60 rounded-l-full"
          style={{ width: `${((low[1] - low[0]) / range) * 100}%` }}
        />
        <div
          className="h-full bg-mint/60"
          style={{ width: `${((normal[1] - normal[0]) / range) * 100}%` }}
        />
        <div
          className="h-full bg-error/50 rounded-r-full"
          style={{ width: `${((high[1] - high[0]) / range) * 100}%` }}
        />
      </div>
      {/* Marker */}
      <div className="relative h-4 mt-0.5">
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${position}%` }}
        >
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-800" />
          <span className="text-[9px] font-bold text-gray-800 mt-[-1px]">{value}</span>
        </div>
      </div>
      <div className="flex justify-between text-[9px] text-gray-400 mt-0.5 font-[Inter]">
        <span>Low</span>
        <span>Normal</span>
        <span>High</span>
      </div>
    </div>
  )
}

export default function DashboardScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <div className="px-5 pt-14 pb-4">
      {/* Hero */}
      <div className="mb-6">
        <h1 className="font-[Manrope] font-extrabold text-[28px] text-gray-900 leading-tight">
          Your Health<br />Snapshot.
        </h1>
        <p className="text-gray-400 text-sm font-[Inter] mt-1">March 28, 2026</p>
        <p className="text-error text-sm font-semibold font-[Inter] mt-1 flex items-center gap-1">
          <span className="material-icons-round text-[16px]">warning</span>
          2 areas requiring adjustment.
        </p>
      </div>

      {/* Overall Vitality Score */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700 font-[Manrope]">Overall Vitality</span>
          <span className="text-2xl font-extrabold text-gray-900 font-[Manrope]">78%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-mint rounded-full animate-progress-fill"
            style={{ '--tw-progress-width': '78%' } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Bento grid of biomarker cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Vitamin D card */}
        <button
          onClick={() => onNavigate('insights')}
          className="text-left bg-white rounded-2xl p-4 shadow-sm border-l-4 border-error col-span-1 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span className="material-icons-round text-error text-[18px]">trending_down</span>
            <span className="text-xs font-semibold text-error font-[Manrope]">Deficient</span>
          </div>
          <p className="font-[Manrope] font-bold text-gray-900 text-base">Vitamin D</p>
          <p className="font-[Inter] text-gray-500 text-xs mt-0.5">18 ng/mL</p>
        </button>

        {/* Cholesterol card — blue gradient */}
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-4 shadow-sm col-span-1">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="material-icons-round text-white/90 text-[18px]">check_circle</span>
            <span className="text-xs font-semibold text-white/90 font-[Manrope]">Optimal</span>
          </div>
          <p className="font-[Manrope] font-bold text-white text-base">Cholesterol</p>
          <p className="font-[Inter] text-white/70 text-xs mt-0.5">185 mg/dL</p>
        </div>

        {/* Glucose card — full width */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-error col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-icons-round text-error text-[18px]">trending_up</span>
                <span className="text-xs font-semibold text-error font-[Manrope]">Elevated</span>
              </div>
              <p className="font-[Manrope] font-bold text-gray-900 text-base">Glucose</p>
              <p className="font-[Inter] text-gray-500 text-xs mt-0.5">112 mg/dL</p>
            </div>
          </div>
          <SegmentedRangeBar
            value={112}
            low={[50, 70]}
            normal={[70, 100]}
            high={[100, 140]}
          />
        </div>
      </div>

      {/* Optimization Plan */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h2 className="font-[Manrope] font-bold text-lg text-gray-900 mb-3">Optimization Plan</h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
            <span className="material-icons-round text-amber-500 text-[22px] mt-0.5">wb_sunny</span>
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-gray-900">Get 15 min sunlight daily</p>
              <p className="font-[Inter] text-xs text-gray-500 mt-0.5">Boosts Vitamin D synthesis naturally</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
            <span className="material-icons-round text-green-500 text-[22px] mt-0.5">restaurant</span>
            <div>
              <p className="font-[Manrope] font-semibold text-sm text-gray-900">Reduce refined carbs</p>
              <p className="font-[Inter] text-xs text-gray-500 mt-0.5">Helps stabilize blood glucose levels</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 py-3 bg-primary text-white font-[Manrope] font-bold text-sm rounded-xl hover:bg-primary-light transition-colors">
          Start My Plan
        </button>
      </div>

      {/* Expert badge */}
      <div className="flex items-center justify-center gap-3 py-3">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold font-[Manrope] ring-2 ring-white">
            DR
          </div>
          <div className="w-8 h-8 rounded-full bg-mint-dark text-white flex items-center justify-center text-xs font-bold font-[Manrope] ring-2 ring-white">
            KL
          </div>
        </div>
        <span className="text-xs text-gray-500 font-[Inter]">
          Reviewed by <span className="font-semibold text-gray-700">2 Clinical Experts</span>
        </span>
      </div>
    </div>
  )
}

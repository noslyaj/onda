function CircularGauge({ value, max, unit, label }: {
  value: number
  max: number
  unit: string
  label: string
}) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const progress = value / max
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        {/* Background circle */}
        <circle
          cx="90" cy="90" r={radius}
          fill="none" stroke="#E5E7EB" strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <circle
          cx="90" cy="90" r={radius}
          fill="none" stroke="#B31B25" strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 90 90)"
          className="transition-all duration-1000 ease-out"
          style={{ filter: 'drop-shadow(0 0 6px rgba(179, 27, 37, 0.3))' }}
        />
        {/* Center text */}
        <text x="90" y="80" textAnchor="middle" className="font-[Manrope]" fill="#111827" fontSize="32" fontWeight="800">
          {value}
        </text>
        <text x="90" y="102" textAnchor="middle" className="font-[Inter]" fill="#6B7280" fontSize="13">
          {unit}
        </text>
      </svg>
      <p className="text-xs text-gray-400 font-[Inter] mt-1">{label}</p>
    </div>
  )
}

const weekPlan = [
  { week: '01', title: 'Loading Phase', progress: 100, desc: '5000 IU daily + sunlight' },
  { week: '02', title: 'Synthesis', progress: 33, desc: '3000 IU daily + diet changes' },
  { week: '03', title: 'Stabilization', progress: 0, desc: '2000 IU maintenance dose' },
  { week: '04', title: 'Evaluation', progress: 0, desc: 'Retest blood levels' },
]

export default function InsightsScreen() {
  return (
    <div className="px-5 pt-14 pb-4">
      {/* Hero */}
      <div className="text-center mb-6">
        <h1 className="font-[Manrope] font-extrabold text-[26px] text-gray-900 leading-tight">
          Your Vitamin D<br />is Low
        </h1>
        <div className="mt-5">
          <CircularGauge value={18} max={60} unit="ng/mL" label="Current Level" />
        </div>
      </div>

      {/* Plain-English explanation */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <p className="font-[Inter] text-sm text-gray-600 leading-relaxed">
          Vitamin D plays a critical role in calcium absorption, immune function, and mood regulation.
          Your level of <span className="font-semibold text-gray-900">18 ng/mL</span> falls below the
          recommended range of 30–60 ng/mL, which may contribute to fatigue, weakened bones, and
          increased susceptibility to illness.
        </p>
      </div>

      {/* Bento info cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <span className="material-icons-round text-primary text-[24px] mb-2">medication</span>
          <p className="font-[Manrope] font-bold text-xl text-gray-900">2,000 IU</p>
          <p className="font-[Inter] text-xs text-gray-500 mt-0.5">Recommended Daily Intake</p>
        </div>
        <div className="bg-primary rounded-2xl p-4 shadow-sm text-white">
          <span className="material-icons-round text-white/90 text-[24px] mb-2">set_meal</span>
          <p className="font-[Manrope] font-bold text-sm">Dietary Optimization</p>
          <div className="mt-2 space-y-1">
            <span className="inline-block text-[11px] bg-white/20 rounded-full px-2 py-0.5">Fatty Fish</span>
            <span className="inline-block text-[11px] bg-white/20 rounded-full px-2 py-0.5 ml-1">Egg Yolks</span>
          </div>
        </div>
      </div>

      {/* 4-Week Growth Plan */}
      <div className="mb-4">
        <h2 className="font-[Manrope] font-bold text-lg text-gray-900 mb-3">4-Week Growth Plan</h2>
        <div className="space-y-3">
          {weekPlan.map((week) => (
            <div
              key={week.week}
              className={`rounded-2xl p-4 shadow-sm ${
                week.progress === 100 ? 'bg-mint/10 border border-mint/30' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-primary bg-primary/10 rounded-md px-2 py-0.5 font-[Manrope]">
                    Week {week.week}
                  </span>
                  <span className="font-[Manrope] font-bold text-sm text-gray-900">{week.title}</span>
                </div>
                {week.progress === 100 && (
                  <span className="material-icons-round text-mint text-[20px]">check_circle</span>
                )}
              </div>
              <p className="text-xs text-gray-500 font-[Inter] mb-2">{week.desc}</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${week.progress}%`,
                    background: week.progress === 100
                      ? '#38EE90'
                      : week.progress > 0
                      ? '#0050D4'
                      : '#E5E7EB',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button className="py-3 bg-primary text-white font-[Manrope] font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary-light transition-colors">
          <span className="material-icons-round text-[18px]">share</span>
          Share with Doctor
        </button>
        <button className="py-3 bg-white text-gray-700 font-[Manrope] font-bold text-sm rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
          <span className="material-icons-round text-[18px]">picture_as_pdf</span>
          Save to PDF
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[11px] text-gray-400 font-[Inter] py-2">
        Not medical advice. Consult your doctor.
      </p>
    </div>
  )
}

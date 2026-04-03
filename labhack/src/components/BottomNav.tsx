import type { Tab } from '../App'

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: 'scan', icon: 'document_scanner', label: 'Scan' },
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'insights', icon: 'insights', label: 'Insights' },
  { id: 'history', icon: 'history', label: 'History' },
]

export default function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="frosted-glass rounded-t-[2rem] border-t border-white/30 px-2 pt-3 pb-6 flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
                isActive ? 'text-primary scale-105' : 'text-gray-400'
              }`}
            >
              <span className="material-icons-round text-[26px]">{tab.icon}</span>
              <span
                className={`text-[10px] font-medium font-[Manrope] ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

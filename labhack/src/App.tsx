import { useState } from 'react'
import BottomNav from './components/BottomNav'
import ScanScreen from './screens/ScanScreen'
import DashboardScreen from './screens/DashboardScreen'
import InsightsScreen from './screens/InsightsScreen'
import HistoryScreen from './screens/HistoryScreen'

export type Tab = 'scan' | 'dashboard' | 'insights' | 'history'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('scan')

  return (
    <div className="flex justify-center min-h-screen bg-[#F0F2F5]">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#F0F2F5] overflow-hidden">
        <div className="pb-24 min-h-screen">
          {activeTab === 'scan' && <ScanScreen />}
          {activeTab === 'dashboard' && <DashboardScreen onNavigate={setActiveTab} />}
          {activeTab === 'insights' && <InsightsScreen />}
          {activeTab === 'history' && <HistoryScreen />}
        </div>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

export default App

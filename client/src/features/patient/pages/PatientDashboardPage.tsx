import { useState } from 'react'

// Mock data matching reference images
const mockData = {
  patient: {
    name: 'Alex',
    role: 'Patient Portal • Aura Health',
  },
  stats: [
    { label: 'Next Appointment', value: 'Apr 28 · 10:30 AM', detail: 'Cardiology Follow-up' },
    { label: 'Recent BP', value: '118 / 76', detail: '3 days ago' },
    { label: 'Medications', value: '5 Active', detail: '2 due today' },
    { label: 'Unread Messages', value: '3', detail: 'From Care Team' },
  ],
  careTeam: [
    { name: 'Dr. Maya Chen', role: 'Primary Care', phone: '(555) 214-8890' },
    { name: 'Dr. Luis Ortega', role: 'Cardiology', phone: '(555) 122-4411' },
    { name: 'Nurse Kelly Brooks', role: 'Care Nurse', phone: 'Portal Message' },
  ],
  vitals: [
    { label: 'Blood Pressure', value: '118/76', date: 'Oct 26' },
    { label: 'Heart Rate', value: '68 bpm', date: 'Oct 26' },
    { label: 'Weight', value: '72.4 kg', date: 'Oct 20' },
  ],
  appointments: [
    { date: 'Nov 2, 9:30 AM', doctor: 'Dr. Maya Chen', type: 'Clinic visit', time: 'In 1 day' },
    { date: 'Nov 15, 2:00 PM', doctor: 'Dr. Luis Ortega', type: 'Cardio Follow-up', time: 'In 2 weeks' },
  ],
  medications: [
    { name: 'Lisinopril 10mg', frequency: '1 tablet daily', refills: '2 refills left', status: 'Active' },
    { name: 'Atorvastatin 20mg', frequency: '1 tablet at night', refills: '0 refills', status: 'Request Refill' },
  ],
  notifications: [
    { type: 'Lab results available: Lipid Panel', action: 'View' },
    { type: 'Appointment tomorrow with Dr. Chen', action: '9:30 AM' },
    { type: 'New secure message from Nurse Brooks', action: 'Open' },
  ],
  visitHistory: [
    { title: 'Annual Physical', date: 'Feb 12, 2025', detail: 'Vitals stable, labs ordered' },
    { title: 'Telehealth • Cardiology', date: 'Dec 03, 2024', detail: 'Medication adjusted' },
    { title: 'ER Visit', date: 'Sep 21, 2024', detail: 'Discharged same day' },
  ],
  reports: [
    { name: 'Lipid Panel', detail: 'Collected Jul 28 • HDL 55, LDL 98' },
    { name: 'Chest X-ray', detail: 'Imaging • Aug 04 • Normal' },
    { name: 'A1C', detail: 'Collected Jul 28 • 5.5%' },
  ],
}

export function PatientDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', label: 'Dashboard Home', icon: '🏥' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'vitals', label: 'Vitals', icon: '❤️' },
    { id: 'reports', label: 'My Reports', icon: '📋' },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* LEFT SIDEBAR - Fixed width */}
      <div className="w-80 bg-gradient-to-b from-blue-50 to-emerald-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              HC
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-900">CuraLynX</h1>
              <p className="text-xs text-gray-600">Portal</p>
            </div>
          </div>

          {/* My Care Team */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-sm text-gray-900">My Care Team</h2>
              <a href="#" className="text-xs text-blue-600 font-semibold">View All</a>
            </div>
            <div className="space-y-2">
              {mockData.careTeam.map((member, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 text-xs flex items-center justify-center font-bold text-gray-600">
                    👤
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-gray-900 truncate">{member.name}</p>
                    <p className="text-xs text-gray-600 truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Vitals */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-sm text-gray-900">My Vitals</h2>
              <a href="#" className="text-xs text-blue-600 font-semibold">Add</a>
            </div>
            <div className="space-y-2">
              {mockData.vitals.map((vital, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded text-xs">
                  <div>
                    <p className="font-semibold text-gray-900">{vital.label}</p>
                    <p className="text-gray-600">{vital.value}</p>
                  </div>
                  <p className="text-gray-500">{vital.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-sm text-gray-900">Notifications</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </div>
            <div className="space-y-1">
              {mockData.notifications.map((notif, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white border-l-4 border-emerald-500 text-xs">
                  <p className="text-gray-700 line-clamp-2">{notif.type}</p>
                  <a href="#" className="text-emerald-600 font-semibold text-xs hover:underline mt-1 block">{notif.action}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP HEADER */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex-shrink-0">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mockData.patient.name}</h1>
            <p className="text-gray-600 text-xs mt-1">{mockData.patient.role}</p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-4 gap-2">
            {mockData.stats.map((stat, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">{stat.label}</p>
                <p className="text-base font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-0.5">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border-b border-gray-200 px-4 flex-shrink-0 overflow-x-auto">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-12 gap-4">
              {/* LEFT COLUMN - 2/3 width */}
              <div className="col-span-8 space-y-3">
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      <h2 className="text-sm font-bold text-gray-900">Upcoming Appointments</h2>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold text-xs hover:bg-blue-700">
                      Schedule
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {mockData.appointments.map((apt, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-xs font-bold text-gray-900">{apt.date}</p>
                        <p className="text-xs text-blue-700 font-semibold mt-0.5">{apt.doctor}</p>
                        <div className="flex justify-between items-center mt-1 text-xs">
                          <span className="text-gray-600">{apt.type}</span>
                          <span className="text-gray-500">{apt.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Medications */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💊</span>
                      <h2 className="text-sm font-bold text-gray-900">My Medications</h2>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold text-xs hover:bg-blue-700">
                      Refill
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {mockData.medications.map((med, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <p className="text-xs font-bold text-gray-900">{med.name}</p>
                        <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                          <div>
                            <p className="text-gray-600">{med.frequency}</p>
                            <p className="text-gray-500">{med.refills}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold inline-block ${
                              med.status === 'Active' ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                            }`}>
                              {med.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aura Companion */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5 min-h-48">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <h2 className="text-sm font-bold text-gray-900">Cura Companion</h2>
                    </div>
                    <button className="text-xs text-blue-600 font-semibold hover:underline">New</button>
                  </div>
                  <div className="flex-1 mb-2 p-2 bg-gray-50 rounded-lg min-h-32 flex items-center justify-center">
                    <p className="text-xs text-gray-700">Ask about your care plan</p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask Aura..."
                      className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                    />
                    <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs hover:bg-emerald-700">Send</button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - 1/3 width */}
              <div className="col-span-4 space-y-3">
                {/* Visit History */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <h2 className="text-sm font-bold text-gray-900">Visit History</h2>
                    <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">View All</a>
                  </div>
                  <div className="space-y-1.5">
                    {mockData.visitHistory.map((visit, idx) => (
                      <div key={idx} className="flex gap-2 pb-1.5 border-b border-gray-100 last:border-b-0">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900">{visit.title}</p>
                          <p className="text-xs text-gray-600">{visit.date}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{visit.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Vitals */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <h2 className="text-sm font-bold text-gray-900 mb-2.5">Recent Vitals</h2>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs text-gray-600 font-semibold">Heart Rate</p>
                      <p className="text-lg font-bold text-blue-700 mt-0.5">72 bpm</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="text-xs text-gray-600 font-semibold">Weight</p>
                      <p className="text-lg font-bold text-emerald-700 mt-0.5">68.4 kg</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
                      <p className="text-xs text-gray-600 font-semibold">SpO₂</p>
                      <p className="text-lg font-bold text-purple-700 mt-0.5">98%</p>
                    </div>
                  </div>
                </div>

                {/* My Reports */}
                <div className="bg-white rounded-lg border border-gray-200 p-3.5">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📋</span>
                      <h2 className="text-sm font-bold text-gray-900">My Reports</h2>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold">Explain</span>
                  </div>
                  <div className="space-y-2">
                    {mockData.reports.map((report, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-xs font-bold text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{report.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-base font-semibold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label} content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



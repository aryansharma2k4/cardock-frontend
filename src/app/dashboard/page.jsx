'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function DashboardPage() {
  const [parkingData, setParkingData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [slots, setSlots] = useState([]);

  const [sessionsLoading, setSessionsLoading] = useState(true);

  const fetchAllSlots = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/slot/get');
    const data = await res.json();
    if (data.success) setSlots(data.slots);
  } catch (err) {
    console.error('Failed to fetch slots', err);
  }
};


  const fetchParkingData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:8000/api/parking-space/get');
      const data = await res.json();
      if (data.success) setParkingData(data.parkingSpace);
    } catch (error) {
      console.error('Failed to fetch parking data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      setSessionsLoading(true);
      const res = await fetch('http://localhost:8000/api/sessions/gets');
      const data = await res.json();
      if (data.success) setSessions(data.sessions);
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
  fetchParkingData();
  fetchSessions();
  fetchAllSlots();
}, []);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <div className="container mx-auto py-12 px-4 max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="text-gray-600 font-medium">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

    const totalSlots = slots.length;
    const availableSlots = slots.filter(s => s.status === 'available').length;
    const occupiedSlots = slots.filter(s => s.status === 'occupied').length;
    const maintenanceSlots = slots.filter(s => s.status === 'maintenance').length;
    const totalEmptySlots = availableSlots;
    const occupancyRate = totalSlots > 0 ? ((occupiedSlots / totalSlots) * 100).toFixed(1) : 0;


  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
      case 'active': return 'text-blue-700 bg-blue-50 border border-blue-200';
      case 'cancelled': return 'text-red-700 bg-red-50 border border-red-200';
      default: return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  const getBillingTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'hourly': return 'text-violet-700 bg-violet-50 border border-violet-200';
      case 'daily': return 'text-orange-700 bg-orange-50 border border-orange-200';
      case 'monthly': return 'text-teal-700 bg-teal-50 border border-teal-200';
      default: return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Real-time parking analytics and session management
          </p>
        </div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Revenue</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">₹{parkingData?.totalMoneyCollected || 0}</h3>
            <p className="text-sm text-gray-600 mt-1">Total collected</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Occupancy</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{occupancyRate}%</h3>
            <p className="text-sm text-gray-600 mt-1">{totalSlots - totalEmptySlots} of {totalSlots} slots</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Available</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{totalEmptySlots}</h3>
            <p className="text-sm text-gray-600 mt-1">Empty slots</p>
          </div>
        </div>

        {/* Detailed Statistics Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Slot Statistics
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Regular Slots" 
              total={parkingData?.regularSlotAvailable.length || 0}
              available={parkingData?.regularEmptySlot || 0}
              color="blue"
              icon="🚗"
            />
            <StatCard 
              title="Compact Slots" 
              total={parkingData?.compactSlotAvailable.length || 0}
              available={parkingData?.compactEmptySlot || 0}
              color="green"
              icon="🚙"
            />
            <StatCard 
              title="EV Charging" 
              total={parkingData?.evSlotAvailable.length || 0}
              available={parkingData?.evEmptySlot || 0}
              color="purple"
              icon="⚡"
            />
            <StatCard 
              title="Handicap Access" 
              total={parkingData?.handicapSlotAvailable.length || 0}
              available={parkingData?.handicapEmptySlot || 0}
              color="red"
              icon="♿"
            />
          </div>
        </div>

        {/* Sessions Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m2 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v0m2 0h2" />
              </svg>
              Recent Vehicle Sessions
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {sessions.length} total sessions
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {sessionsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="text-gray-600">Loading sessions...</span>
                </div>
              </div>
            ) : sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="p-4 bg-gray-100 rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m2 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v0m2 0h2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">No sessions found</h3>
                <p className="text-gray-500 text-center">Vehicle sessions will appear here once parking activity begins.</p>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                <div className="divide-y divide-gray-100">
                  {sessions.map((session, index) => (
                    <div 
                      key={session._id} 
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 font-mono">
                                {session.parkVehicle?.number || 'Unknown Vehicle'}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Slot: {session.parkSlot?.name || 'N/A'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">Amount:</span>
                              <p className="font-semibold text-gray-800">₹{session.amount}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Entry:</span>
                              <p className="font-medium text-gray-700">
                                {new Date(session.entryTime).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(session.entryTime).toLocaleTimeString()}
                              </p>
                            </div>
                            {session.exitTime && (
                              <div>
                                <span className="text-gray-500">Exit:</span>
                                <p className="font-medium text-gray-700">
                                  {new Date(session.exitTime).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(session.exitTime).toLocaleTimeString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                            {session.status || 'Unknown'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBillingTypeColor(session.billingType)}`}>
                            {session.billingType || 'Standard'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, total, available, color, icon }) {
  const occupied = total - available;
  const occupancyPercentage = total > 0 ? (occupied / total * 100).toFixed(0) : 0;
  
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    green: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200',
    purple: 'bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200',
    red: 'bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200'
  };

  const progressColors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500', 
    purple: 'bg-violet-500',
    red: 'bg-rose-500'
  };

  return (
    <div className={`p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-medium text-gray-600 bg-white/60 px-2 py-1 rounded-full">
          {occupancyPercentage}% occupied
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Available</span>
          <span className="font-semibold text-gray-800">{available}/{total}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${progressColors[color]}`}
            style={{ width: `${occupancyPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
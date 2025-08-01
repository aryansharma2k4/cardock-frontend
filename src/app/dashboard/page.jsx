'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function DashboardPage() {
  const [parkingData, setParkingData] = useState(null);
  const [sessions, setSessions] = useState([]);

  const fetchParkingData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/parking-space/get');
      const data = await res.json();
      if (data.success) setParkingData(data.parkingSpace);
    } catch (error) {
      console.error('Failed to fetch parking data', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/sessions/gets');
      const data = await res.json();
      if (data.success) setSessions(data.sessions);
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    }
  };

  useEffect(() => {
    fetchParkingData();
    fetchSessions();
  }, []);

  if (!parkingData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-xl">Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Money Collected" value={`₹${parkingData.totalMoneyCollected}`} />
          <StatCard title="Regular Slots Available" value={parkingData.regularSlotAvailable.length} />
          <StatCard title="Compact Slots Available" value={parkingData.compactSlotAvailable.length} />
          <StatCard title="EV Slots Available" value={parkingData.evSlotAvailable.length} />
          <StatCard title="Handicap Slots Available" value={parkingData.handicapSlotAvailable.length} />
          <StatCard title="Empty Regular Slots" value={parkingData.regularEmptySlot} />
          <StatCard title="Empty Compact Slots" value={parkingData.compactEmptySlot} />
          <StatCard title="Empty EV Slots" value={parkingData.evEmptySlot} />
          <StatCard title="Empty Handicap Slots" value={parkingData.handicapEmptySlot} />
        </div>

        <h2 className="text-2xl font-bold mb-4">Past Vehicle Sessions</h2>
        <div className="bg-gray-900 p-6 rounded-xl max-h-[400px] overflow-y-auto space-y-4">
          {sessions.length === 0 ? (
            <p className="text-gray-400">No sessions available.</p>
          ) : (
            sessions.map((session) => (
              <div key={session._id} className="bg-gray-800 p-4 rounded-md shadow">
                <p className="text-white font-semibold">Vehicle: {session.parkVehicle?.number || 'Unknown'}</p>
                <p className="text-gray-400 text-sm">Slot: {session.parkSlot?.name || 'N/A'}</p>
                <p className="text-gray-400 text-sm">Billing Type: {session.billingType}</p>
                <p className="text-gray-400 text-sm">Amount: ₹{session.amount}</p>
                <p className="text-gray-400 text-sm">Status: {session.status}</p>
                <p className="text-gray-500 text-xs">Entry: {new Date(session.entryTime).toLocaleString()}</p>
                {session.exitTime && <p className="text-gray-500 text-xs">Exit: {new Date(session.exitTime).toLocaleString()}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h2 className="text-2xl font-bold text-white">{value}</h2>
    </div>
  );
}

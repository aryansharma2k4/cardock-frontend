'use client';

import { useEffect, useState } from 'react';
import EntryForm from '@/components/EntryForm';
import ParkedVehiclesList from '@/components/ParkedVehiclesList';
import Header from '@/components/Header';

export default function HomePage() {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/sessions/get');
      const data = await res.json();
      if (data.success) setSessions(data.sessions || []);
    } catch (error) {
      console.error("Failed to fetch sessions", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EntryForm onUpdate={fetchSessions} />
          <ParkedVehiclesList sessions={sessions} onUpdate={fetchSessions} />
        </div>
      </div>
    </div>
  );
}

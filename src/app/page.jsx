'use client';

import { useEffect, useState } from 'react';
import EntryForm from '@/components/EntryForm';
import ParkedVehiclesList from '@/components/ParkedVehiclesList';
import Header from '@/components/Header';

export default function HomePage(){
  const apiEndpoint = 'http://localhost:8000/api/sessions/notifySixHours';
    const successResponse = 'success'
    const pollingInterval = 1000*60*6
    const maxPollingInterval = 1000*6*60*24;
    async function pollApi(apiEndpoint, successResponse, pollingInterval, maxPollingDuration) {
    const startTime = Date.now();
    const makeRequest = async () => {
        try {
            const response = await fetch(apiEndpoint); 
            const data = await response.json();

            if (data.status === successResponse) {
                console.log('Success response received:', data);
                return; 
            }

            const elapsedTime = Date.now() - startTime;

            if (elapsedTime < maxPollingDuration) {
                setTimeout(makeRequest, pollingInterval);
            } else {
                console.log('Maximum polling duration reached. Stopping polling.');
            }
        } catch (error) {
            console.error('Error making API request:', error);
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime < maxPollingDuration) {
                setTimeout(makeRequest, pollingInterval); 
            } else {
                console.log('Maximum polling duration reached. Stopping polling.');
            }
        }
      }
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <Header />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <EntryForm onUpdate={fetchSessions} />
          <ParkedVehiclesList sessions={sessions} onUpdate={fetchSessions} />
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function MapViewPage() {
  const [parkingData, setParkingData] = useState(null);

  const fetchParkingData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/parking-space/get');
      const data = await res.json();
      if (data.success) setParkingData(data.parkingSpace);
    } catch (error) {
      console.error('Failed to fetch parking data', error);
    }
  };

  const handleMaintenance = async (slotId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/slot/maintenance/${slotId}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        fetchParkingData();
      }
    } catch (err) {
      console.error('Error sending slot to maintenance', err);
    }
  };

  useEffect(() => {
    fetchParkingData();
  }, []);

  if (!parkingData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-xl">Loading Map View...</h2>
        </div>
      </div>
    );
  }

  const renderSlots = (slots, type) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3 capitalize">{type} Slots</h3>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
        {slots.map((slotId) => (
          <div
            key={slotId}
            className="relative h-20 w-full bg-green-600 hover:bg-green-700 rounded-md flex items-center justify-center text-white font-bold"
          >
            <p>{slotId.slice(-4)}</p>
            <button
              onClick={() => handleMaintenance(slotId)}
              className="absolute bottom-1 right-1 text-xs bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
            >
              Maintain
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Parking Slot Map</h1>
        {renderSlots(parkingData.regularSlotAvailable, 'regular')}
        {renderSlots(parkingData.compactSlotAvailable, 'compact')}
        {renderSlots(parkingData.evSlotAvailable, 'ev')}
        {renderSlots(parkingData.handicapSlotAvailable, 'handicap')}
      </div>
    </div>
  );
}

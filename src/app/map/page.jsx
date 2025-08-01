'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';

export default function SlotMapView() {
  const [slots, setSlots] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllSlots = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:8000/api/slot/get');
      const data = await res.json();
      if (data.success) {
        setSlots(data.slots);
        data.slots.forEach((slot) => {
          if (typeof slot.vehicle === 'string') fetchVehicle(slot.vehicle);
        });
      }
    } catch (err) {
      console.error('Failed to fetch slots', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVehicle = async (vehicleId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/vehicle/get/${vehicleId}`);
      const data = await res.json();
      if (data.success) {
        setVehicles((prev) => ({ ...prev, [vehicleId]: data.vehicle }));
      }
    } catch (err) {
      console.error(`Failed to fetch vehicle ${vehicleId}`, err);
    }
  };

  const handleMaintenance = async (slotId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/slot/mantainance/${slotId}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        fetchAllSlots();
      }
    } catch (err) {
      console.error('Error sending slot to maintenance', err);
    }
  };

  useEffect(() => {
    fetchAllSlots();
  }, []);

  const getColorByType = (type) => {
    switch (type) {
      case 'regular': return 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400/20';
      case 'compact': return 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400/20';
      case 'ev': return 'bg-gradient-to-br from-violet-500 to-violet-600 border-violet-400/20';
      case 'handicap-accessible': return 'bg-gradient-to-br from-rose-500 to-rose-600 border-rose-400/20';
      default: return 'bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
      case 'occupied': return 'text-orange-700 bg-orange-50 border border-orange-200';
      case 'maintenance': return 'text-red-700 bg-red-50 border border-red-200';
      default: return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'regular': return '🚗';
      case 'compact': return '🚙';
      case 'ev': return '⚡';
      case 'handicap-accessible': return '♿';
      default: return '🅿️';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <div className="container mx-auto py-12 px-4 max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="text-gray-600 font-medium">Loading parking slots...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Parking Slot Map
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Real-time overview of all parking slots and their current status
          </p>
          
          {/* Stats Bar */}
          <div className="flex items-center space-x-6 mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-gray-700">
                Available: {slots.filter(slot => slot.status === 'available').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-700">
                Occupied: {slots.filter(slot => slot.status === 'occupied').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">
                Maintenance: {slots.filter(slot => slot.status === 'maintenance').length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-700">
                Total: {slots.length}
              </span>
            </div>
          </div>
        </div>

        {/* Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {slots.map((slot) => {
            const vehicle = vehicles[slot.vehicle];
            const isOccupied = slot.status === 'occupied';
            const isMaintenance = slot.status === 'maintenance';
            
            return (
              <div 
                key={slot._id} 
                className={`
                  group relative p-6 rounded-2xl shadow-sm border transition-all duration-300
                  hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-200/50
                  ${getColorByType(slot.slotType)}
                  ${isMaintenance ? 'opacity-75 grayscale' : ''}
                `}
              >
                {/* Type Icon */}
                <div className="absolute top-3 left-3 text-2xl opacity-90">
                  {getTypeIcon(slot.slotType)}
                </div>

                {/* Slot Header */}
                <div className="mb-4 pt-8">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {slot.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${getStatusColor(slot.status)}
                    `}>
                      {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Slot Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/90">Type:</span>
                    <span className="text-sm font-medium text-white capitalize">
                      {slot.slotType.replace('-', ' ')}
                    </span>
                  </div>
                  
                  {vehicle && (
                    <>
                      <div className="h-px bg-white/30 my-3"></div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/90">Vehicle:</span>
                          <span className="text-sm font-medium text-white font-mono">
                            {vehicle.number}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/90">Type:</span>
                          <span className="text-sm font-medium text-white capitalize">
                            {vehicle.vehicleType}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Maintenance Button */}
                {slot.status !== 'maintenance' && (
                  <button
                    onClick={() => handleMaintenance(slot._id)}
                    className="
                      absolute bottom-3 right-3 
                      px-3 py-1.5 text-xs font-medium
                      bg-amber-500 hover:bg-amber-400 
                      text-amber-950 rounded-lg
                      transition-all duration-200
                      hover:scale-105 hover:shadow-lg
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                      active:scale-95
                    "
                  >
                    Maintain
                  </button>
                )}

                {/* Maintenance Badge */}
                {isMaintenance && (
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg border border-red-200">
                    Under Maintenance
                  </div>
                )}

                {/* Subtle Overlay for Visual Hierarchy */}
                <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {slots.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No parking slots found</h3>
            <p className="text-gray-500 text-center max-w-md">
              It looks like there are no parking slots configured yet. Check your connection or contact your administrator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
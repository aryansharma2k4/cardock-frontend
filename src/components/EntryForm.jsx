'use client';
import { useState } from 'react';

export default function EntryForm({ onUpdate }) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [billingType, setBillingType] = useState('Hourly');
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setStatusMessage(null);
    setIsLoading(true);

    // Validate required fields
    if (!vehicleNumber.trim()) {
      setStatusMessage({ type: 'error', message: 'Vehicle number is required.' });
      setIsLoading(false);
      return;
    }

    // Capitalize billingType correctly to match backend validation
    const normalizedBillingType =
      billingType === 'Hourly' ? 'Hourly' : 'Day-Pass';

    // Capitalize vehicleType correctly to match backend validation
    const normalizedVehicleTypeMap = {
      car: 'car',
      bike: 'bike',
      ev: 'EV',
      'handicap-accessible': 'Handicap-Accessible',
    };

    const payload = {
      number: vehicleNumber.trim().toUpperCase(),
      vehicleType: normalizedVehicleTypeMap[vehicleType],
      billingType: normalizedBillingType,
    };

    try {
      const res = await fetch('http://localhost:8000/api/vehicle/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatusMessage({
          type: 'success',
          message: `Vehicle ${vehicleNumber} registered at slot ${data.slot?.name || 'N/A'}`,
        });
        setVehicleNumber('');
        onUpdate();
        
      } else {
        setStatusMessage({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', message: 'Failed to register vehicle.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 backdrop-blur-sm p-8 max-w-md w-full hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900">Vehicle Entry</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="Enter vehicle number"
            required
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-neutral-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-neutral-100"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="ev">EV</option>
            <option value="handicap-accessible">Handicap Accessible</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Billing Type</label>
          <select
            value={billingType}
            onChange={(e) => setBillingType(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-neutral-100"
          >
            <option value="Hourly">Hourly</option>
            <option value="Day-Pass">Day Pass</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-neutral-400 disabled:to-neutral-500 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg disabled:hover:shadow-md transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Registering...</span>
            </>
          ) : (
            <span>Register Vehicle</span>
          )}
        </button>

        {statusMessage && (
          <div className={`p-4 rounded-xl border ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          } transition-all duration-200`}>
            <div className="flex items-center space-x-2">
              {statusMessage.type === 'success' ? (
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="text-sm font-medium">{statusMessage.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
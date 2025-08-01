'use client';
import { useState } from 'react';

export default function EntryForm({ onUpdate }) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [billingType, setBillingType] = useState('Hourly');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

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
    }
  };

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Vehicle Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          placeholder="Vehicle Number"
          required
          className="mb-4 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="mb-4 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        >
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="ev">EV</option>
          <option value="handicap-accessible">Handicap Accessible</option>
        </select>
        <select
          value={billingType}
          onChange={(e) => setBillingType(e.target.value)}
          className="mb-6 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        >
          <option value="Hourly">Hourly</option>
          <option value="Day-Pass">Day Pass</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md"
        >
          Register Vehicle
        </button>
        {statusMessage && (
          <div className={`mt-4 p-4 rounded-md text-white ${statusMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {statusMessage.message}
          </div>
        )}
      </form>
    </div>
  );
}

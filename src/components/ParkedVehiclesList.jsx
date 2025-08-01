import { useState } from 'react';

function formatDate(date) {
  return new Date(date).toLocaleString();
}

export default function ParkedVehiclesList({ sessions, onUpdate }) {
  const [statusMessage, setStatusMessage] = useState(null);

  const handleExit = async (sessionId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/vehicle/exit/${sessionId}`, {
        method: 'POST',
      });
      const data = await res.json();

      if (data.success) {
        setStatusMessage({
          type: 'success',
          message: `Exited vehicle ${data.data.parkVehicle?.number || ''}, Amount: ₹${data.data.amount || 0}`,
        });
        onUpdate();
      } else {
        setStatusMessage({ type: 'error', message: data.message });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', message: 'Server error during exit.' });
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl p-8 w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Parked Vehicles</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-400">No active vehicles.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map(session => (
            <li
              key={session._id}
              className="flex justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <div>
                <p className="text-lg font-semibold text-white">
                  {session?.parkVehicle?.number || 'N/A'}
                </p>
                <p className="text-gray-400">
                  Slot: <span className="text-blue-400">{session?.parkSlot?.name || 'N/A'}</span>
                </p>
                <p className="text-gray-400">Entry: {formatDate(session.entryTime)}</p>
              </div>
              <button
                onClick={() => handleExit(session._id)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Exit
              </button>
            </li>
          ))}
        </ul>
      )}

      {statusMessage && (
        <div
          className={`mt-4 p-4 rounded-md ${
            statusMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {statusMessage.message}
        </div>
      )}
    </div>
  );
}

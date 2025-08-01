import { useState } from 'react';

function formatDate(date) {
  return new Date(date).toLocaleString();
}

export default function ParkedVehiclesList({ sessions, onUpdate }) {
  const [statusMessage, setStatusMessage] = useState(null);
  const [exitingId, setExitingId] = useState(null);

  const handleExit = async (sessionId) => {
    setExitingId(sessionId);
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
    } finally {
      setExitingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/50 backdrop-blur-sm p-8 w-full hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900">Parked Vehicles</h2>
          <p className="text-sm text-neutral-500 mt-1">{sessions.length} active vehicles</p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-neutral-500 text-lg font-medium">No active vehicles</p>
          <p className="text-neutral-400 text-sm mt-1">Parked vehicles will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div
              key={session._id}
              className="group p-6 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/50 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {session?.parkVehicle?.number || 'N/A'}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        Vehicle #{index + 1}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-neutral-500">Slot:</span>
                      <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                        {session?.parkSlot?.name || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-neutral-500">Entry:</span>
                      <span className="font-medium text-neutral-700">
                        {formatDate(session.entryTime)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleExit(session._id)}
                  disabled={exitingId === session._id}
                  className="ml-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-neutral-400 disabled:to-neutral-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg disabled:hover:shadow-md transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {exitingId === session._id ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Exiting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Exit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {statusMessage && (
        <div className={`mt-6 p-4 rounded-xl border ${
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
  );
}
export default function Header() {
  const initializeParkingSpace = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/parking-space/initialize', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert('Parking space initialized successfully');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Initialization failed');
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">CarDock</div>
        <button
          onClick={initializeParkingSpace}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Initialize Space
        </button>
      </nav>
    </header>
  );
}
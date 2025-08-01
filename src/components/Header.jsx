'use client';
import { useState, useEffect } from 'react';

// Modern Header Component
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
    <header className="bg-white/95 backdrop-blur-lg border-b border-neutral-200/50 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-semibold text-neutral-900 tracking-tight">
              CarDock
            </div>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-[1.02]"
            >
              Home
            </button>
            
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:scale-[1.02]"
            >
              Dashboard
            </button>
            
            <button
              onClick={() => window.location.href = '/map'}
              className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 hover:scale-[1.02]"
            >
              Map
            </button>
            
            <button
              onClick={initializeParkingSpace}
              className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-[1.02]"
            >
              Initialize Space
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
              }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-2 bg-white border-t border-neutral-200/50">
            <button
              onClick={() => window.location.href = '/'}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all duration-200"
            >
              Home
            </button>
            
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-200"
            >
              Dashboard
            </button>
            
            <button
              onClick={() => window.location.href = '/map'}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-all duration-200"
            >
              Map
            </button>
            
            <button
              onClick={initializeParkingSpace}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              Initialize Space
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}


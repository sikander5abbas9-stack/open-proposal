import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const MarketingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};


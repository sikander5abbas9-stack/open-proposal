import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const MarketingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col justify-between selection:bg-[#4F46E5] selection:text-white">
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


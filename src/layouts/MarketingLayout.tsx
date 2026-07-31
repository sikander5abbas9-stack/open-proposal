import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const MarketingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#17140f] font-sans antialiased flex flex-col justify-between selection:bg-[#17140f] selection:text-[#f7f2e8]">
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


import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Check, ArrowLeft, Sparkles } from 'lucide-react';

export const DemoLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col justify-between selection:bg-[#4F46E5] selection:text-white">
      
      {/* Simplified Header for Demo Page */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo with Link back to Home */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-6 h-6 rounded-lg bg-[#4F46E5] flex items-center justify-center shrink-0 shadow-xs">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] uppercase font-sans">
              PROPOSALA
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/analyzer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0F172A] bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#E2E8F0] rounded-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Test Live Analyzer</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0F172A] bg-white hover:bg-slate-50 border border-[#E2E8F0] rounded-lg transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-8 px-4 sm:px-6 lg:px-8 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © 2026 uConnect Technologies PVT LTD. All rights reserved. Open Proposal is a product of uConnect Technologies PVT LTD.
          </p>
          <div className="flex items-center gap-4 text-[#0F172A] font-medium">
            <Link to="/terms" className="hover:text-[#4F46E5] transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-[#4F46E5] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#4F46E5] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Check, ArrowLeft, Sparkles } from 'lucide-react';

export const DemoLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#022C22] font-sans antialiased flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      
      {/* Simplified Header for Demo Page */}
      <header className="bg-[#FAF9F6]/90 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo with Link back to Home */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-6 h-6 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-amber-500 stroke-[3]" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-widest text-[#022C22] uppercase font-sans">
              OPEN PROPOSAL
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/analyzer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/60 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Test Live Analyzer</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-emerald-950/10 rounded-lg transition-all shadow-2xs"
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
      <footer className="bg-[#FAF9F6] border-t border-gray-200/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © 2026 uConnect Technologies PVT LTD. All rights reserved. Open Proposal is a product of uConnect Technologies PVT LTD.
          </p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <Link to="/terms" className="hover:text-emerald-800 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-emerald-800 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-emerald-800 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

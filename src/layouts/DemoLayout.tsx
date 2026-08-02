import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';

export const DemoLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      
      {/* Simplified Header for Demo Page */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo with Link back to Home */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-6 h-6 rounded-sm bg-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase font-sans">
              PROPOSALA
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/analyzer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-indigo-50 hover:bg-indigo-100 border border-slate-200 rounded-sm transition-all"
            >
              <span>Test Live Analyzer</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-sm transition-all shadow-xs"
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
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © 2026 uConnect Technologies PVT LTD. All rights reserved. Open Proposal is a product of uConnect Technologies PVT LTD.
          </p>
          <div className="flex items-center gap-4 text-slate-900 font-medium">
            <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

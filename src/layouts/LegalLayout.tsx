import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export const LegalLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let activeTab: 'terms' | 'privacy' | 'refund' | 'contact' = 'terms';
  if (path.includes('privacy')) activeTab = 'privacy';
  else if (path.includes('refund')) activeTab = 'refund';
  else if (path.includes('contact')) activeTab = 'contact';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-6 h-6 rounded-sm bg-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase font-sans">
              PROPOSALA
            </span>
          </Link>

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
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Sub-Navigation Tabs */}
          <div className="bg-white p-2 sm:p-2.5 rounded-sm border border-slate-200 shadow-sm flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold">
            <Link
              to="/terms"
              className={`px-3.5 py-2 rounded-sm transition-all ${
                activeTab === 'terms'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Terms of Service
            </Link>

            <Link
              to="/privacy"
              className={`px-3.5 py-2 rounded-sm transition-all ${
                activeTab === 'privacy'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Privacy Policy
            </Link>

            <Link
              to="/refund"
              className={`px-3.5 py-2 rounded-sm transition-all ${
                activeTab === 'refund'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Refund Policy
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-sm transition-all ${
                activeTab === 'contact'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Child Route Outlet */}
          <div className="bg-white p-6 sm:p-10 rounded-sm border border-slate-200 shadow-sm">
            <Outlet />
          </div>

        </div>
      </main>

      {/* Main Shared Footer */}
      <Footer />

    </div>
  );
};

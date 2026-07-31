import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Check, ArrowLeft, FileText, Shield, RefreshCcw, Mail } from 'lucide-react';
import { Footer } from '../components/Footer';

export const LegalLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let activeTab: 'terms' | 'privacy' | 'refund' | 'contact' = 'terms';
  if (path.includes('privacy')) activeTab = 'privacy';
  else if (path.includes('refund')) activeTab = 'refund';
  else if (path.includes('contact')) activeTab = 'contact';

  return (
    <div className="min-h-screen bg-[#F4F8F5] text-[#022C22] font-sans antialiased flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      
      {/* Top Header */}
      <header className="bg-[#F4F8F5]/90 backdrop-blur-md border-b border-emerald-950/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="w-6 h-6 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-amber-500 stroke-[3]" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-widest text-[#022C22] uppercase font-sans">
              OPEN PROPOSAL
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/analyzer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/60 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all"
            >
              <span>Test Live Analyzer</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-emerald-950/10 rounded-lg transition-all"
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
          <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-emerald-950/10 shadow-xs flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold">
            <Link
              to="/terms"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'terms'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-emerald-50/50 text-slate-700 hover:bg-emerald-100/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </Link>

            <Link
              to="/privacy"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'privacy'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-emerald-50/50 text-slate-700 hover:bg-emerald-100/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </Link>

            <Link
              to="/refund"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'refund'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-emerald-50/50 text-slate-700 hover:bg-emerald-100/60'
              }`}
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Refund Policy</span>
            </Link>

            <Link
              to="/contact"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'contact'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-emerald-50/50 text-slate-700 hover:bg-emerald-100/60'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Child Route Outlet */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-emerald-950/10 shadow-xs">
            <Outlet />
          </div>

        </div>
      </main>

      {/* Main Shared Footer */}
      <Footer />

    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowRight, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A] font-sans">
              Proposala
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-mono border border-[#E2E8F0] font-semibold">
              AI for Upwork
            </span>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
            <button
              onClick={() => handleSectionClick('value-props')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Why Proposala
            </button>
            <button
              onClick={() => handleSectionClick('how-it-works')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              How it Works
            </button>
            <button
              onClick={() => handleSectionClick('comparison')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Comparison
            </button>
            <button
              onClick={() => handleSectionClick('faq')}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>

          {/* CTA Button & Actions (Right - Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-3.5 py-2 text-xs font-mono font-semibold text-[#0F172A] bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Launch App</span>
            </Link>

            <Link
              to="/request-demo"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] border border-[#4F46E5] rounded-lg transition-all shadow-xs active:scale-98 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/request-demo"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#4F46E5] rounded-lg"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0F172A] rounded-lg bg-slate-50 border border-[#E2E8F0] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-4 shadow-md animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#64748B]">
            <button
              onClick={() => handleSectionClick('value-props')}
              className="text-left py-2 hover:text-[#0F172A] transition-colors border-b border-slate-100"
            >
              Why Proposala
            </button>
            <button
              onClick={() => handleSectionClick('how-it-works')}
              className="text-left py-2 hover:text-[#0F172A] transition-colors border-b border-slate-100"
            >
              How it Works
            </button>
            <button
              onClick={() => handleSectionClick('comparison')}
              className="text-left py-2 hover:text-[#0F172A] transition-colors border-b border-slate-100"
            >
              Comparison
            </button>
            <button
              onClick={() => handleSectionClick('faq')}
              className="text-left py-2 hover:text-[#0F172A] transition-colors border-b border-slate-100"
            >
              FAQ
            </button>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#0F172A] font-semibold flex items-center gap-2 border-b border-slate-100"
            >
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span>Launch Upwork Proposal Studio</span>
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/request-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};



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
    <nav className="sticky top-0 z-50 w-full bg-[#f7f2e8]/90 backdrop-blur-md border-b border-[#ddd2bf] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-8 h-8 rounded-lg bg-[#17140f] border border-[#ddd2bf] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-[#f7f2e8] fill-[#f7f2e8]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#17140f] font-serif">
              Proposala
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#17140f]/10 text-[#17140f] font-mono border border-[#ddd2bf]">
              AI for Upwork
            </span>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#17140f]/80">
            <button
              onClick={() => handleSectionClick('value-props')}
              className="hover:text-[#17140f] transition-colors cursor-pointer"
            >
              Why Proposala
            </button>
            <button
              onClick={() => handleSectionClick('how-it-works')}
              className="hover:text-[#17140f] transition-colors cursor-pointer"
            >
              How it Works
            </button>
            <button
              onClick={() => handleSectionClick('comparison')}
              className="hover:text-[#17140f] transition-colors cursor-pointer"
            >
              Comparison
            </button>
            <button
              onClick={() => handleSectionClick('faq')}
              className="hover:text-[#17140f] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>

          {/* CTA Button & Actions (Right - Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-3.5 py-2 text-xs font-mono font-semibold text-[#17140f] bg-[#17140f]/5 hover:bg-[#17140f]/10 border border-[#ddd2bf] rounded-lg transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#17140f]" />
              <span>Launch App</span>
            </Link>

            <Link
              to="/request-demo"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#f7f2e8] bg-[#17140f] hover:bg-[#27241e] border border-[#17140f] rounded-lg transition-all shadow-md active:scale-98 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ddd2bf]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/request-demo"
              className="px-3 py-1.5 text-xs font-semibold text-[#f7f2e8] bg-[#17140f] rounded-lg"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#17140f] rounded-lg bg-[#17140f]/5 border border-[#ddd2bf] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f7f2e8]/95 backdrop-blur-md border-b border-[#ddd2bf] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#17140f]/80">
            <button
              onClick={() => handleSectionClick('value-props')}
              className="text-left py-2 hover:text-[#17140f] transition-colors border-b border-[#ddd2bf]/50"
            >
              Why Proposala
            </button>
            <button
              onClick={() => handleSectionClick('how-it-works')}
              className="text-left py-2 hover:text-[#17140f] transition-colors border-b border-[#ddd2bf]/50"
            >
              How it Works
            </button>
            <button
              onClick={() => handleSectionClick('comparison')}
              className="text-left py-2 hover:text-[#17140f] transition-colors border-b border-[#ddd2bf]/50"
            >
              Comparison
            </button>
            <button
              onClick={() => handleSectionClick('faq')}
              className="text-left py-2 hover:text-[#17140f] transition-colors border-b border-[#ddd2bf]/50"
            >
              FAQ
            </button>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#17140f] font-semibold flex items-center gap-2 border-b border-[#ddd2bf]/50"
            >
              <Sparkles className="w-4 h-4 text-[#17140f]" />
              <span>Launch Upwork Proposal Studio</span>
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/request-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#f7f2e8] bg-[#17140f] hover:bg-[#27241e] rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4 text-[#ddd2bf]" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};



import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17140f] text-[#ddd2bf] border-t border-[#ddd2bf]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Top Row: Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#ddd2bf]/10">
          
          {/* Left Side: Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-8 h-8 rounded-lg bg-[#ddd2bf]/10 border border-[#ddd2bf]/30 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-[#ddd2bf]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#f7f2e8] font-serif">
              Proposala
            </span>
          </Link>

          {/* Center / Right Side: Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono tracking-wider text-[#ddd2bf]/70 uppercase">
            <Link 
              to="/terms" 
              className="hover:text-[#f7f2e8] transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="hover:text-[#f7f2e8] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/refund" 
              className="hover:text-[#f7f2e8] transition-colors"
            >
              Refund Policy
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-[#f7f2e8] transition-colors"
            >
              Contact Support
            </Link>
          </nav>

        </div>

        {/* Bottom Row / Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#ddd2bf]/50 font-sans">
          <p>
            © 2026 Proposala Inc. All rights reserved. Made for professional freelancers & agencies.
          </p>
          <p className="text-[11px] font-mono text-[#ddd2bf]/40">
            Independent AI proposal optimization platform. Not affiliated with or endorsed by Upwork Inc.
          </p>
        </div>

      </div>
    </footer>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';

export const BottomCTA: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-sm py-14 px-6 sm:px-12 text-center space-y-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Tag */}
        <div className="relative z-10">
          <span className="inline-block bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider">
            NEXT STEP
          </span>
        </div>

        {/* Headline */}
        <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-serif leading-tight max-w-2xl mx-auto">
          Paste one Upwork job and see if you should apply.
        </h2>

        {/* Subtext */}
        <p className="relative z-10 text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed">
          You get a job score, the past work to use, and a proposal draft you can edit before sending.
        </p>

        {/* CTA Button */}
        <div className="relative z-10 pt-2 flex justify-center">
          <Link
            to="/request-demo"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg transition-all"
          >
            <span>Request a demo</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

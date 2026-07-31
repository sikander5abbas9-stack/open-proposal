import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Zap, Layers, Target, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const scrollToSteps = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-[#FAF9F5] border-b border-[#EAE6DF]">
      {/* Background warm glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-400/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Made for Upwork proposals</span>
            </div>

            {/* Headline H1 in Playfair Display / Serif */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#1C1A17] tracking-tight leading-[1.12] font-serif">
              Save your Connects.{' '}
              <span className="italic font-normal text-emerald-700 underline decoration-emerald-300 decoration-2 underline-offset-8">
                Apply to better
              </span>{' '}
              Upwork jobs.
            </h1>

            {/* Subtitle in Sans-serif */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Stop burning connects on ghost listings or bad-fit clients. Paste any Upwork job to score client risk, surface your best past case studies, and generate high-converting proposal drafts in seconds.
            </p>

            {/* Actions: Side-by-side buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/request-demo"
                className="w-full sm:w-auto px-7 py-4 text-base font-bold text-white bg-[#1C1A17] hover:bg-[#2C2925] rounded-xl shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Request a demo</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>

              <button
                onClick={scrollToSteps}
                className="w-full sm:w-auto px-6 py-4 text-base font-bold text-slate-800 bg-white hover:bg-slate-100 border border-[#DCD7CE] rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-all"
              >
                <span>See the steps</span>
              </button>
            </div>

            {/* Footer of Hero: Three checkmark points in a row */}
            <div className="pt-6 border-t border-[#EAE6DF] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">✓</span>
                <span>Job score</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">✓</span>
                <span>Past work</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">✓</span>
                <span>Proposal draft</span>
              </span>
            </div>

          </div>

          {/* Right Column: Glowing modern tech illustration with radar chart & data nodes */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer Glowing halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-amber-500/20 rounded-3xl blur-xl" />

              {/* Main Card */}
              <div className="relative rounded-2xl bg-white border border-[#E0DACF] p-5 sm:p-6 shadow-2xl space-y-5">
                
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Upwork Job Match Engine</div>
                      <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Analysis Completed
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    94/100 Match
                  </span>
                </div>

                {/* Radar Chart & Tech Illustration Visual */}
                <div className="relative bg-slate-900 rounded-xl p-5 text-white overflow-hidden space-y-4 shadow-inner">
                  
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />

                  {/* Top Score Radar Visual */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Client Safety & Match</div>
                      <div className="text-lg font-bold text-white font-display">Senior React Architect</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold font-mono text-xs shadow-xs">
                      A+
                    </div>
                  </div>

                  {/* Animated SVG Radar Chart Illustration */}
                  <div className="relative z-10 h-44 flex items-center justify-center py-2">
                    <svg className="w-40 h-40 overflow-visible" viewBox="0 0 100 100">
                      {/* Concentric Radar Circles */}
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="#334155" strokeWidth="1" />
                      <circle cx="50" cy="50" r="16" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                      
                      {/* Axis Lines */}
                      <line x1="50" y1="10" x2="50" y2="90" stroke="#334155" strokeWidth="1" />
                      <line x1="10" y1="50" x2="90" y2="50" stroke="#334155" strokeWidth="1" />

                      {/* Radar Polygon Shape (Score Fill) */}
                      <polygon points="50,15 82,42 75,78 28,70 18,40" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="2" />
                      
                      {/* Data Nodes */}
                      <circle cx="50" cy="15" r="3" fill="#10b981" />
                      <circle cx="82" cy="42" r="3" fill="#10b981" />
                      <circle cx="75" cy="78" r="3" fill="#10b981" />
                      <circle cx="28" cy="70" r="3" fill="#10b981" />
                      <circle cx="18" cy="40" r="3" fill="#10b981" />

                      {/* Labels */}
                      <text x="50" y="6" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="bold">Budget ($3.5k)</text>
                      <text x="96" y="44" textAnchor="start" fill="#94a3b8" fontSize="6" fontWeight="bold">Hire Rate (88%)</text>
                      <text x="78" y="86" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="bold">Past Work Match</text>
                      <text x="22" y="78" textAnchor="end" fill="#94a3b8" fontSize="6" fontWeight="bold">Low Risk</text>
                    </svg>

                    {/* Floating Glass Badge Node */}
                    <div className="absolute top-2 right-2 bg-slate-800/90 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-lg text-[10px] text-emerald-300 shadow-md">
                      ✓ Verified Hire History
                    </div>
                  </div>

                  {/* Matched Case Study Node */}
                  <div className="relative z-10 bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-slate-200 font-medium">Auto-selected Portfolio Case Study:</span>
                    </div>
                    <span className="text-emerald-400 font-bold font-mono text-[11px]">SaaS Dashboard Refactor</span>
                  </div>

                </div>

                {/* Bottom Floating Stats Pill */}
                <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Connect Saver Guard
                  </span>
                  <span className="text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded text-[11px]">
                    Recommended: BID
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

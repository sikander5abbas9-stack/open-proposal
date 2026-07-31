import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database } from 'lucide-react';

export const FeaturePastWork: React.FC = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header 1 */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span>Semantic Past Work Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Use past work to answer the client's problem.
          </h2>
          <p className="text-slate-600 text-base">
            Clients hire developers who have solved their exact issue before. Open Proposal maps job requirements directly to your portfolio bank.
          </p>
        </div>

        {/* Visual Data Block: Job Detail -> Best Past Work -> Proposal Angle */}
        <div className="max-w-5xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center sm:text-left">
            Live Mapping Flow Architecture
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Block 1: Job Detail */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Step A: Job Detail</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Extracted Need</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">"React Dashboard Rendering Slowly"</h4>
              <p className="text-xs text-slate-600">
                Client needs high-performance virtualized tables & Redis API caching for 80k active metrics.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">React 18</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">TypeScript</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Redis</span>
              </div>
            </div>

            {/* Arrow connector */}
            <div className="hidden md:flex items-center justify-center text-emerald-600">
              <ArrowRight className="w-6 h-6" />
            </div>

            {/* Block 2: Best Past Work */}
            <div className="p-5 rounded-xl bg-white border border-emerald-300 space-y-3 relative shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">Step B: Best Past Work</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  98% Match
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">"FinTech Dashboard Overhaul"</h4>
              <p className="text-xs text-slate-600">
                "Reduced render latency by 74% (from 4.2s to 1.1s) for 80k daily active traders."
              </p>
              <div className="text-[11px] text-teal-700 font-semibold">
                Pulls verified metrics from your saved portfolio bank.
              </div>
            </div>

            {/* Arrow connector */}
            <div className="hidden md:flex items-center justify-center text-emerald-600">
              <ArrowRight className="w-6 h-6" />
            </div>

            {/* Block 3: Proposal Angle */}
            <div className="p-5 rounded-xl bg-white border border-cyan-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-700">Step C: Proposal Angle</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
                  High Conversion
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Custom Credible Opening</h4>
              <p className="text-xs text-slate-600 italic">
                "Instead of guessing bottlenecks, I optimized a similar 80k-user React dashboard cut render lag by 74% using Redis API caching..."
              </p>
              <div className="text-[11px] text-cyan-700 font-semibold">
                Client sees proof before generic promises.
              </div>
            </div>

          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              Save your case studies once in your team's Portfolio Bank and use them across all bids.
            </div>
            <Link
              to="/portfolio"
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Database className="w-3.5 h-3.5 text-teal-600" />
              <span>Manage Portfolio Bank</span>
            </Link>
          </div>

        </div>

        {/* Headline 2: Get proposal drafts you can actually use */}
        <div className="mt-20 text-center max-w-3xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Get proposal drafts you can actually use.
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            No rigid templates. No robotic AI intros. Just sharp, problem-focused proposal drafts ready to edit and copy.
          </p>
          <div className="pt-4">
            <Link
              to="/analyzer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-block"
            >
              Generate Draft for Any Upwork Job
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

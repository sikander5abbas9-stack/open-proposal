import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, AlertOctagon, Flame, FileWarning, Bot, CheckCircle2, ArrowRight } from 'lucide-react';

export const CommonMistakesSection: React.FC = () => {
  const mistakes = [
    {
      icon: Flame,
      title: 'Spending Connects on bad jobs',
      problem: 'Applying to unverified clients with low hire rates, unrealistic scope, or cheap budget expectations.',
      solution: 'Proposala checks client payment status, rating, average spend, and budget consistency before you write.',
    },
    {
      icon: FileWarning,
      title: 'Writing long proposals for wrong matches',
      problem: 'Spending 30 minutes writing multi-paragraph essays for jobs where your core stack isn\'t a fit.',
      solution: 'Instant 0-100 fit score tells you immediately whether to Skip, send a Quick Pitch, or write a Detailed Bid.',
    },
    {
      icon: AlertOctagon,
      title: 'Using wrong past projects',
      problem: 'Sending generic links or past work that doesn\'t address the client\'s specific problem or industry.',
      solution: 'Semantic matcher pulls the exact case study with metrics (+32% conversion, 74% speedup) that answers the client\'s bottleneck.',
    },
    {
      icon: Bot,
      title: 'Sending raw AI drafts',
      problem: 'Using ChatGPT generic templates ("Dear Hiring Manager, I am a passionate developer with 5+ years...") which clients ignore instantly.',
      solution: 'Drafts start directly with problem diagnosis, concise technical proof, and natural human call-to-actions.',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            <span>The Upwork Proposal Pitfalls</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Most freelancers lose before they write the proposal.
          </h2>
          <p className="text-slate-600 text-base">
            Writing proposals without pre-screening and portfolio matching burns your time and connects. Here is how Proposala fixes each leak:
          </p>
        </div>

        {/* Grid of 4 mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mistakes.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      <span className="font-bold text-red-700">The Mistake: </span>
                      {m.problem}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-800">The Fix: </span>
                    <span>{m.solution}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/analyzer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-sm transition-all"
          >
            <span>Stop losing Connects — Test a job post now</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </div>

      </div>
    </section>
  );
};

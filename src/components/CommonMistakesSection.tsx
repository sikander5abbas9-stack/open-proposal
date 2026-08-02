import React from 'react';
import { Link } from 'react-router-dom';

export const CommonMistakesSection: React.FC = () => {
  const mistakes = [
    {
      title: 'Spending Connects on bad jobs',
      problem: 'Applying to unverified clients with low hire rates, unrealistic scope, or cheap budget expectations.',
      solution: 'Proposala checks client payment status, rating, average spend, and budget consistency before you write.',
    },
    {
      title: 'Writing long proposals for wrong matches',
      problem: 'Spending 30 minutes writing multi-paragraph essays for jobs where your core stack isn\'t a fit.',
      solution: 'Instant 0-100 fit score tells you immediately whether to Skip, send a Quick Pitch, or write a Detailed Bid.',
    },
    {
      title: 'Using wrong past projects',
      problem: 'Sending generic links or past work that doesn\'t address the client\'s specific problem or industry.',
      solution: 'Semantic matcher pulls the exact case study with metrics (+32% conversion, 74% speedup) that answers the client\'s bottleneck.',
    },
    {
      title: 'Sending raw AI drafts',
      problem: 'Using ChatGPT generic templates ("Dear Hiring Manager, I am a passionate developer with 5+ years...") which clients ignore instantly.',
      solution: 'Drafts start directly with problem diagnosis, concise technical proof, and natural human call-to-actions.',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
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
          {mistakes.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="font-bold text-red-700">The Mistake: </span>
                  {m.problem}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-700">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <div>
                  <span className="font-bold text-emerald-800">The Fix: </span>
                  <span>{m.solution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/analyzer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-sm bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-sm transition-all"
          >
            <span>Stop losing Connects — Test a job post now</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

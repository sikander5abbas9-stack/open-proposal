import React from 'react';
import { Link } from 'react-router-dom';

export const ValueProps: React.FC = () => {
  const cards = [
    {
      badge: 'Connect Protection',
      title: 'Save your Connects',
      subtitle: 'See which jobs are good before you write',
      description: 'Upwork connects cost real money. Proposala analyzes budget consistency, payment verification, client hire rate, and job clarity before you spend a single connect.',
      points: [
        'Client risk flags (unverified payment, cheap rate history)',
        'Score 0-100 indicating exact ROI to apply',
        'Stop wasting connects on jobs you won\'t win',
      ],
      borderColor: 'border-emerald-200',
    },
    {
      badge: 'Portfolio Matching',
      title: 'Use the right past work',
      subtitle: 'Mention matching projects automatically',
      description: 'Clients buy proof, not promises. Proposala searches your portfolio bank and identifies the exact case study or project outcome that solves the client\'s specific problem.',
      points: [
        'Automatic semantic matching to client pain points',
        'Pulls real metrics & outcomes (e.g. "+32% conversion")',
        'Never forget relevant past work during fast bidding',
      ],
      borderColor: 'border-teal-200',
    },
    {
      badge: 'Draft Generator',
      title: 'Start from a better draft',
      subtitle: 'Edit the strongest proposal instantly',
      description: 'Skip blank page anxiety. Get a tailored, non-robotic proposal draft written specifically for the job, with custom hooks and past project references ready for your quick touch.',
      points: [
        'Zero generic AI fluff or "Dear Hiring Manager"',
        'Focuses on problem diagnosis and client outcome',
        'Custom tone presets: Direct, Value-First, Technical',
      ],
      borderColor: 'border-cyan-200',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-sm border border-emerald-200 inline-block">
            Why Upwork Freelancers & Agencies Choose Proposala
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Built to fix the 3 biggest Upwork proposal leaks
          </p>
          <p className="text-slate-600 text-base">
            Stop losing connects on bad jobs and sending unread generic proposals.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`relative rounded-sm bg-white p-8 border ${card.borderColor} shadow-xs flex flex-col justify-between group hover:shadow-md transition-all duration-300`}
            >
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-slate-100 text-slate-700 border border-slate-200">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
                    {card.title}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-700 mt-1">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  {card.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-slate-100">
                <Link
                  to="/analyzer"
                  className="w-full py-2.5 px-4 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold text-slate-800 flex items-center justify-center transition-all"
                >
                  Try with Live Job
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

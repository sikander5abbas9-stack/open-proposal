import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const cards = [
    {
      title: 'Generic AI writer',
      tag: 'Limited',
      tagBg: 'bg-slate-100 text-slate-700 border-slate-300',
      description: 'Generates generic ChatGPT style essays that clients immediately identify as automated spam.',
      isHighlighted: false,
      features: [
        { text: 'Pre-bidding Client Risk Scoring', included: false },
        { text: 'Automatic Past Work Portfolio Match', included: false },
        { text: 'Problem-First Hook Diagnosis', included: false },
        { text: 'Upwork Connect ROI Protection', included: false },
        { text: 'Generic "Dear Hiring Manager" Fluff', included: true, isWarning: true },
      ],
    },
    {
      title: 'Template library',
      tag: 'Limited',
      tagBg: 'bg-slate-100 text-slate-700 border-slate-300',
      description: 'Static copy-paste templates that fail to address the specific client pain points and metrics.',
      isHighlighted: false,
      features: [
        { text: 'Pre-bidding Client Risk Scoring', included: false },
        { text: 'Automatic Past Work Portfolio Match', included: false },
        { text: 'Problem-First Hook Diagnosis', included: false },
        { text: 'Upwork Connect ROI Protection', included: false },
        { text: 'Requires Manual Fill-in Every Time', included: true, isWarning: true },
      ],
    },
    {
      title: 'Proposala',
      tag: 'Best fit',
      tagBg: 'bg-emerald-600 text-white font-extrabold shadow-sm',
      description: 'Analyzes Upwork job posts, scores client risk, matches past case studies, and drafts tailored proposals in seconds.',
      isHighlighted: true,
      features: [
        { text: 'Pre-bidding Client Risk Scoring (0-100)', included: true },
        { text: 'Automatic Past Work Portfolio Match', included: true },
        { text: 'Problem-First Hook Diagnosis', included: true },
        { text: 'Upwork Connect ROI Protection', included: true },
        { text: 'Human-First Non-Robotic Tone Presets', included: true },
      ],
    },
  ];

  return (
    <section id="why-different" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-slate-900 text-white text-xs font-semibold shadow-xs">
            <span>Why Different</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 tracking-tight font-serif leading-tight">
            Built specifically for Upwork proposal success
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            See how Proposala compares against generic AI text writers and static template libraries.
          </p>
        </div>

        {/* 3 Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`relative rounded-sm p-8 flex flex-col justify-between transition-all duration-300 ${
                card.isHighlighted
                  ? 'bg-white border-2 border-emerald-500 shadow-2xl ring-4 ring-emerald-500/10 scale-[1.02] z-10'
                  : 'bg-white border border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <h3 className={`text-2xl font-semibold tracking-tight font-serif ${card.isHighlighted ? 'text-emerald-900' : 'text-slate-900'}`}>
                    {card.title}
                  </h3>
                  <span className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-sm border ${card.tagBg}`}>
                    {card.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {card.description}
                </p>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Capabilities</div>
                  <ul className="space-y-3 text-xs">
                    {card.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        {f.included ? (
                          <div className="w-4 h-4 rounded-sm bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : f.isWarning ? (
                          <div className="w-4 h-4 rounded-sm bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            !
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-sm bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                            <X className="w-3 h-3" />
                          </div>
                        )}
                        <span className={f.included ? 'text-slate-800 font-semibold' : 'text-slate-500 line-through'}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="pt-8 mt-6 border-t border-slate-100">
                {card.isHighlighted ? (
                  <Link
                    to="/request-demo"
                    className="w-full py-3.5 px-4 rounded-sm bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center transition-all shadow-md"
                  >
                    <span>Get Started with Proposala</span>
                  </Link>
                ) : (
                  <div className="w-full py-3 px-4 rounded-sm bg-slate-100 text-slate-500 text-xs font-medium text-center">
                    Standard Output Only
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

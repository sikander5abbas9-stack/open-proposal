import React from 'react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: '1. Paste job',
      subtitle: 'Paste any Upwork job post URL or raw text',
      description: 'Copy the job description from Upwork and paste it directly into Proposala. The analysis engine automatically parses client payment history, hourly rates, project scope, tech stack requirements, and hidden client friction points in seconds.',
      visualBadge: 'Instant Job Parsing',
      mockup: (
        <div className="bg-slate-900 rounded-sm p-5 border border-slate-800 text-white space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-mono text-[11px] text-emerald-400">Upwork Job Parser</span>
            <span className="text-emerald-400 font-bold">✓ Parsed 14 Parameters</span>
          </div>
          <div className="p-3 rounded-sm bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
            <div className="text-slate-400 text-[10px]">Client: USA • $45k+ Spent • 4.9 ★ Rating</div>
            <div className="text-white font-semibold font-sans text-sm">"Looking for an expert React engineer for SaaS redesign"</div>
            <div className="flex gap-2 text-[10px] pt-1">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-sm">Budget: $2,500</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm">10-15 Proposals</span>
            </div>
          </div>
        </div>
      )
    },
    {
      stepNumber: '02',
      title: '2. See if apply',
      subtitle: 'Get instant 0-100 fit score and client risk analysis',
      description: 'Stop guessing if a job is worth your connects. Proposala evaluates client payment verification, average hourly rate history, job requirement clarity, and skill alignment to give you an objective "APPLY NOW" or "SKIP JOB" decision.',
      visualBadge: 'Connect Protection Engine',
      mockup: (
        <div className="bg-white rounded-sm p-5 border border-slate-200 text-slate-900 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs text-slate-500">Decision Engine</div>
              <div className="text-base font-bold text-slate-900">Job Match & Safety</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-600 font-mono">92/100</div>
              <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">HIGH FIT</div>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-sm bg-emerald-50 text-emerald-900 border border-emerald-200">
              <span className="font-semibold">
                ✓ Payment Verified Client
              </span>
              <span className="font-bold">LOW RISK</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-sm bg-slate-50 text-slate-700 border border-slate-200">
              <span className="font-medium">Avg Hire Rate: 84%</span>
              <span className="font-semibold text-slate-900">12 Connects Required</span>
            </div>
          </div>
        </div>
      )
    },
    {
      stepNumber: '03',
      title: '3. Find past work',
      subtitle: 'Auto-select relevant portfolio case studies and metrics',
      description: 'Clients buy proven outcomes, not vague claims. Proposala matches your saved portfolio bank against the job requirements and surfaces exact metrics (e.g., "-74% load time", "+42% conversion") to prove your expertise.',
      visualBadge: 'AI Semantic Matcher',
      mockup: (
        <div className="bg-slate-900 rounded-sm p-5 border border-slate-800 text-white space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-mono">Portfolio Case Study Matcher</span>
            <span className="text-emerald-400 text-[11px] font-bold">100% Relevance Match</span>
          </div>
          <div className="p-3.5 rounded-sm bg-slate-950 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">FinTech Web App Dashboard Overhaul</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-300">Selected</span>
            </div>
            <p className="text-[11px] text-slate-300">
              "Refactored legacy React state and implemented virtualized data grids to handle 50k+ live rows."
            </p>
            <div className="text-[10px] font-semibold text-emerald-400 pt-1">
              ✓ Metric: Reduced latency from 4.2s to 1.1s
            </div>
          </div>
        </div>
      )
    },
    {
      stepNumber: '04',
      title: '4. Edit draft',
      subtitle: 'Generate a high-converting, human proposal ready to send',
      description: 'Receive a custom proposal draft written specifically for this client and job. Built with a compelling first-line hook, direct problem breakdown, past work proof, and a low-friction call to action.',
      visualBadge: 'Human-First Proposal Writer',
      mockup: (
        <div className="bg-white rounded-sm p-5 border border-slate-200 text-slate-900 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
            <span className="font-bold text-slate-800">Proposal Draft</span>
            <span className="text-emerald-700 font-semibold text-[11px]">Ready to Copy & Edit</span>
          </div>
          <div className="p-3 rounded-sm bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-semibold text-slate-900">
              "Hi! I reviewed your post for the React SaaS dashboard redesign. The primary bottleneck in dashboard renders usually comes from unmemoized data transformations..."
            </p>
            <p className="text-slate-600 text-[11px]">
              "Recently, I built a similar dashboard for a FinTech platform where we achieved a 74% speedup..."
            </p>
          </div>
          <div className="flex justify-end pt-1">
            <span className="px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-sm inline-block">
              Copy Proposal
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-slate-900 text-white text-xs font-semibold shadow-xs">
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 tracking-tight font-serif leading-tight">
            How Proposala transforms your Upwork workflow
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            From raw Upwork job post to a high-converting, tailored proposal in 4 simple steps.
          </p>
        </div>

        {/* Vertical Alternating Timeline / Zigzag Layout */}
        <div className="space-y-16 sm:space-y-24">
          {steps.map((s, idx) => {
            const isEven = idx % 2 === 0;
            
            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content Column */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    <span>{s.visualBadge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight font-serif">
                    {s.title}
                  </h3>

                  <p className="text-sm sm:text-base font-semibold text-emerald-800">
                    {s.subtitle}
                  </p>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Visual Mockup Column */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative group">
                    <div className="relative">
                      {s.mockup}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/analyzer"
            className="px-8 py-4 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg shadow-slate-900/10 inline-flex items-center justify-center transition-all transform hover:-translate-y-0.5"
          >
            <span>Try the 4-Step Process Live</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

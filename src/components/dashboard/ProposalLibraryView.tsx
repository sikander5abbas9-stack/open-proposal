import React, { useState } from 'react';

export const ProposalLibraryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proof' | 'shapes'>('proof');

  const shapes = [
    {
      title: 'Blunt claim, no preamble',
      type: 'OPENER DIRECT',
      content: 'I can do this. It is not the scary version of the project. {{TIMELINE}}, {{PRICE_RANGE}}, and I will keep the build sane...',
      tags: ['terse', 'peer'],
      used: '0x'
    },
    {
      title: 'Mirror their situation',
      type: 'OPENER MIRROR',
      content: 'Hi, so you have {{STACK}} at {{SCALE}}, and {{PRIMARY_PROBLEM}} is eating time now, yeah? I would keep the fix simple.',
      tags: ['warm', 'peer', 'vague-brief'],
      used: '0x'
    },
    {
      title: 'Clarifier before pitch',
      type: 'OPENER QUESTION',
      content: 'Quick question before I pitch too much: do you mainly want {{GOAL_A}}, or {{GOAL_B}}? Different answer, different plan.',
      tags: ['vague-brief', 'peer'],
      used: '0x'
    },
    {
      title: 'Hard credential open',
      type: 'OPENER CREDENTIAL',
      content: '{{YEARS}} years on {{SPECIALTY}}, {{COUNT}} shipped projects in {{DOMAIN}}. This one looks familiar, not scary.',
      tags: ['technical', 'skeptical-buyer', 'clear-scope'],
      used: '0x'
    },
    {
      title: 'Push back on the brief',
      type: 'OPENER CONTRARIAN',
      content: 'Honestly, {{STACK_OR_PLAN}} may be the wrong way to do this. I would use {{BETTER_APPROACH}} so you avoid {{SPECIFIC_RISK}}...',
      tags: ['technical', 'peer', 'skeptical-buyer'],
      used: '0x'
    },
    {
      title: 'Micro-anecdote bridge',
      type: 'OPENER STORY',
      content: 'Last {{TIMEFRAME}}, a {{CLIENT_TYPE}} had almost the same issue. {{ONE_LINE_OUTCOME}}. I would use that same simple shape...',
      tags: ['warm', 'b2b'],
      used: '0x'
    }
  ];

  return (
    <div className="space-y-6 font-sans text-slate-900 dark:text-slate-100 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            PROPOSALA · PROPOSAL LIBRARY
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Proof and shapes
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1">
            Proof is the factual material the model may use. Shapes are the proposal structures that arrange that proof.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button className="px-3.5 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-sm cursor-pointer">
            New proof
          </button>
          <button className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-sm font-semibold cursor-pointer">
            Export JSON
          </button>
          <button className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-sm font-semibold cursor-pointer">
            Import JSON
          </button>
        </div>
      </div>

      {/* Proof vs Shapes Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Proof Card */}
        <div
          onClick={() => setActiveTab('proof')}
          className={`p-5 rounded-sm border cursor-pointer transition-all space-y-2 font-mono ${
            activeTab === 'proof' 
              ? 'bg-white dark:bg-slate-900 border-slate-900 dark:border-slate-100 ring-2 ring-slate-900/10 dark:ring-slate-100/10 shadow-sm' 
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">WHAT WE CAN SAY</div>
          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Proof</h3>
          <p className="text-xs font-sans text-slate-600 dark:text-slate-400">Facts, metrics, case snippets, risks, and past-work evidence.</p>
        </div>

        {/* Shapes Card */}
        <div
          onClick={() => setActiveTab('shapes')}
          className={`p-5 rounded-sm border cursor-pointer transition-all space-y-2 font-mono ${
            activeTab === 'shapes' 
              ? 'bg-white dark:bg-slate-900 border-slate-900 dark:border-slate-100 ring-2 ring-slate-900/10 dark:ring-slate-100/10 shadow-sm' 
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">HOW WE ARRANGE IT</div>
          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Shapes</h3>
          <p className="text-xs font-sans text-slate-600 dark:text-slate-400">Reusable openers, plans, risk moves, and closing structures.</p>
        </div>

      </div>

      {/* Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-sm space-y-3 font-mono text-xs shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <input
            type="text"
            placeholder={activeTab === 'proof' ? "Search proof..." : "Search shape name, content, tags..."}
            className="w-full max-w-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <span className="text-slate-400 dark:text-slate-500 text-right">
            {activeTab === 'proof' ? '94/94 proof items' : '33/33 shapes'}
          </span>
        </div>

        {/* Categories / Tags filter */}
        <div className="flex flex-wrap gap-1.5 text-[11px] pt-1">
          {['https://bonanzasatrangi.com/', 'https://jazz.com.pk/', 'https://outfitters.com.pk/', 'https://psl-t20.com/', 'https://ronin.pk/', 'https://row.rastah.co/'].map((url, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
              {url}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid View */}
      {activeTab === 'proof' ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs font-mono text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-sm space-y-2">
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-sm">OPENING</span>
            <h4 className="font-bold text-slate-900 dark:text-white font-sans text-sm">### **MindRay — Software & Tech Branding**</h4>
            <p className="text-slate-700 dark:text-slate-300 font-sans text-xs">
              Our design team crafted a sleek, modern visual identity for **MindRay**, an AI-driven software platform...
            </p>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 pt-1">used 0x · updated 2026-07-23</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-sm space-y-2">
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-sm">OPENING</span>
            <h4 className="font-bold text-slate-900 dark:text-white font-sans text-sm">### **Tekno — Tech Company Branding**</h4>
            <p className="text-slate-700 dark:text-slate-300 font-sans text-xs">
              Our design team created a futuristic, high-impact brand identity for **Tekno**, a next-gen technology startup...
            </p>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 pt-1">used 0x · updated 2026-07-23</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {shapes.map((s, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-5 space-y-3 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white font-serif text-sm">{s.title}</h4>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{s.used}</span>
              </div>

              <span className="inline-block text-[9px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-1.5 py-0.5 rounded-sm">
                {s.type}
              </span>

              <p className="text-slate-700 dark:text-slate-300 font-sans text-xs leading-relaxed">
                {s.content}
              </p>

              <div className="flex flex-wrap gap-1.5 text-[10px] pt-2">
                {s.tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

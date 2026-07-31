import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, FileText } from 'lucide-react';
import { SAMPLE_JOBS } from '../data/sampleJobs';

export const WorkflowSection: React.FC = () => {
  const [selectedJobId, setSelectedJobId] = useState<string>(SAMPLE_JOBS[0].id);
  const navigate = useNavigate();
  const currentJob = SAMPLE_JOBS.find(j => j.id === selectedJobId) || SAMPLE_JOBS[0];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simple 3-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Job post in.{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Score, past work, and proposal draft out.
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Stop guessing if a client is worth bidding on. Select or paste an Upwork job post below to see instant score and past work matching.
          </p>
        </div>

        {/* Interactive Workflow Demo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Job Selector (Input Side) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Select or Paste Upwork Job
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold">Click a sample job below</span>
            </div>

            <div className="space-y-3">
              {SAMPLE_JOBS.map((job) => {
                const isSelected = job.id === selectedJobId;
                const isRisky = job.id === 'job-3';

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{job.title}</h4>
                      {isRisky ? (
                        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                          Low Fit
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          High Fit
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 font-medium">
                      <span className="font-semibold text-slate-800">{job.budget}</span>
                      <span>•</span>
                      <span>{job.jobType}</span>
                      <span>•</span>
                      <span>{job.clientInfo.location}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to="/analyzer"
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-emerald-700 flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Or Paste Your Own Upwork Job URL / Text</span>
            </Link>
          </div>

          {/* Right: Instant Score & Past Work Output Preview */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
            
            {/* Header / Score bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">2. Proposala Score & Assessment</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{currentJob.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500">Match Score</div>
                  <div className={`text-2xl font-black ${currentJob.id === 'job-3' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {currentJob.id === 'job-3' ? '28/100' : currentJob.id === 'job-2' ? '86/100' : '94/100'}
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                  currentJob.id === 'job-3' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {currentJob.id === 'job-3' ? 'SKIP JOB' : 'APPLY NOW'}
                </div>
              </div>
            </div>

            {/* Risk Check & Past Work Match Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Client Risk Check */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Client Risk Analysis</span>
                </div>
                <ul className="text-xs space-y-1.5 text-slate-600">
                  <li className="flex items-center justify-between">
                    <span>Payment Verified:</span>
                    <span className={currentJob.clientInfo.paymentVerified ? 'text-emerald-700 font-bold' : 'text-red-600 font-bold'}>
                      {currentJob.clientInfo.paymentVerified ? 'Yes (Verified)' : 'No (Unverified)'}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Client Rating:</span>
                    <span className="text-slate-800 font-bold">{currentJob.clientInfo.rating} ★</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Hire Rate:</span>
                    <span className="text-slate-800 font-bold">{currentJob.clientInfo.hireRate}</span>
                  </li>
                </ul>
              </div>

              {/* Matched Past Work */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Matched Past Work</span>
                </div>
                <div className="text-xs text-emerald-700 font-bold">
                  {currentJob.id === 'job-3' 
                    ? '⚠️ No high-value portfolio match found for low rate.'
                    : currentJob.id === 'job-2'
                    ? '✓ "Figma to High-Converting Webflow/React Design System"'
                    : '✓ "FinTech Analytics Dashboard Performance Overhaul"'}
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {currentJob.id === 'job-3'
                    ? 'Low ROI client budget does not justify custom portfolio pitch.'
                    : 'Pulls real metric: "Reduced page render latency by 74% and zero dropped frames"'}
                </p>
              </div>

            </div>

            {/* Step 3: Proposal Draft Preview */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>3. Tailored Proposal Draft Preview</span>
                </div>
                <span className="text-[10px] text-slate-400">Non-AI sounding hook</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-sans text-slate-200 space-y-2 leading-relaxed">
                <p className="text-emerald-300 font-semibold">
                  {currentJob.id === 'job-3'
                    ? '[Recommendation]: Skip this job. Rate is $0.03/item and client payment is unverified.'
                    : `I read your job post for "${currentJob.title}". The main challenge here isn't just writing code, but eliminating dashboard render lag under heavy data loads.`}
                </p>
                {currentJob.id !== 'job-3' && (
                  <p className="text-slate-300">
                    Recently, I optimized a similar React + Node.js dashboard where we cut render latency by 74% using memoized virtual lists and Redis API caching.
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Ready to edit & copy to Upwork</span>
                <button
                  onClick={() => navigate(`/analyzer/${currentJob.id}`)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Full Proposal Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

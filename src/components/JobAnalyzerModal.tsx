import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, Copy, Check, RefreshCw, ShieldAlert, Zap, Layers, FileText, ChevronRight, ArrowRight, CornerDownRight } from 'lucide-react';
import { UpworkJob, PortfolioProject, JobAnalysisResult } from '../types';
import { SAMPLE_JOBS } from '../data/sampleJobs';

interface JobAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioProject[];
  initialJobId?: string;
}

export const JobAnalyzerModal: React.FC<JobAnalyzerModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  initialJobId,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJobId || 'job-1');
  const [customJobText, setCustomJobText] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [tone, setTone] = useState<'Value-First' | 'Direct & Brief' | 'Technical Specialist'>('Value-First');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // Update selection if initialJobId changes
  useEffect(() => {
    if (initialJobId) {
      setSelectedJobId(initialJobId);
      setIsCustom(false);
    }
  }, [initialJobId]);

  if (!isOpen) return null;

  const currentSampleJob = SAMPLE_JOBS.find(j => j.id === selectedJobId) || SAMPLE_JOBS[0];

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);

    const jobTitle = isCustom ? 'Custom Pasted Upwork Job' : currentSampleJob.title;
    const jobDescription = isCustom ? customJobText : currentSampleJob.description;
    const budget = isCustom ? 'Negotiable' : currentSampleJob.budget;
    const skillsRequired = isCustom ? ['Full Stack', 'Development'] : currentSampleJob.skillsRequired;
    const clientInfo = isCustom ? { location: 'Global', paymentVerified: true, rating: 4.8, totalSpent: 'Verified', hireRate: '80%', jobsPosted: 10 } : currentSampleJob.clientInfo;

    try {
      const res = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
          budget,
          skillsRequired,
          clientInfo,
          portfolioProjects: portfolio,
          userTone: tone,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to analyze job.');
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setError('Could not complete analysis. Check server logs.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyProposal = () => {
    if (!analysisResult) return;
    const { hook, body, pastWorkReference, callToAction } = analysisResult.proposalDraft;
    const fullText = `${hook}\n\n${body}\n\n${pastWorkReference}\n\n${callToAction}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl my-8 max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  Upwork Job Analyzer & Proposal Engine
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Gemini 3.6 AI
                </span>
              </div>
              <p className="text-xs text-slate-400">Score job fit, verify client risk, match past work & generate non-AI proposals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Top Controls: Job Selection / Input */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCustom(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    !isCustom ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  Sample Upwork Jobs
                </button>
                <button
                  onClick={() => setIsCustom(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isCustom ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  Paste Custom Job
                </button>
              </div>

              {/* Tone selection */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Proposal Tone:</span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Value-First">Value-First (Recommended)</option>
                  <option value="Direct & Brief">Direct & Brief (Short)</option>
                  <option value="Technical Specialist">Technical Specialist</option>
                </select>
              </div>
            </div>

            {/* Input area */}
            {!isCustom ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAMPLE_JOBS.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => setSelectedJobId(j.id)}
                    className={`p-3 rounded-lg text-left border transition-all ${
                      selectedJobId === j.id && !isCustom
                        ? 'bg-slate-950 border-emerald-500/60 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white line-clamp-1">{j.title}</span>
                      <span className="text-[10px] text-emerald-400 font-mono shrink-0 ml-2">{j.budget}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{j.category} • {j.clientInfo.location}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <textarea
                  rows={4}
                  placeholder="Paste the raw Upwork job posting description here..."
                  value={customJobText}
                  onChange={(e) => setCustomJobText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-end pt-1">
              <button
                onClick={runAnalysis}
                disabled={loading || (isCustom && !customJobText.trim())}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing Upwork Job with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-slate-950/20" />
                    <span>Analyze & Generate Proposal</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Results Area */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {analysisResult && !loading && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Scorecard Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Score Dial */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Match Score</span>
                  <div className={`text-3xl font-black ${
                    analysisResult.score >= 80 ? 'text-emerald-400' : analysisResult.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {analysisResult.score}/100
                  </div>
                  <span className="text-[10px] text-slate-400">{analysisResult.matchLevel} FIT MATCH</span>
                </div>

                {/* Recommended Action */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recommended Action</span>
                  <div className="text-sm font-bold text-emerald-400">
                    {analysisResult.recommendedAction}
                  </div>
                  <span className="text-[10px] text-slate-400">Est. Connects: ~{analysisResult.connectsCostEstimate}</span>
                </div>

                {/* Trust Score */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Client Trust Score</span>
                  <div className="text-xl font-bold text-teal-400">
                    {analysisResult.clientAnalysis.trustScore}/100
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {analysisResult.clientAnalysis.riskFlags.length > 0 ? `${analysisResult.clientAnalysis.riskFlags.length} risk flags` : 'Verified client'}
                  </span>
                </div>

                {/* Scope Complexity */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Project Complexity</span>
                  <div className="text-sm font-bold text-cyan-400">
                    {analysisResult.jobScope.perceivedComplexity} Scope
                  </div>
                  <span className="text-[10px] text-slate-400">{analysisResult.jobScope.estimatedHours || 'Standard project'}</span>
                </div>

              </div>

              {/* Summary & Client Risk Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Job Understanding */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> What Client Really Wants
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">{analysisResult.summary}</p>
                  <div className="pt-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Core Problem: </span>
                    {analysisResult.jobScope.keyProblemToSolve}
                  </div>
                </div>

                {/* Risk Flags & Highlights */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Client Verification & Risk Flags
                  </span>
                  <ul className="text-xs space-y-1">
                    {analysisResult.clientAnalysis.riskFlags.map((flag, i) => (
                      <li key={i} className="text-red-400 flex items-center gap-1">
                        • ⚠️ {flag}
                      </li>
                    ))}
                    {analysisResult.clientAnalysis.highlights.map((hl, i) => (
                      <li key={i} className="text-emerald-300 flex items-center gap-1">
                        • ✓ {hl}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Matched Past Work Section */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-teal-400" /> Matched Portfolio Case Studies
                  </span>
                  <span className="text-[10px] text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded border border-teal-500/20 font-bold">
                    Pilled into proposal
                  </span>
                </div>

                <div className="space-y-2">
                  {analysisResult.pastWorkRationales.map((match, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Matched Project ID: {match.projectId}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] pl-5">{match.whyItMatches}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Generated Proposal Draft */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">Generated Non-AI Proposal Draft</h4>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">
                      Tone: {tone}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyProposal}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-950" />
                        <span>Copy Proposal to Upwork</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Proposal Content Blocks */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3 font-mono leading-relaxed text-slate-200">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-sans font-bold block mb-1">
                      [Hook - Non AI Opener]:
                    </span>
                    <p className="text-emerald-200 font-sans font-medium text-sm">
                      {analysisResult.proposalDraft.hook}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block mb-1">
                      [Core Approach]:
                    </span>
                    <p className="text-slate-300 font-sans">
                      {analysisResult.proposalDraft.body}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-teal-400 uppercase font-sans font-bold block mb-1">
                      [Past Work Proof]:
                    </span>
                    <p className="text-teal-200 font-sans bg-teal-950/40 p-2.5 rounded border border-teal-500/20">
                      {analysisResult.proposalDraft.pastWorkReference}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-cyan-400 uppercase font-sans font-bold block mb-1">
                      [Call to Action]:
                    </span>
                    <p className="text-cyan-200 font-sans">
                      {analysisResult.proposalDraft.callToAction}
                    </p>
                  </div>
                </div>

                {/* Screening questions if any */}
                {analysisResult.proposalDraft.screeningQuestionAnswers && analysisResult.proposalDraft.screeningQuestionAnswers.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-300">Screening Question Answers:</span>
                    {analysisResult.proposalDraft.screeningQuestionAnswers.map((sq, i) => (
                      <div key={i} className="text-xs space-y-1">
                        <div className="font-semibold text-slate-400">Q: {sq.question}</div>
                        <div className="text-slate-200 pl-3">A: {sq.answer}</div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          )}

          {!analysisResult && !loading && !error && (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-3">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Ready to analyze job post</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Select one of the sample jobs above or paste your custom Upwork job description, then click "Analyze & Generate Proposal".
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Proposala Engine • Gemini 3.6 Flash AI</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close Workspace
          </button>
        </div>

      </div>
    </div>
  );
};

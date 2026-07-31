import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, ShieldCheck, CheckCircle2, XCircle, Sparkles, 
  SlidersHorizontal, Layers, Copy, Check, ChevronDown, ChevronUp, 
  FileText, Target, AlertTriangle, ArrowUpRight, Award, Flame, 
  BarChart3, Clock, DollarSign, Brain, CheckCircle, RefreshCw, Terminal, Sliders, Cpu, FolderGit2, X
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Hero Section Interactive State
  const [heroInputText, setHeroInputText] = useState<string>(
    `Looking for a Senior React & Node.js Developer to optimize our SaaS dashboard rendering speed. We have 5,000 active users experiencing latency during peak hours. Budget: $3,500. Must have proven experience with state management, caching, and bundle optimization.`
  );
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [isAnalyzingHero, setIsAnalyzingHero] = useState<boolean>(false);
  const [heroAnalysisComplete, setHeroAnalysisComplete] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroPresets = [
    {
      title: "Fullstack SaaS Optimization",
      text: "Looking for a Senior React & Node.js Developer to optimize our SaaS dashboard rendering speed. We have 5,000 active users experiencing latency during peak hours. Budget: $3,500. Must have proven experience with state management, caching, and bundle optimization."
    },
    {
      title: "3D Product Animation",
      text: "Need a skilled 3D Animator using Blender/Cinema4D to create 3 high-end 30-second product render videos for medical device launch. Payment verified, hiring immediately. Budget $4,000 fixed."
    },
    {
      title: "Risky Client / Vague Budget",
      text: "Build me an Uber clone for $200. Must be finished in 2 days. Unlimited revisions required. No payment method verified yet."
    }
  ];

  const handleHeroAnalyze = () => {
    setIsAnalyzingHero(true);
    setHeroAnalysisComplete(false);
    setTimeout(() => {
      setIsAnalyzingHero(false);
      setHeroAnalysisComplete(true);
    }, 1200);
  };

  const faqItems = [
    {
      question: "How does Proposala save my Upwork Connects?",
      answer: "Proposala automatically scans job postings for client risk indicators—such as unverified payment methods, unreasonably low budgets for complex scope, and high proposal saturation. By evaluating fit BEFORE you spend 12-16 connects, you only apply to high-probability contracts."
    },
    {
      question: "Will proposals sound like generic ChatGPT output?",
      answer: "No. Generic AI tools use repetitive buzzwords like 'delve', 'supercharge', and 'testament'. Proposala builds proposals using proven strategic shapes (Pain-Point Opener, SOW Middle, Soft Question Close) and injects your actual past portfolio metrics."
    },
    {
      question: "Can I use my existing portfolio case studies?",
      answer: "Yes! You can add your past client projects, key outcome metrics, and industry tags into your Proposala Portfolio Vault. When a job post is analyzed, Proposala automatically picks the top 3 most relevant proofs."
    },
    {
      question: "Is Proposala compliant with Upwork Terms of Service?",
      answer: "Yes. Proposala is an independent, client-side strategy and drafting assistant. You retain full control over editing and submitting your final proposals directly on Upwork."
    },
    {
      question: "What AI models power Proposala?",
      answer: "Proposala supports leading LLM engines including Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro, optimized specifically for high-conversion B2B sales copy."
    }
  ];

  return (
    <div className="space-y-0 selection:bg-[#17140f] selection:text-[#f7f2e8]">

      {/* ========================================================= */}
      {/* 1. HERO SECTION (BONE / CREAM BACKGROUND #f7f2e8)         */}
      {/* ========================================================= */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Ambient Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ddd2bf]/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17140f]/5 border border-[#ddd2bf] text-[#17140f] text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#17140f]" />
            <span>AI Upwork Proposal Studio</span>
          </div>

          {/* Headline - Fraunces / Serif Style */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17140f] font-serif leading-[1.15]">
            Made for Upwork proposals.<br className="hidden sm:inline" />
            <span className="text-[#17140f]/90 underline decoration-[#ddd2bf] decoration-wavy decoration-2">
              Save your Connects.
            </span>{" "}
            Apply to better Upwork jobs.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#17140f]/80 max-w-2xl mx-auto font-sans leading-relaxed">
            Stop wasting 16 Connects on low-budget, high-risk posts. Proposala analyzes client intent, 
            matches your exact past case studies, and crafts human, high-converting proposal drafts.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#17140f] hover:bg-[#27241e] text-[#f7f2e8] font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <span>Launch Proposal Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#ddd2bf]" />
            </button>

            <button
              onClick={() => navigate('/request-demo')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#f7f2e8] hover:bg-[#ddd2bf]/30 border border-[#ddd2bf] text-[#17140f] font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a 1-on-1 Demo</span>
            </button>
          </div>

        </div>

        {/* INTERACTIVE HERO DEMO INPUT CARD */}
        <div className="mt-12 max-w-3xl mx-auto bg-[#f7f2e8] border border-[#ddd2bf] rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ddd2bf] pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#17140f]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#17140f]">
                Live Interactive Demo: Paste an Upwork Job
              </span>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {heroPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPreset(idx);
                    setHeroInputText(preset.text);
                    setHeroAnalysisComplete(false);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all shrink-0 cursor-pointer ${
                    selectedPreset === idx
                      ? 'bg-[#17140f] text-[#f7f2e8] font-bold shadow-xs'
                      : 'bg-[#17140f]/5 text-[#17140f]/70 border border-[#ddd2bf] hover:text-[#17140f]'
                  }`}
                >
                  Preset #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div className="relative">
            <textarea
              rows={4}
              value={heroInputText}
              onChange={(e) => {
                setHeroInputText(e.target.value);
                setHeroAnalysisComplete(false);
              }}
              placeholder="Paste job post description or URL here..."
              className="w-full bg-[#17140f]/5 border border-[#ddd2bf] rounded-xl text-xs sm:text-sm p-3.5 text-[#17140f] placeholder-[#17140f]/40 focus:outline-none focus:ring-1 focus:ring-[#17140f] font-sans resize-none leading-relaxed"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-mono text-[#17140f]/60">
              Client Intent Parser • Case Study Proof Selector Ready
            </span>

            <button
              onClick={handleHeroAnalyze}
              disabled={isAnalyzingHero}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#17140f] hover:bg-[#27241e] text-[#f7f2e8] text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isAnalyzingHero ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#ddd2bf]" />
                  <span>Analyzing Job & Connect Risk...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-[#ddd2bf] fill-[#ddd2bf]" />
                  <span>Analyze Job & Save Connects</span>
                </>
              )}
            </button>
          </div>

          {/* Simulated Analysis Result Output */}
          {heroAnalysisComplete && (
            <div className="p-4 rounded-xl bg-[#17140f] border border-[#ddd2bf] text-[#f7f2e8] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#ddd2bf]/20 pb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fit Score Calculated: {selectedPreset === 2 ? '38.0 / 100 (HIGH RISK)' : '92.3 / 100 (EXCELLENT MATCH)'}</span>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-[11px] font-mono text-[#ddd2bf] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="text-xs space-y-1.5 font-sans">
                <p className="text-gray-300">
                  {selectedPreset === 2 ? (
                    <strong className="text-red-400">⚠️ Risk Flag:</strong>
                  ) : (
                    <strong className="text-emerald-400">✓ Extracted Client Problem:</strong>
                  )}{" "}
                  {selectedPreset === 2 
                    ? "Unrealistic budget ($200 for full Uber clone) and unverified payment. Save your 16 Connects!"
                    : "Client faces 5,000 user peak latency bottlenecks. Auto-matched 2 verified SaaS performance case studies from your portfolio."
                  }
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Generate Full Proposal Draft in Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </section>

      {/* ========================================================= */}
      {/* 2. VALUE PROPOSITION (DEEP CHARCOAL BLACK #17140f)         */}
      {/* ========================================================= */}
      <section id="value-props" className="bg-[#17140f] text-[#f7f2e8] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#ddd2bf]/20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ddd2bf] block font-semibold">
              Value Proposition • Why Proposala
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#f7f2e8]">
              Designed specifically for Upwork freelancers who value their Connects and time.
            </h2>
            <p className="text-sm sm:text-base text-[#ddd2bf]/70 font-sans">
              Generic AI writers generate generic proposals that get ignored. Proposala provides client risk scoring, 
              case study metric pairing, and structured proposal shapes.
            </p>
          </div>

          {/* BENTO GRID (4 High-Impact Feature Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* Bento Card 1: Save Your Connects (7 Cols) */}
            <div className="lg:col-span-7 bg-[#231f18] border border-[#ddd2bf]/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl hover:border-[#ddd2bf]/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#ddd2bf]/10 border border-[#ddd2bf]/30 flex items-center justify-center text-[#ddd2bf]">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-[#f7f2e8] group-hover:text-emerald-400 transition-colors">
                  Save Your Connects (Pre-Application Risk Filter)
                </h3>
                <p className="text-xs sm:text-sm text-[#ddd2bf]/70 leading-relaxed font-sans">
                  Connects are expensive. Proposala analyzes client hire rate, payment verification, budget realism, and scope clarity before you write a single word.
                </p>
              </div>

              {/* Visual Component Snippet */}
              <div className="bg-[#17140f] p-4 rounded-xl border border-[#ddd2bf]/15 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Client Payment Status:</span>
                  <span className="text-emerald-400 font-bold">✓ Verified ($85,000+ Spent)</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Connect Cost:</span>
                  <span className="text-white font-bold">12 Connects</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>Recommended Action:</span>
                  <span className="text-emerald-400 font-bold">High Match • Apply Immediately</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Right Past Work Match (5 Cols) */}
            <div className="lg:col-span-5 bg-[#231f18] border border-[#ddd2bf]/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl hover:border-[#ddd2bf]/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#ddd2bf]/10 border border-[#ddd2bf]/30 flex items-center justify-center text-[#ddd2bf]">
                <FolderGit2 className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-[#f7f2e8] group-hover:text-emerald-400 transition-colors">
                  Right Past Work Match
                </h3>
                <p className="text-xs sm:text-sm text-[#ddd2bf]/70 leading-relaxed font-sans">
                  Never manually search through past client files again. Proposala automatically attaches your highest-impact case study proofs and verified metrics.
                </p>
              </div>

              {/* Mini Case Study Card */}
              <div className="bg-[#17140f] p-3.5 rounded-xl border border-[#ddd2bf]/15 text-xs font-mono space-y-1">
                <div className="text-emerald-400 font-bold">Matched: FinTech Dashboard Refactor</div>
                <div className="text-gray-400 text-[11px]">Metric: Reduced query render time by -74%</div>
              </div>
            </div>

            {/* Bento Card 3: Proposal Shapes & Structure (5 Cols) */}
            <div className="lg:col-span-5 bg-[#231f18] border border-[#ddd2bf]/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl hover:border-[#ddd2bf]/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#ddd2bf]/10 border border-[#ddd2bf]/30 flex items-center justify-center text-[#ddd2bf]">
                <Layers className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-[#f7f2e8] group-hover:text-emerald-400 transition-colors">
                  Strategic Proposal Shapes
                </h3>
                <p className="text-xs sm:text-sm text-[#ddd2bf]/70 leading-relaxed font-sans">
                  Mix and match Opener Hooks (Direct Pain-Point), Middle Scope of Work, and Close Calls-to-Action for custom persuasion flow.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                <span className="px-2 py-1 rounded bg-[#17140f] border border-[#ddd2bf]/20 text-[#ddd2bf]">Opener: Pain-Point Hook</span>
                <span className="px-2 py-1 rounded bg-[#17140f] border border-[#ddd2bf]/20 text-[#ddd2bf]">Middle: SOW Sprint</span>
                <span className="px-2 py-1 rounded bg-[#17140f] border border-[#ddd2bf]/20 text-[#ddd2bf]">Close: Soft Question</span>
              </div>
            </div>

            {/* Bento Card 4: Human Non-AI Tone (7 Cols) */}
            <div className="lg:col-span-7 bg-[#231f18] border border-[#ddd2bf]/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl hover:border-[#ddd2bf]/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#ddd2bf]/10 border border-[#ddd2bf]/30 flex items-center justify-center text-[#ddd2bf]">
                <Brain className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-[#f7f2e8] group-hover:text-emerald-400 transition-colors">
                  Human Tone • Zero Fluffy AI Slop
                </h3>
                <p className="text-xs sm:text-sm text-[#ddd2bf]/70 leading-relaxed font-sans">
                  Clients instantly reject generic AI text. Proposala uses precise engineering and industry vocabulary that sounds like an expert senior consultant.
                </p>
              </div>

              <div className="bg-[#17140f] p-3.5 rounded-xl border border-[#ddd2bf]/15 text-xs text-gray-300 font-sans leading-relaxed">
                "I reviewed your job post for SaaS performance optimization. The main challenge here isn't just component styling, but eliminating state re-render bottlenecks..."
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. WORKFLOW SECTION (HOW IT WORKS - CREAM #f7f2e8)        */}
      {/* ========================================================= */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#17140f]/70 block font-semibold">
            Simple 4-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#17140f]">
            How Proposala Works in 60 Seconds
          </h2>
          <p className="text-sm text-[#17140f]/70 font-sans">
            From raw job posting to a winning, customized proposal draft ready to submit on Upwork.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-[#f7f2e8] border border-[#ddd2bf] rounded-2xl p-6 space-y-4 shadow-md relative hover:shadow-lg transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#17140f] text-[#f7f2e8] font-mono font-bold text-xs flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-bold font-serif text-[#17140f]">1. Paste Job Description</h3>
            <p className="text-xs text-[#17140f]/70 leading-relaxed font-sans">
              Paste the raw client job description or Upwork job URL into the input configuration panel.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f7f2e8] border border-[#ddd2bf] rounded-2xl p-6 space-y-4 shadow-md relative hover:shadow-lg transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#17140f] text-[#f7f2e8] font-mono font-bold text-xs flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-bold font-serif text-[#17140f]">2. AI Intent & Risk Analysis</h3>
            <p className="text-xs text-[#17140f]/70 leading-relaxed font-sans">
              Proposala extracts the core client pain point, flags budget risks, and calculates your Fit Score out of 100.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f7f2e8] border border-[#ddd2bf] rounded-2xl p-6 space-y-4 shadow-md relative hover:shadow-lg transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#17140f] text-[#f7f2e8] font-mono font-bold text-xs flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-bold font-serif text-[#17140f]">3. Past Work Proof Match</h3>
            <p className="text-xs text-[#17140f]/70 leading-relaxed font-sans">
              Proposala auto-retrieves relevant case study proofs from your portfolio vault to prove verified past results.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#f7f2e8] border border-[#ddd2bf] rounded-2xl p-6 space-y-4 shadow-md relative hover:shadow-lg transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#17140f] text-[#f7f2e8] font-mono font-bold text-xs flex items-center justify-center">
              04
            </div>
            <h3 className="text-base font-bold font-serif text-[#17140f]">4. Generate & Edit Draft</h3>
            <p className="text-xs text-[#17140f]/70 leading-relaxed font-sans">
              Synthesize a tailored draft in your rich text editor, inline-edit final wording, and copy to Upwork.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* 4. COMPARISON SECTION (GENERIC AI vs PROPOSALA)          */}
      {/* ========================================================= */}
      <section id="comparison" className="bg-[#17140f] text-[#f7f2e8] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#ddd2bf]/20">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ddd2bf] block font-semibold">
              Logic & Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#f7f2e8]">
              Generic AI Writer vs. Proposala
            </h2>
            <p className="text-sm text-[#ddd2bf]/70 font-sans max-w-xl mx-auto">
              Why generic ChatGPT proposals fail on Upwork, and how Proposala's tailored architecture wins client interviews.
            </p>
          </div>

          {/* Comparison Table Container */}
          <div className="bg-[#231f18] border border-[#ddd2bf]/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="border-b border-[#ddd2bf]/20 bg-[#17140f]">
                    <th className="p-4 sm:p-5 text-[#ddd2bf] font-mono uppercase tracking-wider text-xs">Feature / Capability</th>
                    <th className="p-4 sm:p-5 text-gray-400 font-mono uppercase tracking-wider text-xs">Generic ChatGPT / AI Writer</th>
                    <th className="p-4 sm:p-5 text-emerald-400 font-mono uppercase tracking-wider text-xs font-bold">Proposala Upwork Studio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ddd2bf]/10">
                  
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#f7f2e8]">Upwork Connect Risk Filter</td>
                    <td className="p-4 sm:p-5 text-gray-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>None (Generates text on bad posts)</span>
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Calculates Fit Score & flags low-budget risks</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#f7f2e8]">Portfolio Case Study Matching</td>
                    <td className="p-4 sm:p-5 text-gray-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Makes up fake experience & quotes</span>
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Injects real verified past work metrics</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#f7f2e8]">Proposal Opening Hook</td>
                    <td className="p-4 sm:p-5 text-gray-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>"Dear Hiring Manager, I am thrilled to apply..."</span>
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct Pain-Point hook focused on client goal</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#f7f2e8]">Strategic Structural Flow</td>
                    <td className="p-4 sm:p-5 text-gray-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Unstructured walls of AI text</span>
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Custom Opener, Middle SOW, & Soft Question Close</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#f7f2e8]">Tone & Word Choice</td>
                    <td className="p-4 sm:p-5 text-gray-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Uses buzzwords ("delve", "supercharge")</span>
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Senior technical consultant tone</span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FAQ SECTION (CREAM #f7f2e8)                            */}
      {/* ========================================================= */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#17140f]/70 block font-semibold">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#17140f]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Minimalist Accordion */}
        <div className="space-y-3">
          {faqItems.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-[#f7f2e8] border border-[#ddd2bf] rounded-xl overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left font-serif font-bold text-sm sm:text-base text-[#17140f] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#17140f]/5 transition-colors"
              >
                <span>{faq.question}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#17140f] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#17140f]/60 shrink-0" />
                )}
              </button>

              {openFaqIndex === idx && (
                <div className="px-4 pb-5 pt-1 text-xs sm:text-sm text-[#17140f]/80 leading-relaxed font-sans border-t border-[#ddd2bf]/60 animate-in fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================= */}
      {/* 6. BOTTOM HIGH-IMPACT CTA SECTION                         */}
      {/* ========================================================= */}
      <section className="bg-[#17140f] text-[#f7f2e8] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#ddd2bf]/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold font-serif">
            Ready to win better Upwork contracts?
          </h2>
          <p className="text-sm sm:text-base text-[#ddd2bf]/70 max-w-xl mx-auto font-sans">
            Start analyzing job posts, saving your Connects, and crafting winning proposals today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm font-mono tracking-wider uppercase transition-all shadow-lg cursor-pointer"
            >
              Launch Proposal Dashboard
            </button>

            <button
              onClick={() => navigate('/request-demo')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#231f18] hover:bg-[#2e2920] border border-[#ddd2bf]/30 text-[#f7f2e8] text-sm font-semibold transition-all cursor-pointer"
            >
              Request a 1-on-1 Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

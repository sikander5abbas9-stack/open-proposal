import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Zap, RefreshCw, 
  Copy, Check, AlertTriangle, ChevronDown, Clock, History, FolderGit2,
  Users, Settings, Plus, FileText, CheckCircle, Eye, ExternalLink, 
  ChevronRight, Edit3, X, Terminal, Filter, Layers, BarChart3, HelpCircle, 
  LogOut, Menu, Download, Trash2, Search, SlidersHorizontal, Info, Wifi, 
  WifiOff, FileSpreadsheet, Share2, MessageSquare, ArrowUpRight, Sliders, Cpu, Layers3
} from 'lucide-react';
import { SAMPLE_JOBS } from '../data/sampleJobs';
import { DEFAULT_PORTFOLIO } from '../data/samplePortfolio';
import { JobAnalysisResult, PortfolioProject } from '../types';
import { useAuth } from '../context/AuthContext';

// Pentagon Radar Chart SVG Component
interface RadarScores {
  budget: number;       // 0-100
  skills: number;       // 0-100
  competition: number;  // 0-100
  clientHistory: number;// 0-100
  risk: number;         // 0-100
}

const PentagonRadarChart: React.FC<{ scores: RadarScores; onClick?: () => void }> = ({ scores, onClick }) => {
  const CX = 110;
  const CY = 110;
  const MAX_R = 65;

  // 5 axes: Top (Budget), Top-Right (Skills), Bottom-Right (Competition), Bottom-Left (Client History), Top-Left (Risk)
  const axes = [
    { label: 'Budget', score: scores.budget, angle: -90 },
    { label: 'Skills', score: scores.skills, angle: -18 },
    { label: 'Competition', score: scores.competition, angle: 54 },
    { label: 'Client Hist', score: scores.clientHistory, angle: 126 },
    { label: 'Low Risk', score: scores.risk, angle: 198 },
  ];

  const getCoordinates = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: CX + radius * Math.cos(rad),
      y: CY + radius * Math.sin(rad),
    };
  };

  // Generate background ring polygon paths (20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0].map((level) => {
    const pts = axes.map((a) => {
      const { x, y } = getCoordinates(a.angle, MAX_R * level);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return pts.join(' ');
  });

  // Generate data polygon points
  const dataPoints = axes.map((a) => {
    const normalizedR = (Math.max(10, Math.min(100, a.score)) / 100) * MAX_R;
    const { x, y } = getCoordinates(a.angle, normalizedR);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <div 
      onClick={onClick}
      className="relative flex flex-col items-center justify-center p-2 cursor-pointer group rounded-xl hover:bg-[#18181B]/80 transition-all"
      title="Click to view Score Breakdown"
    >
      <svg width="220" height="220" className="overflow-visible">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="radarBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Concentric Pentagon Background Rings */}
        {rings.map((ringPts, idx) => (
          <polygon
            key={idx}
            points={ringPts}
            fill="none"
            stroke="#27272A"
            strokeWidth={idx === 4 ? '1.5' : '1'}
            strokeDasharray={idx < 4 ? '2 2' : undefined}
          />
        ))}

        {/* Axis Radial Lines */}
        {axes.map((a, i) => {
          const outer = getCoordinates(a.angle, MAX_R);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={outer.x}
              y2={outer.y}
              stroke="#27272A"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={dataPoints.join(' ')}
          fill="url(#radarGlow)"
          stroke="url(#radarBorder)"
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />

        {/* Vertex Points & Labels */}
        {axes.map((a, i) => {
          const normalizedR = (Math.max(10, Math.min(100, a.score)) / 100) * MAX_R;
          const pt = getCoordinates(a.angle, normalizedR);
          const labelPt = getCoordinates(a.angle, MAX_R + 18);

          return (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4"
                fill="#10B981"
                stroke="#0C0C0E"
                strokeWidth="1.5"
                className="transition-all duration-500"
              />
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#9CA3AF"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="600"
                className="group-hover:fill-emerald-300 transition-colors"
              >
                {a.label} ({a.score})
              </text>
            </g>
          );
        })}
      </svg>
      <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
        <Info className="w-3 h-3" />
        <span>Click for Score Breakdown</span>
      </div>
    </div>
  );
};

interface ProposalHistoryItem {
  id: string;
  title: string;
  date: string;
  score: number;
  status: 'Draft' | 'Sent' | 'Replied' | 'Won' | 'Lost';
  matchedWork?: string;
  clientName?: string;
}

interface ToastNotification {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

const ANALYSIS_STEPS = [
  'Extracting key client pain points & core requirements...',
  'Evaluating budget, competition & risk factors...',
  'Cross-referencing past work portfolio matching...',
  'Generating optimized proposal drafts...',
];

export const JobAnalyzerPage: React.FC = () => {
  const { jobId } = useParams<{ jobId?: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Mobile Drawer & Workspace State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(user?.workspaceName || "Ejaz Karim's workspace");

  // Nav Selection State
  const [activeNav, setActiveNav] = useState<'new' | 'history' | 'pastwork' | 'team' | 'settings'>('new');

  // Modal / Slideover states
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showCaseStudyDrawer, setShowCaseStudyDrawer] = useState(false);
  const [showNewPortfolioModal, setShowNewPortfolioModal] = useState(false);
  const [showInviteTeamModal, setShowInviteTeamModal] = useState(false);

  // Connection Alert State
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Toast System State
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Live UTC Clock
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Portfolio state
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem('proposala_portfolio');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PORTFOLIO;
  });

  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>(portfolioProjects[0]?.id || 'port-1');

  // Inputs & Configuration State
  const [selectedProfile, setSelectedProfile] = useState<string>('Senior Fullstack Developer');
  const [selectedDept, setSelectedDept] = useState<string>('Software Engineering');
  const [englishLevel, setEnglishLevel] = useState<'Basic/ESL' | 'Conversational' | 'Native/Fluent'>('Native/Fluent');
  const [proposalLength, setProposalLength] = useState<'Short' | 'Medium' | 'Detailed'>('Medium');
  const [aiModel, setAiModel] = useState<string>('Claude 3.5 Sonnet');

  // Proposal Strategic Shapes State
  const [openerShape, setOpenerShape] = useState<string>('Direct Pain-Point Hook');
  const [middleShape, setMiddleShape] = useState<string>('Week-by-Week SOW');
  const [closeShape, setCloseShape] = useState<string>('Soft Question Close');

  // Active Proofs (Case Studies) Context State
  const [activeProofIds, setActiveProofIds] = useState<string[]>(['port-1', 'port-2', 'port-3']);

  // Workflow Flow States
  const [hasExtractedScore, setHasExtractedScore] = useState<boolean>(true);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState<boolean>(false);

  // Inputs & Selection
  const [selectedSampleId, setSelectedSampleId] = useState<string>(jobId || SAMPLE_JOBS[0].id);
  const [jobInputText, setJobInputText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(null);
  const [invalidUrlWarning, setInvalidUrlWarning] = useState<boolean>(false);

  // Inline AI Refinement State
  const [isRefiningAI, setIsRefiningAI] = useState<boolean>(false);

  // Draft Style Switcher & Proposal Status Selector
  const [draftStyle, setDraftStyle] = useState<'Direct & Short' | 'Value Focused' | 'Detailed'>('Value Focused');
  const [proposalStatus, setProposalStatus] = useState<'Draft' | 'Sent' | 'Replied' | 'Won' | 'Lost'>('Draft');
  const [editedProposalText, setEditedProposalText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Proposals History state
  const [proposalsHistory, setProposalsHistory] = useState<ProposalHistoryItem[]>([
    { id: '1', title: 'Senior React & Node.js Developer Needed', date: '2026-07-30', score: 94, status: 'Sent', matchedWork: 'FinTech Analytics Dashboard', clientName: 'Apex Cloud Inc' },
    { id: '2', title: 'Fullstack Next.js + Tailwind Architect', date: '2026-07-29', score: 88, status: 'Replied', matchedWork: 'Figma to Webflow Design System', clientName: 'Veloce Labs' },
    { id: '3', title: 'Low Budget Scraping Project (Risky)', date: '2026-07-28', score: 28, status: 'Draft', matchedWork: 'Data Extraction Pipeline', clientName: 'Unverified Client' },
    { id: '4', title: 'TypeScript Optimization & Bug Fixes', date: '2026-07-25', score: 91, status: 'Won', matchedWork: 'FinTech Analytics Dashboard', clientName: 'Stripe Integration Client' },
  ]);

  // History Controls State
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historyFilterTab, setHistoryFilterTab] = useState<'All' | 'In Progress' | 'Won' | 'Archived'>('All');
  const [selectedHistoryIds, setSelectedHistoryIds] = useState<string[]>([]);

  // New Portfolio Form State
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    clientIndustry: '',
    summary: '',
    techStackStr: '',
    keyOutcome: '',
    metrics: '',
  });
  const [portfolioFormError, setPortfolioFormError] = useState('');

  // Team Invite Form State
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Member' | 'Viewer'>('Member');

  // Case Study Search State
  const [caseStudySearch, setCaseStudySearch] = useState('');

  // Sync sample job on select
  useEffect(() => {
    if (selectedSampleId === 'custom') {
      return;
    }
    const sample = SAMPLE_JOBS.find((j) => j.id === selectedSampleId);
    if (sample) {
      setJobInputText(`${sample.title}\nBudget: ${sample.budget} (${sample.jobType})\nRequired Stack: ${sample.skillsRequired.join(', ')}\n\n${sample.description}`);
      setInvalidUrlWarning(false);
    }
  }, [selectedSampleId]);

  // Initial analysis simulation for rich immediate display
  useEffect(() => {
    if (!analysisResult) {
      runAnalysis(SAMPLE_JOBS[0].id);
    }
  }, []);

  const runAnalysis = async (targetId?: string) => {
    // Basic validation
    if (!targetId && selectedSampleId === 'custom' && jobInputText.trim().length < 15) {
      setInvalidUrlWarning(true);
      addToast('Please enter a valid Upwork job text or link to analyze.', 'warning');
      return;
    }

    setInvalidUrlWarning(false);
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 450);

    const sample = SAMPLE_JOBS.find((j) => j.id === (targetId || selectedSampleId)) || SAMPLE_JOBS[0];
    const activeProject = portfolioProjects.find((p) => p.id === selectedPortfolioId) || portfolioProjects[0];

    setTimeout(() => {
      clearInterval(stepInterval);
      setAnalysisStep(3);

      const isRisky = (targetId || selectedSampleId) === 'job-3';
      const result: JobAnalysisResult = {
        score: isRisky ? 28 : 94,
        matchLevel: isRisky ? 'LOW' : 'HIGH',
        recommendedAction: isRisky ? 'Skip Job (Low ROI)' : 'Recommended: Detailed Proposal',
        connectsCostEstimate: isRisky ? 16 : 12,
        summary: `Client requires high-performance web development with emphasis on modular architecture, zero latency, and clean code formatting.`,
        clientAnalysis: {
          trustScore: isRisky ? 40 : 96,
          riskFlags: isRisky 
            ? ['Unverified Payment Method', 'Rate is 60% below market average', 'Vague requirements with scope creep risk']
            : [],
          highlights: ['Verified Payment Method ($85k+ total spent)', '5-Star average client rating across 24 hires', 'Fast response time (<2 hours)'],
        },
        jobScope: {
          perceivedComplexity: isRisky ? 'High' : 'Medium',
          estimatedHours: '20 - 40 hours',
          keyProblemToSolve: 'Eliminate slow rendering latency, implement strict TypeScript typing, and ensure zero-downtime deployment.',
          extractedRequirements: ['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'REST API'],
        },
        matchedPortfolioIds: [activeProject.id],
        pastWorkRationales: [
          {
            projectId: activeProject.id,
            whyItMatches: `Direct technical stack match (${activeProject.techStack.slice(0, 3).join(', ')}) with verified performance outcome: ${activeProject.metrics || '-74% rendering latency'}.`,
          },
        ],
        proposalDraft: {
          hook: `I reviewed your job post for "${sample.title}". The core challenge here isn't just building components, but eliminating latency bottlenecks without sacrificing codebase maintainability.`,
          body: `I specialize in high-performance web applications. In my previous client work, I restructured complex state management and optimized rendering pipelines to achieve smooth 60fps frame rates.`,
          pastWorkReference: `Specifically, on the "${activeProject.title}" project, I used ${activeProject.techStack.slice(0, 3).join(', ')} to deliver ${activeProject.metrics || '-74% load latency and 99.9% uptime'}.`,
          callToAction: `I have a quick 2-step blueprint to execute this project cleanly within your deadline. Are you free for a brief 10-minute message chat to discuss timelines?`,
          screeningQuestionAnswers: [
            { question: 'What is your experience with React & TypeScript performance?', answer: 'Over 5 years building production SPAs with strict TypeScript, memoization, and lazy loaded submodules.' }
          ],
        },
      };

      setAnalysisResult(result);
      setHasExtractedScore(true);
      updateDraftText(result.proposalDraft, draftStyle, activeProject);
      setIsAnalyzing(false);
      addToast(`Job analysis complete! Fit Score: ${result.score}/100 calculated.`, 'success');
    }, 1500);
  };

  // Strategic Draft Generation using Shapes & Proofs
  const handleGenerateDraft = () => {
    setIsGeneratingDraft(true);
    setTimeout(() => {
      setIsGeneratingDraft(false);
      const sample = SAMPLE_JOBS.find((j) => j.id === selectedSampleId) || SAMPLE_JOBS[0];
      const activeProofs = portfolioProjects.filter((p) => activeProofIds.includes(p.id));

      // 1. OPENER SHAPE HOOK
      let hookText = "";
      if (openerShape === 'Direct Pain-Point Hook') {
        hookText = `I reviewed your requirements for "${sample.title}". The main challenge here isn't just implementing components, but eliminating latency bottlenecks without compromising code maintainability.`;
      } else if (openerShape === 'Story Opener') {
        hookText = `Over the past 5+ years working as a ${selectedProfile} in ${selectedDept}, I've guided engineering teams through this exact architectural bottleneck.`;
      } else if (openerShape === 'Technical Solution Lead') {
        hookText = `Here is my direct 3-step technical execution plan for your project: 1) Refactor re-rendering bottlenecks, 2) Implement cache middleware, 3) Enforce strict TypeScript types.`;
      } else {
        hookText = `I understand how critical zero-downtime reliability and crisp rendering performance are for your users. I specialize in diagnosing and resolving these exact friction points.`;
      }

      // 2. MIDDLE SHAPE STRUCTURE
      let middleText = "";
      if (middleShape === 'Week-by-Week SOW') {
        middleText = `Proposed Sprint Breakdown:\n• Sprint 1: Isolate state re-render loops & optimize core bundle sizes.\n• Sprint 2: Integrate cache layers, write unit tests, and verify 60fps frame rates.`;
      } else if (middleShape === 'Problem Mirror & SOW') {
        middleText = `Problem Mirror & Execution:\nYour core problem lies in data stream rendering latency. I will restructure your state architecture so components render lazily on demand.`;
      } else if (middleShape === 'Metrics & Case Study Proof') {
        const proofSummary = activeProofs.map(p => `• ${p.title}: ${p.keyOutcome} (${p.metrics})`).join('\n');
        middleText = `Verified Track Record:\n${proofSummary || '• Achieved -74% render latency reduction on SaaS analytics dashboards.'}`;
      } else {
        middleText = `System Architecture Strategy:\nWe will preserve total backward compatibility with your existing APIs while injecting high-throughput caching and clean type boundaries.`;
      }

      // 3. PROOF TO USE CASE STUDIES
      const proofText = activeProofs.length > 0
        ? `Relevant Past Projects Context:\n` + activeProofs.map(p => `- ${p.title} (${p.clientIndustry}): ${p.keyOutcome} [Tech Stack: ${p.techStack.slice(0, 4).join(', ')}]`).join('\n')
        : `Relevant Expertise: Proven delivery across 40+ high-scale production apps in ${selectedDept}.`;

      // 4. CLOSE SHAPE CALL TO ACTION
      let closeText = "";
      if (closeShape === 'Soft Question Close') {
        closeText = `Do you currently have a staging environment set up, or should we include devops staging configuration in our first deliverable?`;
      } else if (closeShape === 'Phased-Pricing Tease') {
        closeText = `I can break this deliverable into 2 milestone payments ($1,750 initial audit & fix + $1,750 optimization & docs). Are you available for a brief message chat?`;
      } else if (closeShape === 'Calendar Booking Call') {
        closeText = `I have open availability this week to review your code repo. Feel free to reply here or schedule a quick 10-minute discovery call.`;
      } else {
        closeText = `I am available to start immediately today and can deliver the first working prototype within 48 hours. Looking forward to connecting!`;
      }

      const fullDraft = `${hookText}\n\n${middleText}\n\n${proofText}\n\n${closeText}\n\nBest regards,\n${user?.name || 'Ejaz Karim'}\n${selectedProfile} • ${selectedDept}\nEnglish: ${englishLevel} | Model: ${aiModel}`;
      setEditedProposalText(fullDraft);
      addToast(`Generated proposal draft using ${aiModel} (${openerShape} + ${middleShape} + ${closeShape})!`, 'success');
    }, 600);
  };

  const handleRemoveProof = (idToRemove: string) => {
    setActiveProofIds((prev) => prev.filter((id) => id !== idToRemove));
    addToast('Removed project card from prompt context.', 'info');
  };

  const handleAddProof = (idToAdd: string) => {
    if (!activeProofIds.includes(idToAdd)) {
      setActiveProofIds((prev) => [...prev, idToAdd]);
      addToast('Added portfolio case study to prompt context.', 'success');
    }
  };

  const updateDraftText = (
    draft: any, 
    style: 'Direct & Short' | 'Value Focused' | 'Detailed',
    projectOverride?: PortfolioProject
  ) => {
    const activeProject = projectOverride || portfolioProjects.find((p) => p.id === selectedPortfolioId) || portfolioProjects[0];
    const caseStudyRef = `Specifically, on the "${activeProject.title}" project, I used ${activeProject.techStack.slice(0, 3).join(', ')} to deliver ${activeProject.metrics || '-74% load latency and 99.9% uptime'}.`;

    if (style === 'Direct & Short') {
      setEditedProposalText(
        `${draft.hook}\n\n${caseStudyRef}\n\n${draft.callToAction}`
      );
    } else if (style === 'Value Focused') {
      setEditedProposalText(
        `${draft.hook}\n\n${draft.body}\n\nKey Verified Metric: ${caseStudyRef}\n\n${draft.callToAction}`
      );
    } else {
      setEditedProposalText(
        `Hi there,\n\n${draft.hook}\n\n${draft.body}\n\nVerified Past Case Study:\n${caseStudyRef}\n\nProposed Next Step:\n${draft.callToAction}\n\nBest regards,\n${user?.name || 'Ejaz Karim'}`
      );
    }
  };

  const handleTabChange = (style: 'Direct & Short' | 'Value Focused' | 'Detailed') => {
    setDraftStyle(style);
    if (analysisResult) {
      updateDraftText(analysisResult.proposalDraft, style);
      addToast(`Switched draft layout to ${style}.`, 'info');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedProposalText);
    setCopied(true);
    addToast('Proposal copied to clipboard! Ready to paste on Upwork.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = (newStatus: 'Draft' | 'Sent' | 'Replied' | 'Won' | 'Lost') => {
    setProposalStatus(newStatus);
    const sample = SAMPLE_JOBS.find((j) => j.id === selectedSampleId) || SAMPLE_JOBS[0];
    
    // Update or add in history
    setProposalsHistory((prev) => {
      const exists = prev.find((item) => item.title === sample.title);
      if (exists) {
        return prev.map((item) => item.title === sample.title ? { ...item, status: newStatus } : item);
      }
      return [
        {
          id: Math.random().toString(36).substring(2, 9),
          title: sample.title,
          date: new Date().toISOString().split('T')[0],
          score: analysisResult?.score || 94,
          status: newStatus,
          matchedWork: portfolioProjects.find((p) => p.id === selectedPortfolioId)?.title || 'FinTech Analytics Dashboard',
          clientName: 'Upwork Client',
        },
        ...prev,
      ];
    });

    addToast(`Proposal status updated to ${newStatus}.`, 'success');
  };

  // AI Refine Quick Actions
  const handleAIRefine = (action: 'shorter' | 'professional' | 'pastwork' | 'question') => {
    setIsRefiningAI(true);
    const activeProject = portfolioProjects.find((p) => p.id === selectedPortfolioId) || portfolioProjects[0];

    setTimeout(() => {
      if (action === 'shorter') {
        setEditedProposalText((prev) => {
          const lines = prev.split('\n').filter(Boolean);
          return `I reviewed your requirements for this project. In my recent build (${activeProject.title}), I achieved ${activeProject.metrics}.\n\nAre you open to a brief 5-minute chat to review my technical blueprint?`;
        });
        addToast('AI Refine: Condensed proposal into punchy pitch.', 'success');
      } else if (action === 'professional') {
        setEditedProposalText((prev) => {
          return `Dear Hiring Manager,\n\nI am writing to express my strong interest in executing this project. My technical background aligns directly with your core stack requirements.\n\nSummary of Technical Qualification:\n• Delivered ${activeProject.title} with verified metrics (${activeProject.metrics}).\n• Zero-downtime deployment standards and strict TypeScript coverage.\n\nI look forward to discussing how we can deliver these outcomes for your team.\n\nSincerely,\n${user?.name || 'Ejaz Karim'}`;
        });
        addToast('AI Refine: Formatted proposal into executive tone.', 'success');
      } else if (action === 'pastwork') {
        setEditedProposalText((prev) => {
          return `${prev}\n\nDeep-Dive Case Study Proof:\nOn ${activeProject.title} (${activeProject.clientIndustry}), I solved ${activeProject.summary} Stack: ${activeProject.techStack.join(', ')}. Resulting Outcome: ${activeProject.keyOutcome}`;
        });
        addToast('AI Refine: Expanded past work case study proof.', 'success');
      } else if (action === 'question') {
        setEditedProposalText((prev) => {
          return `${prev}\n\nQuick Discovery Question: Do you currently have a staging environment set up, or should we incorporate devops staging configuration into our first sprint deliverable?`;
        });
        addToast('AI Refine: Appended high-converting discovery question.', 'success');
      }
      setIsRefiningAI(false);
    }, 350);
  };

  // Switch Case Study
  const handleSelectCaseStudy = (projectId: string) => {
    setSelectedPortfolioId(projectId);
    const project = portfolioProjects.find((p) => p.id === projectId);
    if (project && analysisResult) {
      updateDraftText(analysisResult.proposalDraft, draftStyle, project);
      addToast(`Updated active case study to "${project.title}".`, 'info');
    }
    setShowCaseStudyDrawer(false);
  };

  // New Portfolio Submission
  const handleCreatePortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.title || !newProjectForm.summary || !newProjectForm.techStackStr) {
      setPortfolioFormError('Please fill in Project Title, Summary, and Tech Stack.');
      return;
    }

    setPortfolioFormError('');
    const newProj: PortfolioProject = {
      id: `port-${Date.now()}`,
      title: newProjectForm.title,
      clientIndustry: newProjectForm.clientIndustry || 'General Web Engineering',
      summary: newProjectForm.summary,
      techStack: newProjectForm.techStackStr.split(',').map((s) => s.trim()).filter(Boolean),
      keyOutcome: newProjectForm.keyOutcome || 'Delivered on time with high client satisfaction.',
      metrics: newProjectForm.metrics || '100% test coverage & zero downtime',
      relevantSkills: newProjectForm.techStackStr.split(',').map((s) => s.trim()),
    };

    const updatedList = [newProj, ...portfolioProjects];
    setPortfolioProjects(updatedList);
    try {
      localStorage.setItem('proposala_portfolio', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }

    setSelectedPortfolioId(newProj.id);
    if (analysisResult) {
      updateDraftText(analysisResult.proposalDraft, draftStyle, newProj);
    }

    setNewProjectForm({ title: '', clientIndustry: '', summary: '', techStackStr: '', keyOutcome: '', metrics: '' });
    setShowNewPortfolioModal(false);
    addToast(`Added new project "${newProj.title}" to portfolio bank!`, 'success');
  };

  // Invite Team Member Handler
  const handleInviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    addToast(`Invitation link sent to ${inviteEmail} as ${inviteRole}!`, 'success');
    setInviteEmail('');
    setShowInviteTeamModal(false);
  };

  // History Filtered List
  const filteredHistory = useMemo(() => {
    return proposalsHistory.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
        (item.clientName && item.clientName.toLowerCase().includes(historySearchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (historyFilterTab === 'In Progress') {
        return item.status === 'Draft' || item.status === 'Sent' || item.status === 'Replied';
      } else if (historyFilterTab === 'Won') {
        return item.status === 'Won';
      } else if (historyFilterTab === 'Archived') {
        return item.status === 'Lost' || item.status === 'Draft';
      }
      return true;
    });
  }, [proposalsHistory, historySearchQuery, historyFilterTab]);

  // Bulk History Actions
  const handleSelectAllHistory = () => {
    if (selectedHistoryIds.length === filteredHistory.length) {
      setSelectedHistoryIds([]);
    } else {
      setSelectedHistoryIds(filteredHistory.map((h) => h.id));
    }
  };

  const handleToggleHistorySelect = (id: string) => {
    setSelectedHistoryIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExportJSON = () => {
    const dataToExport = proposalsHistory.filter((h) => selectedHistoryIds.includes(h.id));
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proposala-history-export-${Date.now()}.json`;
    a.click();
    addToast(`Exported ${dataToExport.length} proposals as JSON!`, 'success');
  };

  const handleExportCSV = () => {
    const dataToExport = proposalsHistory.filter((h) => selectedHistoryIds.includes(h.id));
    const headers = ['ID', 'Title', 'Date', 'Score', 'Status', 'Matched Work', 'Client'];
    const rows = dataToExport.map((h) => [
      h.id,
      `"${h.title.replace(/"/g, '""')}"`,
      h.date,
      h.score,
      h.status,
      `"${(h.matchedWork || '').replace(/"/g, '""')}"`,
      `"${(h.clientName || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proposala-history-export-${Date.now()}.csv`;
    a.click();
    addToast(`Exported ${dataToExport.length} proposals as CSV!`, 'success');
  };

  const handleDeleteSelectedHistory = () => {
    setProposalsHistory((prev) => prev.filter((h) => !selectedHistoryIds.includes(h.id)));
    addToast(`Deleted ${selectedHistoryIds.length} proposal history records.`, 'info');
    setSelectedHistoryIds([]);
  };

  // Active Portfolio Project for Card C
  const activePortfolioProject = useMemo(() => {
    return portfolioProjects.find((p) => p.id === selectedPortfolioId) || portfolioProjects[0];
  }, [portfolioProjects, selectedPortfolioId]);

  // Radar Scores calculated
  const radarScores: RadarScores = analysisResult?.score === 28 
    ? { budget: 30, skills: 65, competition: 20, clientHistory: 35, risk: 25 }
    : { budget: 95, skills: 92, competition: 88, clientHistory: 96, risk: 90 };

  // Word & Character count calculation
  const wordCount = editedProposalText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = editedProposalText.length;
  const readingTimeSec = Math.ceil((wordCount / 200) * 60);

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#17140f] font-sans antialiased flex selection:bg-[#17140f] selection:text-[#f7f2e8] relative">

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-3.5 rounded-xl border shadow-lg flex items-center justify-between text-xs font-medium animate-in slide-in-from-bottom-3 duration-200 pointer-events-auto ${
              toast.type === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : toast.type === 'info'
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-blue-700 shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 bg-[#17140f]/60 z-40 md:hidden backdrop-blur-xs" 
        />
      )}

      {/* ========================================== */}
      {/* 1. SIDEBAR (Fixed Left, width 240px)      */}
      {/* ========================================== */}
      <aside className={`w-[240px] bg-[#f7f2e8] border-r border-[#ddd2bf] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 transition-transform duration-200 ${
        mobileMenuOpen ? 'fixed inset-y-0 left-0 translate-x-0' : 'hidden md:flex'
      }`}>
        
        <div className="p-4 space-y-5 overflow-y-auto">
          
          {/* Brand Title */}
          <div className="flex items-center justify-between px-1 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#17140f] flex items-center justify-center text-[#f7f2e8] shadow-sm">
                <Sparkles className="w-4 h-4 text-[#f7f2e8] stroke-[2.5]" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-wider text-[#17140f] uppercase font-serif">
                  PROPOSALA
                </span>
                <div className="text-[10px] text-[#17140f]/70 font-mono tracking-tight">
                  Analyzer v2.4
                </div>
              </div>
            </div>
            {mobileMenuOpen && (
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden text-[#17140f]/70 hover:text-[#17140f] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Workspace Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#ddd2bf] hover:border-[#17140f] text-xs text-left transition-colors cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span className="font-medium text-[#17140f] truncate">{activeWorkspace}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#17140f]/60 group-hover:text-[#17140f] shrink-0 transition-transform" />
            </button>

            {/* Workspace Dropdown Menu */}
            {isWorkspaceOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ddd2bf] rounded-lg shadow-xl z-50 p-1 space-y-0.5 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => { setActiveWorkspace(user?.workspaceName || "Ejaz Karim's workspace"); setIsWorkspaceOpen(false); }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#17140f] hover:bg-[#17140f]/5 rounded flex items-center justify-between font-medium"
                >
                  <span className="truncate">{user?.workspaceName || "Ejaz Karim's workspace"}</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </button>
                <button
                  onClick={() => { setActiveWorkspace("Agency Team Workspace"); setIsWorkspaceOpen(false); }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#17140f]/70 hover:bg-[#17140f]/5 hover:text-[#17140f] rounded truncate"
                >
                  Agency Team Workspace
                </button>
                <div className="border-t border-[#ddd2bf] my-1" />
                <button
                  onClick={() => { setIsWorkspaceOpen(false); setShowSettingsModal(true); }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#17140f] hover:bg-[#17140f]/5 rounded flex items-center gap-1.5 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Workspace Settings</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Navigation Links */}
          <nav className="space-y-1">
            
            {/* New Proposal (Highlighted Button) */}
            <button
              onClick={() => {
                setActiveNav('new');
                setSelectedSampleId(SAMPLE_JOBS[0].id);
                runAnalysis(SAMPLE_JOBS[0].id);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold bg-[#17140f] hover:bg-[#27241e] text-[#f7f2e8] font-mono shadow-md transition-all cursor-pointer mb-3"
            >
              <Plus className="w-4 h-4 text-[#ddd2bf]" />
              <span>New Proposal</span>
            </button>

            {/* Proposals History */}
            <button
              onClick={() => {
                setActiveNav('history');
                setShowHistoryModal(true);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeNav === 'history'
                  ? 'bg-[#17140f] text-[#f7f2e8] font-semibold'
                  : 'text-[#17140f]/70 hover:bg-[#17140f]/5 hover:text-[#17140f]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <History className="w-4 h-4 text-[#17140f]/70" />
                <span>Proposals History</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                activeNav === 'history' ? 'bg-[#f7f2e8] text-[#17140f]' : 'bg-[#17140f]/10 text-[#17140f]'
              }`}>
                {proposalsHistory.length}
              </span>
            </button>

            {/* Past Work Hub */}
            <Link
              to="/portfolio"
              onClick={() => {
                setActiveNav('pastwork');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'pastwork'
                  ? 'bg-[#17140f] text-[#f7f2e8] font-semibold'
                  : 'text-[#17140f]/70 hover:bg-[#17140f]/5 hover:text-[#17140f]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4 text-[#17140f]/70" />
                <span>Past Work Hub</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono font-bold">
                {portfolioProjects.length}
              </span>
            </Link>

            {/* Team & Profiles */}
            <button
              onClick={() => {
                setActiveNav('team');
                setShowTeamModal(true);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeNav === 'team'
                  ? 'bg-[#17140f] text-[#f7f2e8] font-semibold'
                  : 'text-[#17140f]/70 hover:bg-[#17140f]/5 hover:text-[#17140f]'
              }`}
            >
              <Users className="w-4 h-4 text-[#17140f]/70" />
              <span>Team & Profiles</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => {
                setActiveNav('settings');
                setShowSettingsModal(true);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeNav === 'settings'
                  ? 'bg-[#17140f] text-[#f7f2e8] font-semibold'
                  : 'text-[#17140f]/70 hover:bg-[#17140f]/5 hover:text-[#17140f]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#17140f]/70" />
              <span>Settings</span>
            </button>

          </nav>

        </div>

        {/* Sidebar Bottom Section: User Profile & Status */}
        <div className="p-3 border-t border-[#ddd2bf] bg-[#f7f2e8]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#ddd2bf] shadow-xs">
            <div className="flex items-center gap-2.5 truncate">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#17140f] text-[#f7f2e8] text-xs font-bold flex items-center justify-center">
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'EK'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="truncate text-left">
                <div className="text-xs font-semibold text-[#17140f] truncate">{user?.name || 'Ejaz Karim'}</div>
                <div className="text-[10px] text-[#17140f]/60 truncate">{user?.email || 'ejaz@proposala.io'}</div>
              </div>
            </div>
            
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign out"
              className="p-1.5 text-[#17140f]/60 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer shrink-0 ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ========================================== */}
      {/* 2. MAIN CONTENT AREA (Scrollable panel)    */}
      {/* ========================================== */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Top Bar Header */}
        <header className="px-4 sm:px-6 py-4 bg-[#121214] border-b border-[#27272A] flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
          
          {/* Breadcrumb & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-gray-400 hover:text-white p-1 rounded-md hover:bg-[#18181B]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 font-mono">Proposala</span>
              <span className="text-gray-600">/</span>
              <span className="text-white font-semibold">Job Analysis</span>
            </div>
          </div>

          {/* Right Top Status Metadata & Offline Mode Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Live UTC Timestamp */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono hidden sm:flex">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{utcTime || '2026-07-30 18:14:00 UTC'}</span>
            </div>

            {/* Network / Offline Mode Toggle */}
            <button
              onClick={() => {
                setIsOfflineMode(!isOfflineMode);
                addToast(isOfflineMode ? 'Reconnected to Cloud Servers.' : 'Switched to Offline Mode simulation.', isOfflineMode ? 'success' : 'warning');
              }}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                isOfflineMode
                  ? 'bg-amber-950/80 border border-amber-800/60 text-amber-300'
                  : 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400'
              }`}
              title="Click to toggle simulated connection status"
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Offline Mode</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Systems Operational</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-xs text-gray-400 hover:text-white transition-colors ml-2 hidden sm:block cursor-pointer"
            >
              Sign out
            </button>

          </div>

        </header>

        {/* Offline Banner Alert */}
        {isOfflineMode && (
          <div className="bg-amber-950/70 border-b border-amber-800/50 px-6 py-2 text-xs text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Offline Mode Active:</strong> Running with cached proposal engine and local portfolio database.</span>
            </div>
            <button onClick={() => setIsOfflineMode(false)} className="text-amber-400 underline hover:text-white">
              Reconnect
            </button>
          </div>
        )}

        {/* Dashboard Main Scroll Container - IDE Split View Layout */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* TOP HEADER STATUS BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#18181B] border border-[#27272A] p-4 rounded-xl shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sliders className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                  IDE PROPOSAL STUDIO & AI ANALYZER
                </h1>
                <p className="text-xs text-gray-400">
                  Configure strategy, filter portfolio proofs, and generate winning Upwork proposals in seconds.
                </p>
              </div>
            </div>

            {/* AI Engine Status Pill */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-gray-400">Model:</span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#121214] border border-[#27272A] text-emerald-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>{aiModel}</span>
              </span>
            </div>
          </div>

          {/* MAIN IDE HORIZONTAL SPLIT GRID (LEFT CONFIG vs RIGHT STRATEGY) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ========================================================= */}
            {/* 1. LEFT PANEL (CONFIGURATION & INPUTS) - 5 Cols           */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-5 shadow-lg flex flex-col">
              
              {/* Header */}
              <div className="border-b border-[#27272A] pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    1. Configuration & Inputs
                  </h2>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#27272A] text-gray-400 font-mono">
                  Input Panel
                </span>
              </div>

              {/* Profile & Department Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Your Profile Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-300 block">
                    Your Profile
                  </label>
                  <select
                    value={selectedProfile}
                    onChange={(e) => {
                      setSelectedProfile(e.target.value);
                      addToast(`Switched profile to ${e.target.value}`, 'info');
                    }}
                    className="w-full bg-[#121214] border border-[#27272A] rounded-lg text-xs p-2.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans cursor-pointer"
                  >
                    <option value="Senior Fullstack Developer">Senior Fullstack Developer</option>
                    <option value="3D Animator & Visualizer">3D Animator & Visualizer</option>
                    <option value="UI/UX Product Architect">UI/UX Product Architect</option>
                    <option value="Video Production Lead">Video Production Lead</option>
                    <option value="AI Systems Specialist">AI Systems Specialist</option>
                  </select>
                </div>

                {/* Department Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-300 block">
                    Department
                  </label>
                  <select
                    value={selectedDept}
                    onChange={(e) => {
                      setSelectedDept(e.target.value);
                      addToast(`Switched department to ${e.target.value}`, 'info');
                    }}
                    className="w-full bg-[#121214] border border-[#27272A] rounded-lg text-xs p-2.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans cursor-pointer"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Animation & Motion">Animation & Motion</option>
                    <option value="Product Design">Product Design</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Video & VFX">Video & VFX</option>
                  </select>
                </div>

              </div>

              {/* Job Posting Textarea & Preset Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-300 block">
                    Client Job Description
                  </label>
                  
                  {/* Presets */}
                  <div className="flex items-center gap-1">
                    {SAMPLE_JOBS.slice(0, 3).map((sample, idx) => (
                      <button
                        key={sample.id}
                        onClick={() => {
                          setSelectedSampleId(sample.id);
                          runAnalysis(sample.id);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          selectedSampleId === sample.id
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                            : 'bg-[#121214] text-gray-400 border border-[#27272A] hover:text-white'
                        }`}
                      >
                        Preset #{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={6}
                  value={jobInputText}
                  onChange={(e) => {
                    setJobInputText(e.target.value);
                    if (selectedSampleId !== 'custom') setSelectedSampleId('custom');
                  }}
                  placeholder="Paste Upwork job link or client job description..."
                  className="w-full bg-[#121214] border border-[#27272A] rounded-lg text-xs p-3 text-gray-100 placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans leading-relaxed resize-none transition-all"
                />
              </div>

              {/* Settings Toggles (English Level, Proposal Length, AI Model) */}
              <div className="p-3.5 bg-[#121214] border border-[#27272A] rounded-xl space-y-3">
                
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>AI Prompt Generation Settings</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* English Level */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gray-400 block">English Level:</span>
                    <select
                      value={englishLevel}
                      onChange={(e) => setEnglishLevel(e.target.value as any)}
                      className="w-full bg-[#18181B] border border-[#27272A] rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Basic/ESL">Basic / ESL</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Native/Fluent">Native / Fluent</option>
                    </select>
                  </div>

                  {/* AI Model */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gray-400 block">AI Model Engine:</span>
                    <select
                      value={aiModel}
                      onChange={(e) => {
                        setAiModel(e.target.value);
                        addToast(`Model engine set to ${e.target.value}`, 'info');
                      }}
                      className="w-full bg-[#18181B] border border-[#27272A] rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                      <option value="GPT-4o">GPT-4o</option>
                      <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                    </select>
                  </div>

                </div>

                {/* Proposal Length Segmented Toggle */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 block">Proposal Length:</span>
                  <div className="grid grid-cols-3 gap-1 bg-[#18181B] p-1 rounded-lg border border-[#27272A]">
                    {(['Short', 'Medium', 'Detailed'] as const).map((len) => (
                      <button
                        key={len}
                        onClick={() => {
                          setProposalLength(len);
                          addToast(`Set proposal length to ${len}`, 'info');
                        }}
                        className={`py-1 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                          proposalLength === len
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button: Extract Score */}
              <div className="pt-2">
                <button
                  onClick={() => runAnalysis()}
                  disabled={isAnalyzing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Processing Job Fit & Scoring...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-emerald-200" />
                      <span>Extract Score & Analyze Fit</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* ========================================================= */}
            {/* 2. RIGHT PANEL (STRATEGY & OUTPUT) - 7 Cols               */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* FIT SCORE HEADER CARD */}
              <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 shadow-lg space-y-3 relative overflow-hidden">
                
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                      Card Fit Evaluation
                    </span>
                    <h3 className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>Fit Score & Match Index</span>
                    </h3>
                  </div>

                  {/* Visual Score Pill Badge */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-mono block">Match Rating</span>
                      <span className={`text-xl font-black font-mono ${
                        (analysisResult?.score || 94) >= 80 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {(analysisResult?.score || 94) >= 80 ? 'Good ' : 'Moderate '}
                        {analysisResult?.score || 94}.0 / 100
                      </span>
                    </div>

                    <button
                      onClick={() => setShowScoreModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Breakdown</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-300 leading-relaxed font-medium">
                  {analysisResult?.summary || 'Client profile matched with your past work. High budget confidence with verified 5-star client hire rate.'}
                </div>

              </div>

              {/* PROOF TO USE (CASE STUDIES LIST) */}
              <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-3 shadow-lg">
                
                <div className="flex items-center justify-between border-b border-[#27272A] pb-2.5">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Proof to Use ({activeProofIds.length} Case Studies Active)
                    </h3>
                  </div>

                  <button
                    onClick={() => setShowCaseStudyDrawer(true)}
                    className="px-2.5 py-1 rounded bg-[#121214] border border-[#27272A] hover:border-gray-600 text-[11px] font-mono text-emerald-400 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Add Proof</span>
                  </button>
                </div>

                {/* Proof Cards Grid */}
                <div className="space-y-2">
                  {portfolioProjects
                    .filter((p) => activeProofIds.includes(p.id))
                    .map((project) => (
                      <div
                        key={project.id}
                        className="bg-[#121214] border border-[#27272A] rounded-lg p-3 flex items-start justify-between gap-3 hover:border-gray-700 transition-all group"
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white truncate">{project.title}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                              {project.clientIndustry}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 line-clamp-1">{project.summary}</p>
                          <div className="text-[10px] font-mono text-emerald-400">
                            Verified Metric: <strong>{project.metrics}</strong>
                          </div>
                        </div>

                        {/* Remove 'X' Button to exclude from prompt context */}
                        <button
                          onClick={() => handleRemoveProof(project.id)}
                          className="p-1 text-gray-500 hover:text-red-400 hover:bg-[#27272A] rounded transition-colors cursor-pointer shrink-0"
                          title="Remove from proposal prompt context"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                  {activeProofIds.length === 0 && (
                    <div className="p-4 text-center rounded bg-[#121214] border border-dashed border-[#27272A] text-xs text-gray-400">
                      No proof case studies active. Click "+ Add Proof" above to select past work.
                    </div>
                  )}
                </div>

              </div>

              {/* SHAPES TO USE (PROPOSAL STRUCTURE STRATEGY) */}
              <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-4 shadow-lg">
                
                <div className="border-b border-[#27272A] pb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers3 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Shapes to Use (Proposal Structure)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">Strategic Flow</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Opener Shape */}
                  <div className="space-y-1 bg-[#121214] p-3 rounded-lg border border-[#27272A]">
                    <label className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      1. Opener Hook
                    </label>
                    <select
                      value={openerShape}
                      onChange={(e) => {
                        setOpenerShape(e.target.value);
                        addToast(`Opener set to "${e.target.value}"`, 'info');
                      }}
                      className="w-full bg-[#18181B] border border-[#27272A] text-xs text-gray-200 rounded p-1.5 font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Direct Pain-Point Hook">Direct Pain-Point Hook</option>
                      <option value="Story Opener">Story Opener</option>
                      <option value="Technical Solution Lead">Technical Solution Lead</option>
                      <option value="Empathy & Mirror">Empathy & Mirror</option>
                    </select>
                  </div>

                  {/* Middle Shape */}
                  <div className="space-y-1 bg-[#121214] p-3 rounded-lg border border-[#27272A]">
                    <label className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      2. Middle Body
                    </label>
                    <select
                      value={middleShape}
                      onChange={(e) => {
                        setMiddleShape(e.target.value);
                        addToast(`Middle structure set to "${e.target.value}"`, 'info');
                      }}
                      className="w-full bg-[#18181B] border border-[#27272A] text-xs text-gray-200 rounded p-1.5 font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Week-by-Week SOW">Week-by-Week SOW</option>
                      <option value="Problem Mirror & SOW">Problem Mirror & SOW</option>
                      <option value="Metrics & Case Study Proof">Metrics & Case Study Proof</option>
                      <option value="Architecture Breakdown">Architecture Breakdown</option>
                    </select>
                  </div>

                  {/* Close Shape */}
                  <div className="space-y-1 bg-[#121214] p-3 rounded-lg border border-[#27272A]">
                    <label className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      3. Close Action
                    </label>
                    <select
                      value={closeShape}
                      onChange={(e) => {
                        setCloseShape(e.target.value);
                        addToast(`Close call-to-action set to "${e.target.value}"`, 'info');
                      }}
                      className="w-full bg-[#18181B] border border-[#27272A] text-xs text-gray-200 rounded p-1.5 font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Soft Question Close">Soft Question Close</option>
                      <option value="Phased-Pricing Tease">Phased-Pricing Tease</option>
                      <option value="Calendar Booking Call">Calendar Booking Call</option>
                      <option value="Immediate Start Guarantee">Immediate Start Guarantee</option>
                    </select>
                  </div>

                </div>

                {/* GENERATE DRAFT ACTION BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={handleGenerateDraft}
                    disabled={isGeneratingDraft}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingDraft ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Synthesizing Draft with {aiModel}...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-200" />
                        <span>Generate Draft Proposal</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* ========================================================= */}
          {/* 3. DRAFT EDITOR (FINAL STATE OUTPUT PANEL)                */}
          {/* ========================================================= */}
          <section className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-4 shadow-lg">
            
            {/* Header, Draft Tabs, and Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#27272A]">
              
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Proposal Draft & Rich Editor</span>
                </h3>
                <p className="text-xs text-gray-400">
                  AI-synthesized human-tone proposal based on your selected shapes, profile, and case study proofs.
                </p>
              </div>

              {/* Draft Style Tab Switcher */}
              <div className="flex items-center gap-1 bg-[#121214] p-1 rounded-lg border border-[#27272A]">
                {(['Direct & Short', 'Value Focused', 'Detailed'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => handleTabChange(style)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      draftStyle === style
                        ? 'bg-[#27272A] text-white font-semibold shadow-xs'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Actions: Status Dropdown & Copy Draft Button */}
              <div className="flex items-center gap-2.5">
                
                {/* Status Selector Dropdown */}
                <select
                  value={proposalStatus}
                  onChange={(e) => handleStatusChange(e.target.value as any)}
                  className="bg-[#121214] border border-[#27272A] text-xs text-gray-200 rounded-lg px-2.5 py-2 font-mono font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Draft">Status: Draft</option>
                  <option value="Sent">Status: Sent</option>
                  <option value="Replied">Status: Replied</option>
                  <option value="Won">Status: Won 🎉</option>
                  <option value="Lost">Status: Lost</option>
                </select>

                {/* Copy Draft Button */}
                <button
                  onClick={handleCopy}
                  className="bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gray-100" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>

              </div>

            </div>

            {/* Inline AI Quick Actions Bar */}
            <div className="bg-[#121214] p-2 rounded-lg border border-[#27272A] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI QUICK REFINE:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => handleAIRefine('shorter')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Make Shorter</span>
                </button>

                <button
                  onClick={() => handleAIRefine('professional')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  <span>More Professional</span>
                </button>

                <button
                  onClick={() => handleAIRefine('pastwork')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <FolderGit2 className="w-3 h-3 text-emerald-400" />
                  <span>Emphasize Past Work</span>
                </button>

                <button
                  onClick={() => handleAIRefine('question')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <HelpCircle className="w-3 h-3 text-purple-400" />
                  <span>Add Closing Question</span>
                </button>
              </div>
            </div>

            {/* Minimalist Rich Editor */}
            <div className="space-y-2 relative">
              {isRefiningAI && (
                <div className="absolute inset-0 bg-[#121214]/70 backdrop-blur-xs rounded-lg z-10 flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Refining draft tone with Gemini...</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono px-1">
                <span>FORMATTED PROPOSAL CONTENT</span>
                <span className="text-gray-300 font-semibold">
                  {wordCount} words • {charCount} characters • ~{readingTimeSec}s read time
                </span>
              </div>

              <textarea
                rows={10}
                value={editedProposalText}
                onChange={(e) => setEditedProposalText(e.target.value)}
                className="w-full bg-[#121214] border border-[#27272A] rounded-lg text-xs sm:text-sm p-4 text-gray-100 placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans leading-relaxed transition-all resize-none shadow-inner"
              />
            </div>

            {/* Bottom Status Tip */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 pt-1 gap-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Zero AI fluff phrases detected (No "Dear Hiring Manager", "I am a passionate...")</span>
              </div>

              <div className="text-gray-500 text-[11px]">
                Ready to submit on Upwork proposal page
              </div>
            </div>

          </section>

        </main>

      </div>

      {/* ========================================== */}
      {/* 3. SCORE BREAKDOWN MODAL                   */}
      {/* ========================================== */}
      {showScoreModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <span>Granular Score & Fit Breakdown</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Detailed evaluation across the 5 core proposal winning vectors.
                </p>
              </div>
              <button onClick={() => setShowScoreModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Strategic Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
              (analysisResult?.score || 94) >= 80 
                ? 'bg-emerald-950/70 border-emerald-800 text-emerald-200'
                : 'bg-red-950/70 border-red-800 text-red-200'
            }`}>
              <div>
                <div className="text-xs font-mono uppercase font-bold text-emerald-400">
                  VERDICT: {(analysisResult?.score || 94) >= 80 ? 'HIGH CONVERSION POTENTIAL' : 'HIGH RISK / LOW ROI'}
                </div>
                <div className="text-sm font-semibold mt-0.5">
                  {(analysisResult?.score || 94) >= 80
                    ? 'This job post represents an ideal match. We recommend submitting a detailed proposal using past case study #1.'
                    : 'Unverified client history with below-market budget rates. Proceed with caution or skip.'}
                </div>
              </div>
              <div className="text-3xl font-black font-mono shrink-0">
                {analysisResult?.score || 94}/100
              </div>
            </div>

            {/* 5 Vector Deep-Dive Cards */}
            <div className="space-y-3 text-xs">
              
              {/* 1. Budget Fit */}
              <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Budget Fit & Rate Alignment</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{radarScores.budget}/100</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Client posted budget ($1,500 - $3,000) aligns cleanly with target developer rates ($60-$90/hr). Low price negotiation risk.
                </p>
              </div>

              {/* 2. Skill Match */}
              <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Skill Stack Compatibility</span>
                  </span>
                  <span className="font-mono text-blue-400 font-bold">{radarScores.skills}/100</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Required technologies (React 18, TypeScript, Tailwind, Node.js) match 100% of your primary technical profile.
                </p>
              </div>

              {/* 3. Client History */}
              <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Client Hiring History & Payment Verification</span>
                  </span>
                  <span className="font-mono text-purple-400 font-bold">{radarScores.clientHistory}/100</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Verified payment method with $85,000+ total spent across 24 hires. Average rating: 5.0 stars. Fast response window.
                </p>
              </div>

              {/* 4. Competition Density */}
              <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Competition Density</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{radarScores.competition}/100</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  15-20 proposals submitted. Applying within the first 2 hours yields 4.2x higher client view rate.
                </p>
              </div>

              {/* 5. Risk Audit */}
              <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Low Risk Assessment</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{radarScores.risk}/100</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Zero red flags detected in job text. Scope is well-defined with measurable milestone deliverables.
                </p>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowScoreModal(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
              >
                Close Score Breakdown
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. CASE STUDY SWITCHER DRAWER              */}
      {/* ========================================== */}
      {showCaseStudyDrawer && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-[#121214] border-l border-[#27272A] h-full p-6 flex flex-col justify-between space-y-4 animate-in slide-in-from-right duration-200 overflow-y-auto">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>Select Case Study</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Pick a project from your portfolio bank to quote in this proposal.
                  </p>
                </div>
                <button onClick={() => setShowCaseStudyDrawer(false)} className="text-gray-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={caseStudySearch}
                  onChange={(e) => setCaseStudySearch(e.target.value)}
                  placeholder="Filter case studies by tech or industry..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg text-xs pl-9 pr-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* List of Portfolio Projects */}
              <div className="space-y-3 pt-2">
                {portfolioProjects
                  .filter((p) => p.title.toLowerCase().includes(caseStudySearch.toLowerCase()) || p.techStack.some((t) => t.toLowerCase().includes(caseStudySearch.toLowerCase())))
                  .map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleSelectCaseStudy(project.id)}
                      className={`p-4 rounded-xl border text-xs space-y-2 cursor-pointer transition-all ${
                        selectedPortfolioId === project.id
                          ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40'
                          : 'bg-[#18181B] border-[#27272A] hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm truncate max-w-[220px]">{project.title}</span>
                        {selectedPortfolioId === project.id && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-[#27272A] text-gray-300 text-[10px] font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="text-[10px] text-emerald-400 font-mono pt-1 font-semibold">
                        Metric: {project.metrics}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#27272A]">
              <button
                onClick={() => setShowNewPortfolioModal(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Portfolio Item</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. PROPOSALS HISTORY SLIDEOVER MODAL       */}
      {/* ========================================== */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-2xl bg-[#121214] border-l border-[#27272A] h-full p-6 flex flex-col justify-between space-y-4 animate-in slide-in-from-right duration-200 overflow-y-auto">
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-400" />
                    <span>Proposals History & Data Table</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Search, filter, export, or reload past proposal drafts.
                  </p>
                </div>
                <button onClick={() => setShowHistoryModal(false)} className="text-gray-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & Filter Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                
                {/* Search Bar */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={historySearchQuery}
                    onChange={(e) => setHistorySearchQuery(e.target.value)}
                    placeholder="Search by job title or client name..."
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg text-xs pl-9 pr-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Filter Tab Switcher */}
                <div className="flex items-center gap-1 bg-[#18181B] p-1 rounded-lg border border-[#27272A] shrink-0 w-full sm:w-auto">
                  {(['All', 'In Progress', 'Won', 'Archived'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setHistoryFilterTab(tab)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                        historyFilterTab === tab
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

              </div>

              {/* Bulk Actions Toolbar */}
              {selectedHistoryIds.length > 0 && (
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
                  <span className="font-semibold font-mono">
                    {selectedHistoryIds.length} item{selectedHistoryIds.length > 1 ? 's' : ''} selected
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportJSON}
                      className="px-2.5 py-1 rounded bg-[#121214] hover:bg-[#18181B] border border-[#27272A] text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-emerald-400" />
                      <span>JSON</span>
                    </button>

                    <button
                      onClick={handleExportCSV}
                      className="px-2.5 py-1 rounded bg-[#121214] hover:bg-[#18181B] border border-[#27272A] text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3 h-3 text-blue-400" />
                      <span>CSV</span>
                    </button>

                    <button
                      onClick={handleDeleteSelectedHistory}
                      className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Proposals History Table */}
              <div className="border border-[#27272A] rounded-xl overflow-hidden bg-[#18181B]">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#121214] text-gray-400 uppercase font-mono text-[10px] border-b border-[#27272A]">
                    <tr>
                      <th className="p-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectedHistoryIds.length === filteredHistory.length && filteredHistory.length > 0}
                          onChange={handleSelectAllHistory}
                          className="rounded border-gray-700 text-emerald-500 focus:ring-emerald-500 bg-[#18181B]"
                        />
                      </th>
                      <th className="p-3">Job Title & Client</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272A]">
                    {filteredHistory.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-gray-500 text-xs">
                          No proposals found matching search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredHistory.map((item) => (
                        <tr 
                          key={item.id}
                          className="hover:bg-[#27272A]/40 transition-colors group cursor-pointer"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={selectedHistoryIds.includes(item.id)}
                              onChange={() => handleToggleHistorySelect(item.id)}
                              className="rounded border-gray-700 text-emerald-500 focus:ring-emerald-500 bg-[#18181B]"
                            />
                          </td>
                          <td 
                            className="p-3 font-medium text-white max-w-[200px] truncate"
                            onClick={() => {
                              setSelectedSampleId('custom');
                              setJobInputText(`${item.title}\n\nReopened proposal history draft.`);
                              setShowHistoryModal(false);
                              addToast(`Reopened proposal draft for "${item.title}".`, 'info');
                            }}
                          >
                            <div className="truncate group-hover:text-emerald-300 transition-colors">{item.title}</div>
                            <div className="text-[10px] text-gray-500 font-mono truncate">{item.clientName || 'Upwork Client'}</div>
                          </td>
                          <td className="p-3 font-mono font-bold text-emerald-400">
                            {item.score}/100
                          </td>
                          <td className="p-3 font-mono text-[11px] text-gray-400">
                            {item.date}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'Won' ? 'bg-purple-950 text-purple-300 border border-purple-800/40' :
                              item.status === 'Replied' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' :
                              item.status === 'Sent' ? 'bg-blue-950 text-blue-300 border border-blue-800/40' :
                              'bg-[#27272A] text-gray-300'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>

            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-white text-xs font-semibold"
            >
              Close Proposals History
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. NEW PAST WORK / PORTFOLIO MODAL        */}
      {/* ========================================== */}
      {showNewPortfolioModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span>Add Portfolio Case Study</span>
              </h3>
              <button onClick={() => setShowNewPortfolioModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {portfolioFormError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-xs text-red-200">
                {portfolioFormError}
              </div>
            )}

            <form onSubmit={handleCreatePortfolioItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Stripe Payment & Billing Overhaul"
                  value={newProjectForm.title}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. SaaS / FinTech"
                    value={newProjectForm.clientIndustry}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, clientIndustry: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Tech Stack (comma separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="React, TypeScript, Node, Stripe"
                    value={newProjectForm.techStackStr}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, techStackStr: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Project Summary *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe what problem you solved for the client..."
                  value={newProjectForm.summary}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, summary: e.target.value })}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Key Metrics / Numbers Achieved</label>
                <input
                  type="text"
                  placeholder="e.g. -74% load latency, +32% conversion boost"
                  value={newProjectForm.metrics}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, metrics: e.target.value })}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPortfolioModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-gray-300 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer shadow-md"
                >
                  Save Case Study
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 7. TEAM & PROFILES MODAL                   */}
      {/* ========================================== */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Team & Profiles</span>
              </h3>
              <button onClick={() => setShowTeamModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-200 font-bold flex items-center justify-center text-xs">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'EK'}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{user?.name || 'Ejaz Karim'}</div>
                    <div className="text-[10px] text-gray-400">Workspace Owner</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">Owner</span>
              </div>

              <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-blue-200 font-bold flex items-center justify-center text-xs">
                    SC
                  </div>
                  <div>
                    <div className="font-semibold text-white">Sarah Chen</div>
                    <div className="text-[10px] text-gray-400">Fullstack Specialist</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#27272A] text-gray-400">Admin</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowTeamModal(false);
                setShowInviteTeamModal(true);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Invite Team Member</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 8. INVITE TEAM MEMBER MODAL               */}
      {/* ========================================== */}
      {showInviteTeamModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Invite Team Member</span>
              </h3>
              <button onClick={() => setShowInviteTeamModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteTeamMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@agency.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Role Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Admin">Admin (Full access + proposal editing)</option>
                  <option value="Member">Member (Create & analyze proposals)</option>
                  <option value="Viewer">Viewer (Read-only access)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteTeamModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer shadow-md"
                >
                  Send Invitation
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 9. SETTINGS MODAL                          */}
      {/* ========================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121214] border border-[#27272A] rounded-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>Workspace Settings</span>
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Active Workspace Name</label>
                <input
                  type="text"
                  value={activeWorkspace}
                  onChange={(e) => setActiveWorkspace(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#18181B] border border-[#27272A] text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Gemini AI Key Proxy</label>
                <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-between">
                  <span className="text-emerald-400 font-mono text-[11px]">Server Proxy Active (Encrypted)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Default Proposal Tone</label>
                <select className="w-full p-3 rounded-lg bg-[#18181B] border border-[#27272A] text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option>Value-Focused (Recommended)</option>
                  <option>Direct & Short</option>
                  <option>Detailed Technical Case Study</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSettingsModal(false);
                addToast('Workspace settings saved.', 'success');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer shadow-md"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

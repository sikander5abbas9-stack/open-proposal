import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Zap, RefreshCw, 
  Copy, Check, AlertTriangle, ChevronDown, Clock, History, FolderGit2,
  Users, Settings, Plus, FileText, CheckCircle, Eye, ExternalLink, 
  ChevronRight, Edit3, X, Terminal, Filter, Layers, BarChart3, HelpCircle, 
  LogOut, Menu, Download, Trash2, Search, SlidersHorizontal, Info, Wifi, 
  WifiOff, FileSpreadsheet, Share2, MessageSquare, ArrowUpRight, Sliders, Cpu, Layers3
} from 'lucide-react';
import { SAMPLE_JOBS } from '../data/sampleJobs';
import { JobAnalysisResult, PortfolioProject } from '../types';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { DashboardOverviewView } from '../components/dashboard/DashboardOverviewView';
import { ProposalsListView } from '../components/dashboard/ProposalsListView';
import { DealCenterView } from '../components/dashboard/DealCenterView';
import { ProfilesView } from '../components/dashboard/ProfilesView';
import { ProposalLibraryView } from '../components/dashboard/ProposalLibraryView';
import { AccountSettingsView } from '../components/dashboard/AccountSettingsView';
import { VideoModal } from '../components/VideoModal';

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
      className="relative flex flex-col items-center justify-center p-2 cursor-pointer group rounded-xl hover:bg-slate-50 transition-all border border-slate-100"
      title="Click to view Score Breakdown"
    >
      <svg width="220" height="220" className="overflow-visible">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="radarBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Concentric Pentagon Background Rings */}
        {rings.map((ringPts, idx) => (
          <polygon
            key={idx}
            points={ringPts}
            fill="none"
            stroke="#CBD5E1"
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
              stroke="#CBD5E1"
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
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="transition-all duration-500"
              />
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#475569"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="600"
                className="group-hover:fill-emerald-600 transition-colors"
              >
                {a.label} ({a.score})
              </text>
            </g>
          );
        })}
      </svg>
      <div className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 mt-1 opacity-90 group-hover:opacity-100 transition-opacity">
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();

  // Sync Profiles modal state with URL query parameters
  const openProfilesModal = () => {
    setShowTeamModal(true);
    setActiveNav('team');
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('view', 'profiles');
      return next;
    }, { replace: true });
  };

  // WhatsApp Share helper
  const handleShareWhatsApp = () => {
    const shareUrl = `${window.location.origin}/dashboard?view=profiles`;
    const message = `🚀 *Proposala Workspace - Profiles & Team Details*

📌 *Active Profile:* ${selectedProfile}
👤 *Workspace Owner:* ${user?.name || (user?.email ? user.email.split("@")[0] : "Workspace Member")} (${user?.email || "user@company.com"})
💼 *Role:* Senior Freelance Technical Lead
⚡ *Proposala AI:* AI-powered Upwork proposal optimization & technical profile matching

🔗 *Direct Profiles Link:* ${shareUrl}
`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    addToast("Opening WhatsApp share...", "info");
  };

  const closeProfilesModal = () => {
    setShowTeamModal(false);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('view');
      next.delete('tab');
      next.delete('modal');
      next.delete('profile');
      return next;
    }, { replace: true });
  };

  const location = useLocation();

  // Mobile Drawer & Workspace State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(user?.workspaceName || "My Workspace");

  // Nav Selection State (PDF Proposala Navigation Views)
  const [activeNav, setActiveNav] = useState<'dashboard' | 'new' | 'proposals' | 'deal-center' | 'profiles' | 'library' | 'account'>('dashboard');
  const [showVideoModal, setShowVideoModal] = useState(false);

  // UI Density State (Defaulting to 'medium' / 'standard' as requested)
  const [uiDensity, setUiDensity] = useState<'compact' | 'medium' | 'standard'>(() => {
    return (localStorage.getItem('proposala_ui_density') as 'compact' | 'medium' | 'standard') || 'medium';
  });

  const handleDensityChange = (density: 'compact' | 'medium' | 'standard') => {
    setUiDensity(density);
    localStorage.setItem('proposala_ui_density', density);
  };

  // Modal / Slideover states
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [profilesModalTab, setProfilesModalTab] = useState<'profiles' | 'team' | 'portfolio'>('profiles');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showCaseStudyDrawer, setShowCaseStudyDrawer] = useState(false);
  const [showNewPortfolioModal, setShowNewPortfolioModal] = useState(false);
  const [showInviteTeamModal, setShowInviteTeamModal] = useState(false);

  // Connection Alert State
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Sync Nav state with URL path and query parameters
  useEffect(() => {
    const path = location.pathname;
    const viewParam = searchParams.get('view') || searchParams.get('tab') || searchParams.get('modal') || searchParams.get('profile');

    if (path === '/dashboard') {
      setActiveNav('dashboard');
    } else if (path === '/proposals') {
      setActiveNav('proposals');
    } else if (path === '/deal-center') {
      setActiveNav('deal-center');
    } else if (path === '/profiles') {
      setActiveNav('profiles');
    } else if (path === '/atoms' || path === '/proposal-library') {
      setActiveNav('library');
    } else if (path === '/account') {
      setActiveNav('account');
    } else if (path === '/proposals/new' || path.startsWith('/analyzer')) {
      setActiveNav('new');
    } else if (viewParam === 'profiles' || viewParam === 'profile') {
      setActiveNav('profiles');
    }
  }, [location.pathname, searchParams]);

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

  const userId = user?.uid || 'guest-user';

  // Portfolio state
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem(`proposala_portfolio_${userId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    const fetchUserPortfolio = async () => {
      try {
        const colRef = collection(db, 'users', userId, 'portfolioProjects');
        const snapshot = await getDocs(colRef);
        if (!snapshot.empty) {
          const fetched: PortfolioProject[] = snapshot.docs.map(d => d.data() as PortfolioProject);
          setPortfolioProjects(fetched);
          localStorage.setItem(`proposala_portfolio_${userId}`, JSON.stringify(fetched));
        } else {
          setPortfolioProjects([]);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, `users/${userId}/portfolioProjects`);
      }
    };
    if (userId) {
      fetchUserPortfolio();
    }
  }, [userId]);

  const fallbackProject: PortfolioProject = {
    id: 'fallback-1',
    title: 'Full-Stack Web Application',
    summary: 'High performance scalable web application built with modern stack.',
    clientIndustry: 'SaaS / Enterprise',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    metrics: '99.9% uptime, -50% load latency',
    keyOutcome: 'Delivered robust production-grade scaling.',
    relevantSkills: ['React', 'TypeScript', 'Tailwind'],
    link: ''
  };

  const getActiveProject = (overrideId?: string) => {
    if (portfolioProjects.length === 0) return fallbackProject;
    const idToFind = overrideId || selectedPortfolioId;
    return portfolioProjects.find((p) => p.id === idToFind) || portfolioProjects[0] || fallbackProject;
  };

  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>(portfolioProjects[0]?.id || 'fallback-1');

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
    const activeProject = getActiveProject();

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

      const fullDraft = `${hookText}\n\n${middleText}\n\n${proofText}\n\n${closeText}\n\nBest regards,\n${user?.name || (user?.email ? user.email.split("@")[0] : 'Workspace Member')}\n${selectedProfile} • ${selectedDept}\nEnglish: ${englishLevel} | Model: ${aiModel}`;
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
    const activeProject = projectOverride || getActiveProject();
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
        `Hi there,\n\n${draft.hook}\n\n${draft.body}\n\nVerified Past Case Study:\n${caseStudyRef}\n\nProposed Next Step:\n${draft.callToAction}\n\nBest regards,\n${user?.name || (user?.email ? user.email.split("@")[0] : 'Workspace Member')}`
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
          matchedWork: getActiveProject().title,
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
    const activeProject = getActiveProject();

    setTimeout(() => {
      if (action === 'shorter') {
        setEditedProposalText((prev) => {
          const lines = prev.split('\n').filter(Boolean);
          return `I reviewed your requirements for this project. In my recent build (${activeProject.title}), I achieved ${activeProject.metrics}.\n\nAre you open to a brief 5-minute chat to review my technical blueprint?`;
        });
        addToast('AI Refine: Condensed proposal into punchy pitch.', 'success');
      } else if (action === 'professional') {
        setEditedProposalText((prev) => {
          return `Dear Hiring Manager,\n\nI am writing to express my strong interest in executing this project. My technical background aligns directly with your core stack requirements.\n\nSummary of Technical Qualification:\n• Delivered ${activeProject.title} with verified metrics (${activeProject.metrics}).\n• Zero-downtime deployment standards and strict TypeScript coverage.\n\nI look forward to discussing how we can deliver these outcomes for your team.\n\nSincerely,\n${user?.name || (user?.email ? user.email.split("@")[0] : 'Workspace Member')}`;
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
  const handleCreatePortfolioItem = async (e: React.FormEvent) => {
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
      localStorage.setItem(`proposala_portfolio_${userId}`, JSON.stringify(updatedList));
      const docRef = doc(db, 'users', userId, 'portfolioProjects', newProj.id);
      await setDoc(docRef, { ...newProj, userId, createdAt: new Date().toISOString() });
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
    return getActiveProject();
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex selection:bg-indigo-600 selection:text-white relative">

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
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-xs" 
        />
      )}

      {/* ========================================== */}
      {/* 1. SIDEBAR (Fixed Left, width 240px)      */}
      {/* ========================================== */}
      <aside className={`w-[240px] bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 transition-transform duration-200 ${
        mobileMenuOpen ? 'fixed inset-y-0 left-0 translate-x-0' : 'hidden md:flex'
      }`}>
        
        <div className="p-4 space-y-4 overflow-y-auto">
          
          {/* Brand Title */}
          <div className="flex items-center justify-between px-1 pt-1">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <span className="text-base font-extrabold tracking-tight text-slate-900 font-mono">
                proposala
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 font-mono font-bold uppercase">
                /{activeNav}
              </span>
            </Link>
            {mobileMenuOpen && (
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden text-slate-500 hover:text-slate-900 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Workspace Selector */}
          <div className="relative font-mono">
            <button
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
              className="w-full flex items-center justify-between p-2 rounded-sm bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs text-left transition-colors cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-900 truncate">{user?.email?.split('@')[0] || "salmanziachattha107"}'s workspace</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 shrink-0 transition-transform" />
            </button>

            {/* Workspace Dropdown Menu */}
            {isWorkspaceOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-sm shadow-xl z-50 p-1 space-y-0.5 font-mono text-xs animate-in fade-in">
                <button
                  onClick={() => { setIsWorkspaceOpen(false); }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-900 hover:bg-slate-100 rounded-sm flex items-center justify-between font-medium cursor-pointer"
                >
                  <span className="truncate">{user?.email?.split('@')[0] || "salmanziachattha107"}'s workspace</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => { setIsWorkspaceOpen(false); navigate('/account'); }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-sm flex items-center gap-1.5 font-semibold cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Workspace Settings</span>
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Navigation Groups */}
          <div className="space-y-4 pt-1 font-mono text-xs">
            
            {/* WORK Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">Work</div>
              
              <button
                onClick={() => {
                  setActiveNav('new');
                  navigate('/proposals/new');
                  setSelectedSampleId(SAMPLE_JOBS[0].id);
                  runAnalysis(SAMPLE_JOBS[0].id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                  activeNav === 'new'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>+ New proposal</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('proposals');
                  navigate('/proposals');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                  activeNav === 'proposals'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Proposals</span>
                <span className="text-[10px] opacity-70">107</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('deal-center');
                  navigate('/deal-center');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                  activeNav === 'deal-center'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Deal Center</span>
                <span className="text-[10px] opacity-70">3</span>
              </button>
            </div>

            {/* LIBRARY Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">Library</div>

              <button
                onClick={() => {
                  setActiveNav('profiles');
                  navigate('/profiles');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                  activeNav === 'profiles'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Profiles</span>
                <span className="text-[10px] opacity-70">1</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('library');
                  navigate('/atoms');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                  activeNav === 'library'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Proposal library</span>
              </button>
            </div>

            {/* INSIGHTS Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">Insights</div>
              <button
                onClick={() => {
                  setActiveNav('dashboard');
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                  activeNav === 'dashboard'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Dashboard</span>
              </button>
            </div>

          </div>

          {/* AI Credits Widget (Matching PDF Screenshots 14-17) */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm space-y-2 font-mono text-[11px] shadow-2xs mt-4">
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-bold text-[10px] uppercase text-slate-500">AI CREDITS</span>
              <span className="font-bold text-slate-900">405.8 / 560</span>
            </div>
            
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[72.4%]" />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>154.2 used</span>
              <span>405.8 expire Aug 22</span>
            </div>
          </div>

        </div>

        {/* Sidebar Bottom Section: Account */}
        <div className="p-3 border-t border-slate-200 bg-white space-y-2 font-mono text-xs">
          <button
            onClick={() => setShowVideoModal(true)}
            className="w-full py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-sm font-semibold flex items-center justify-center gap-1.5 text-xs cursor-pointer transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
            <span>Watch demo video</span>
          </button>

          <div
            onClick={() => { setActiveNav('account'); navigate('/account'); }}
            className="flex items-center justify-between p-2 rounded-sm bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-sm bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                TK
              </div>
              <div className="truncate text-left">
                <div className="text-xs font-bold text-slate-900 truncate">Tahir Khan</div>
                <div className="text-[10px] text-slate-500 truncate">{user?.email || 'salmanziachattha107@gmail.com'}</div>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                logout();
                navigate('/login');
              }}
              title="Sign out"
              className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer shrink-0 ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ========================================== */}
      {/* 2. MAIN CONTENT AREA (Scrollable panel)    */}
      {/* ========================================== */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-slate-50">
        
        {/* Proposala Terminal Top Header Bar - Plane Glass Bar Header */}
        <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md border-b border-slate-200/50 px-4 sm:px-6 py-2.5 flex items-center justify-between text-slate-900 shrink-0 font-sans text-xs shadow-xs transition-all">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-200/60 text-xs shadow-2xs">
              <span className="text-slate-500 font-medium">{activeWorkspace}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-semibold">Proposala</span>
            </div>
            <span className="text-emerald-700 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              New Proposal
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 font-sans">
            {/* UI Density Controller Pill */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200 font-mono text-[11px]">
              <span className="text-slate-400 px-1 text-[10px] uppercase font-bold">Density:</span>
              <button
                onClick={() => handleDensityChange('compact')}
                className={`px-2 py-0.5 rounded cursor-pointer font-semibold transition-all ${
                  uiDensity === 'compact' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Compact
              </button>
              <button
                onClick={() => handleDensityChange('medium')}
                className={`px-2 py-0.5 rounded cursor-pointer font-semibold transition-all ${
                  uiDensity === 'medium' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => handleDensityChange('standard')}
                className={`px-2 py-0.5 rounded cursor-pointer font-semibold transition-all ${
                  uiDensity === 'standard' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard
              </button>
            </div>

            <span className="bg-white/40 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/50 text-slate-600 font-mono text-[11px]">{utcTime}</span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-semibold font-mono text-[11px]">0 5193071</span>
              <span className="text-emerald-700 border border-emerald-500/20 px-2.5 py-0.5 rounded-full bg-emerald-500/10 font-medium text-[11px]">
                Fit Saved →
              </span>
              <span className="text-slate-500 font-medium text-[11px]">31 Saved</span>
            </div>
          </div>
        </header>

        {/* Offline Banner Alert */}
        {isOfflineMode && (
          <div className="bg-amber-950/70 border-b border-amber-800/50 px-6 py-2 text-xs text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Offline Mode Active:</strong> Running with cached proposal engine and local portfolio database.</span>
            </div>
            <button onClick={() => setIsOfflineMode(false)} className="text-amber-400 underline hover:text-slate-900">
              Reconnect
            </button>
          </div>
        )}

        {/* Dashboard Main Scroll Container - Responsive Density Padding */}
        <main className={`max-w-[1500px] w-full mx-auto transition-all ${
          uiDensity === 'compact'
            ? 'p-3 sm:p-4 space-y-4'
            : uiDensity === 'medium'
            ? 'p-5 sm:p-7 space-y-6'
            : 'p-6 sm:p-8 lg:p-10 space-y-8'
        }`}>
          
          {activeNav === 'dashboard' && (
            <DashboardOverviewView
              onNavigateTab={(tab) => {
                const navKey = tab === 'new-proposal' ? 'new' : tab === 'all-proposals' ? 'proposals' : (tab as any);
                setActiveNav(navKey);
                navigate(tab === 'new-proposal' ? '/proposals/new' : `/${tab}`);
              }}
              userEmail={user?.email || 'salmanziachattha107@gmail.com'}
              userName={user?.name || 'Tahir Khan'}
            />
          )}

          {activeNav === 'proposals' && (
            <ProposalsListView
              onSelectJob={(jobId) => {
                setActiveNav('new');
                navigate('/proposals/new');
              }}
              userName={user?.name || 'Tahir Khan'}
            />
          )}

          {activeNav === 'deal-center' && (
            <DealCenterView
              userName={user?.name || 'Tahir Khan'}
            />
          )}

          {activeNav === 'profiles' && (
            <ProfilesView
              userName={user?.name || 'Tahir Khan'}
              userEmail={user?.email || 'salmanziachattha107@gmail.com'}
            />
          )}

          {activeNav === 'library' && (
            <ProposalLibraryView />
          )}

          {activeNav === 'account' && (
            <AccountSettingsView
              userName={user?.name || 'Tahir Khan'}
              userEmail={user?.email || 'salmanziachattha107@gmail.com'}
              uiDensity={uiDensity}
              onDensityChange={handleDensityChange}
            />
          )}

          {activeNav === 'new' && (
            <React.Fragment>
              {/* PROPOSALA DASHBOARD WORKSPACE SPLIT (INPUTS LEFT, ANALYSIS & DRAFT RIGHT) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
            
            {/* ========================================================= */}
            {/* LEFT COLUMN: FIELD INPUTS (5 COLS)                       */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* FIELD 01: YOUR PROFILE */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">field . 01</span>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">YOUR PROFILE</span>
                  </div>
                  <button
                    onClick={openProfilesModal}
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>PICK A SAVED PROFILE -&gt;</span>
                  </button>
                </div>

                <select
                  value={selectedProfile}
                  onChange={(e) => {
                    setSelectedProfile(e.target.value);
                    addToast(`Selected profile: ${e.target.value}`, 'info');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer font-sans"
                >
                  <option value="Hanif Khan">Hanif Khan — 2D Motion Graphics & Vector Designer | Brand & UI</option>
                  <option value="Abbas">Abbas — Bookkeeper & Accountant | Bank Reconciliation</option>
                  <option value="Ambreen Ali">Ambreen Ali — Certified Bookkeeper & Accountant | QuickBooks</option>
                  <option value="Muhammad Haneef">Muhammad Haneef — Real Estate Bookkeeper</option>
                  <option value="Shehzad Baig">Shehzad Baig — E-commerce Bookkeeper | Amazon & Shopify</option>
                  <option value="Sohail">Sohail — AI Accounting Automation Expert | QuickBooks</option>
                  <option value="Arif Hussain">Arif Hussain — AI Automation | n8n | VAPI | RAG | AI Agents</option>
                  <option value="Hakeem Sardar">Hakeem Sardar — AI Automation Expert | n8n | Make | Zapier</option>
                </select>
              </div>

              {/* FIELD 02: DEPARTMENT */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">field . 02</span>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">DEPARTMENT</span>
                  </div>
                  <button
                    onClick={() => addToast('Department manager open', 'info')}
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>MANAGE -&gt;</span>
                  </button>
                </div>

                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    addToast(`Filter department: ${e.target.value}`, 'info');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer font-sans"
                >
                  <option value="All departments">All departments (no filter)</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="accounting">accounting</option>
                  <option value="animation">animation</option>
                  <option value="engineering">engineering</option>
                  <option value="marketing">marketing</option>
                </select>
              </div>

              {/* FIELD 03: JOB POSTING */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">field . 03</span>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">JOB POSTING</span>
                  </div>
                  <button
                    onClick={() => {
                      const sample = SAMPLE_JOBS[0];
                      setSelectedSampleId(sample.id);
                      setJobInputText(sample.description);
                      addToast('Loaded sample job posting', 'success');
                    }}
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>LOAD SAMPLE -&gt;</span>
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={jobInputText}
                  onChange={(e) => {
                    setJobInputText(e.target.value);
                    if (selectedSampleId !== 'custom') setSelectedSampleId('custom');
                  }}
                  placeholder="Paste the full post - title, body, client stats, budget line..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs p-3 text-slate-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed resize-none"
                />
                
                <div className="text-[10px] text-slate-400 font-mono">
                  {jobInputText.length} chars
                </div>
              </div>

              {/* FIELD 04: ENGLISH LEVEL */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">field . 04</span>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">ENGLISH LEVEL</span>
                  </div>
                  <span className="text-[10px] text-slate-400">applies to every generated candidate</span>
                </div>

                <select
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer font-sans"
                >
                  <option value="Basic (ESL, short sentences)">Basic (ESL, short sentences)</option>
                  <option value="Average (competent non-native)">Average (competent non-native)</option>
                  <option value="Professional (editorial-grade)">Professional (editorial-grade)</option>
                  <option value="Polished (expert native)">Polished (expert native)</option>
                </select>

                <p className="text-[10px] text-emerald-400 font-mono leading-tight pt-1">
                  PLEASE PICK BASIC. Clients can guess AI from too polished English. Simple English sounds like real person. Basic level will give you more replies.
                </p>
              </div>

              {/* FIELD 05: PROPOSAL LENGTH */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">field . 05</span>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">PROPOSAL LENGTH</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Medium - max after scoring</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'SHORT', label: 'SHORT', sub: 'Fast, direct, no padding' },
                    { id: 'MEDIUM', label: 'MEDIUM', sub: 'Reply-focused default' },
                    { id: 'DETAILED', label: 'DETAILED', sub: 'Full proof and nuance' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProposalLength(item.id as any)}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                        proposalLength === item.id
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono">{item.label}</div>
                      <div className="text-[9px] opacity-75 leading-tight mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FIELD 06: MODEL */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">field . 06</span>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">MODEL</span>
                  </div>
                  <span className="text-[10px] text-slate-400">DEFAULTS -&gt;</span>
                </div>

                <select
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer font-sans"
                >
                  <option value="Claude Sonnet 4.6">Claude Sonnet 4.6</option>
                  <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
                  <option value="GPT-4o">GPT-4o</option>
                </select>

                <p className="text-[10px] text-slate-400">
                  Used for extraction, generation, rewrites, and application answers on this run.
                </p>
              </div>

              {/* ACTION BUTTON: EXTRACT & SCORE */}
              <button
                onClick={() => runAnalysis()}
                disabled={isAnalyzing}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-3.5 px-4 rounded-xl text-sm font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Analyzing & Scoring Fit...</span>
                  </>
                ) : (
                  <>
                    <span className="bg-black/20 text-black text-[10px] px-1.5 py-0.5 rounded font-bold">RUN</span>
                    <span>Extract & score</span>
                  </>
                )}
              </button>

            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: FIT EVALUATION, PROOFS & DRAFT (7 COLS)    */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* FIT SCORE BADGE CARD */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-bold uppercase">FIT</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                      Good 82.3 / 100
                    </span>
                    <span className="text-[11px] text-slate-500">Full 40-minute process.</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowScoreModal(true)}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>REASONING -&gt;</span>
                </button>
              </div>

              {/* PROOF TO USE SECTION */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">Proof to use</span>
                    <span className="text-slate-400 ml-2">5/5 selected</span>
                  </div>
                  <button
                    onClick={() => setShowCaseStudyDrawer(true)}
                    className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
                  >
                    <span>In. Browse Library -&gt;</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-500">
                  Retrieval proof is selected by default. Swap it before generation when another use case fits better.
                </p>

                {/* Case Study Cards */}
                <div className="space-y-2">
                  {portfolioProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold uppercase">
                            CASE STUDY
                          </span>
                          <span className="text-slate-900 font-semibold">{project.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{project.summary}</p>
                      </div>

                      <button
                        onClick={() => handleRemoveProof(project.id)}
                        className="text-slate-400 hover:text-red-400 p-1 cursor-pointer shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SHAPES TO USE SECTION */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-900 font-bold tracking-wider uppercase">Shapes to use</span>
                    <span className="text-slate-400 ml-2">1 variant</span>
                  </div>
                  <span className="text-[10px] text-slate-400">TONE: NEUTRAL ORDER: STANDARD</span>
                </div>

                <p className="text-[11px] text-slate-500">
                  These planned structures will guide the draft variants.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* OPENER */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">OPENER</span>
                    <select
                      value={openerShape}
                      onChange={(e) => setOpenerShape(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer font-sans"
                    >
                      <option value="Dubai scene to mirror pivot">Dubai scene to mirror pivot - Story opener</option>
                      <option value="Blunt claim, no preamble">Blunt claim, no preamble - Direct opener</option>
                      <option value="Clarifer before pitch">Clarifer before pitch - Question opener</option>
                      <option value="Hard credential open">Hard credential open - Credential opener</option>
                    </select>
                  </div>

                  {/* MIDDLE */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">MIDDLE</span>
                    <select
                      value={middleShape}
                      onChange={(e) => setMiddleShape(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer font-sans"
                    >
                      <option value="Week-by-week SOW">Week-by-week SOW - Phased SOW</option>
                      <option value="Do this first">Do this first - First milestone</option>
                      <option value="Flag risk upfront">Flag risk upfront - Risk acknowledgment</option>
                      <option value="Loom walkthrough offer">Loom walkthrough offer</option>
                    </select>
                  </div>

                  {/* CLOSE */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">CLOSE</span>
                    <select
                      value={closeShape}
                      onChange={(e) => setCloseShape(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer font-sans"
                    >
                      <option value="Phased-pricing tease">Phased-pricing tease - Phased-pricing tease close</option>
                      <option value="Direct booking ask">Direct booking ask - Direct ask close</option>
                      <option value="Soft clarifying close">Soft clarifying close - Question close</option>
                      <option value="Urgent but not pushy">Urgent but not pushy - Availability close</option>
                    </select>
                  </div>
                </div>

                {/* GENERATE DRAFT BUTTON */}
                <button
                  onClick={handleGenerateDraft}
                  disabled={isGeneratingDraft}
                  className="w-full bg-white hover:bg-gray-100 text-black py-3 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 transition-all mt-2"
                >
                  {isGeneratingDraft ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Synthesizing Draft...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-black fill-black" />
                      <span>Generate draft</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. DRAFT EDITOR (FINAL STATE OUTPUT PANEL)                */}
          {/* ========================================================= */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xl">
            
            {/* Header, Draft Tabs, and Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
              
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Proposal Draft & Rich Editor</span>
                </h3>
                <p className="text-xs text-slate-500">
                  AI-synthesized human-tone proposal based on your selected shapes, profile, and case study proofs.
                </p>
              </div>

              {/* Draft Style Tab Switcher */}
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
                {(['Direct & Short', 'Value Focused', 'Detailed'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => handleTabChange(style)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      draftStyle === style
                        ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
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
                  className="bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-2 font-mono font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
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
                  className="bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-slate-900 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-900" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>

              </div>

            </div>

            {/* Inline AI Quick Actions Bar */}
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI QUICK REFINE:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => handleAIRefine('shorter')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Make Shorter</span>
                </button>

                <button
                  onClick={() => handleAIRefine('professional')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  <span>More Professional</span>
                </button>

                <button
                  onClick={() => handleAIRefine('pastwork')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Emphasize Past Work</span>
                </button>

                <button
                  onClick={() => handleAIRefine('question')}
                  disabled={isRefiningAI}
                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <HelpCircle className="w-3 h-3 text-purple-400" />
                  <span>Add Closing Question</span>
                </button>
              </div>
            </div>

            {/* Minimalist Rich Editor */}
            <div className="space-y-2 relative">
              {isRefiningAI && (
                <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-xs rounded-lg z-10 flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Refining draft tone with Gemini...</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono px-1">
                <span>FORMATTED PROPOSAL CONTENT</span>
                <span className="text-slate-700 font-semibold">
                  {wordCount} words • {charCount} characters • ~{readingTimeSec}s read time
                </span>
              </div>

              <textarea
                rows={10}
                value={editedProposalText}
                onChange={(e) => setEditedProposalText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm p-4 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed transition-all resize-none shadow-inner"
              />
            </div>

            {/* Bottom Status Tip */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-1 gap-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Zero AI fluff phrases detected (No "Dear Hiring Manager", "I am a passionate...")</span>
              </div>

              <div className="text-slate-400 text-[11px]">
                Ready to submit on Upwork proposal page
              </div>
            </div>

          </section>
            </React.Fragment>
          )}

        </main>

      </div>

      {/* Video Demo Modal */}
      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />

      {/* ========================================== */}
      {/* 3. SCORE BREAKDOWN MODAL                   */}
      {/* ========================================== */}
      {showScoreModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <span>Granular Score & Fit Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Detailed evaluation across the 5 core proposal winning vectors.
                </p>
              </div>
              <button onClick={() => setShowScoreModal(false)} className="text-slate-500 hover:text-slate-900 p-1">
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
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Budget Fit & Rate Alignment</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{radarScores.budget}/100</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Client posted budget ($1,500 - $3,000) aligns cleanly with target developer rates ($60-$90/hr). Low price negotiation risk.
                </p>
              </div>

              {/* 2. Skill Match */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Skill Stack Compatibility</span>
                  </span>
                  <span className="font-mono text-blue-400 font-bold">{radarScores.skills}/100</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Required technologies (React 18, TypeScript, Tailwind, Node.js) match 100% of your primary technical profile.
                </p>
              </div>

              {/* 3. Client History */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Client Hiring History & Payment Verification</span>
                  </span>
                  <span className="font-mono text-purple-400 font-bold">{radarScores.clientHistory}/100</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Verified payment method with $85,000+ total spent across 24 hires. Average rating: 5.0 stars. Fast response window.
                </p>
              </div>

              {/* 4. Competition Density */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Competition Density</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{radarScores.competition}/100</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  15-20 proposals submitted. Applying within the first 2 hours yields 4.2x higher client view rate.
                </p>
              </div>

              {/* 5. Risk Audit */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Low Risk Assessment</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{radarScores.risk}/100</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Zero red flags detected in job text. Scope is well-defined with measurable milestone deliverables.
                </p>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowScoreModal(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-semibold text-xs transition-colors"
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
          <div className="w-full max-w-md bg-white border-l border-slate-200 h-full p-6 flex flex-col justify-between space-y-4 animate-in slide-in-from-right duration-200 overflow-y-auto">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>Select Case Study</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pick a project from your portfolio bank to quote in this proposal.
                  </p>
                </div>
                <button onClick={() => setShowCaseStudyDrawer(false)} className="text-slate-500 hover:text-slate-900 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={caseStudySearch}
                  onChange={(e) => setCaseStudySearch(e.target.value)}
                  placeholder="Filter case studies by tech or industry..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs pl-9 pr-3 py-2.5 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
                          : 'bg-slate-50 border-slate-200 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm truncate max-w-[220px]">{project.title}</span>
                        {selectedPortfolioId === project.id && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
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

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowNewPortfolioModal(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
          <div className="w-full max-w-2xl bg-white border-l border-slate-200 h-full p-6 flex flex-col justify-between space-y-4 animate-in slide-in-from-right duration-200 overflow-y-auto">
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-400" />
                    <span>Proposals History & Data Table</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Search, filter, export, or reload past proposal drafts.
                  </p>
                </div>
                <button onClick={() => setShowHistoryModal(false)} className="text-slate-500 hover:text-slate-900 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & Filter Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                
                {/* Search Bar */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={historySearchQuery}
                    onChange={(e) => setHistorySearchQuery(e.target.value)}
                    placeholder="Search by job title or client name..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs pl-9 pr-3 py-2.5 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Filter Tab Switcher */}
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shrink-0 w-full sm:w-auto">
                  {(['All', 'In Progress', 'Won', 'Archived'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setHistoryFilterTab(tab)}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                        historyFilterTab === tab
                          ? 'bg-emerald-600 text-slate-900 font-semibold'
                          : 'text-slate-500 hover:text-slate-900'
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
                      className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-50 border border-slate-200 text-slate-900 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-emerald-400" />
                      <span>JSON</span>
                    </button>

                    <button
                      onClick={handleExportCSV}
                      className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-50 border border-slate-200 text-slate-900 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
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
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectedHistoryIds.length === filteredHistory.length && filteredHistory.length > 0}
                          onChange={handleSelectAllHistory}
                          className="rounded border-gray-700 text-emerald-500 focus:ring-emerald-500 bg-slate-50"
                        />
                      </th>
                      <th className="p-3">Job Title & Client</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredHistory.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-400 text-xs">
                          No proposals found matching search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredHistory.map((item) => (
                        <tr 
                          key={item.id}
                          className="hover:bg-slate-100/40 transition-colors group cursor-pointer"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={selectedHistoryIds.includes(item.id)}
                              onChange={() => handleToggleHistorySelect(item.id)}
                              className="rounded border-gray-700 text-emerald-500 focus:ring-emerald-500 bg-slate-50"
                            />
                          </td>
                          <td 
                            className="p-3 font-medium text-slate-900 max-w-[200px] truncate"
                            onClick={() => {
                              setSelectedSampleId('custom');
                              setJobInputText(`${item.title}\n\nReopened proposal history draft.`);
                              setShowHistoryModal(false);
                              addToast(`Reopened proposal draft for "${item.title}".`, 'info');
                            }}
                          >
                            <div className="truncate group-hover:text-emerald-300 transition-colors">{item.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono truncate">{item.clientName || 'Upwork Client'}</div>
                          </td>
                          <td className="p-3 font-mono font-bold text-emerald-400">
                            {item.score}/100
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-500">
                            {item.date}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'Won' ? 'bg-purple-950 text-purple-300 border border-purple-800/40' :
                              item.status === 'Replied' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' :
                              item.status === 'Sent' ? 'bg-blue-950 text-blue-300 border border-blue-800/40' :
                              'bg-slate-100 text-slate-700'
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
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold"
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
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span>Add Portfolio Case Study</span>
              </h3>
              <button onClick={() => setShowNewPortfolioModal(false)} className="text-slate-500 hover:text-slate-900 p-1">
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
                <label className="block text-slate-700 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Stripe Payment & Billing Overhaul"
                  value={newProjectForm.title}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. SaaS / FinTech"
                    value={newProjectForm.clientIndustry}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, clientIndustry: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tech Stack (comma separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="React, TypeScript, Node, Stripe"
                    value={newProjectForm.techStackStr}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, techStackStr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Summary *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe what problem you solved for the client..."
                  value={newProjectForm.summary}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Key Metrics / Numbers Achieved</label>
                <input
                  type="text"
                  placeholder="e.g. -74% load latency, +32% conversion boost"
                  value={newProjectForm.metrics}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, metrics: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPortfolioModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-semibold cursor-pointer shadow-md"
                >
                  Save Case Study
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 7. TEAM & PROFILES MODAL (IN-PLACE URL ENHANCED) */}
      {showTeamModal && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeProfilesModal();
          }}
        >
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 max-h-[85vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Profiles & Workspace</h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      URL: ?view=profiles
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">In-place profiles management with active URL sync</p>
                </div>
              </div>
              <button 
                onClick={closeProfilesModal} 
                className="text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close and clean URL"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-Modal Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono shrink-0">
              <button
                onClick={() => setProfilesModalTab("profiles")}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  profilesModalTab === "profiles"
                    ? "bg-slate-100 text-slate-900 shadow-xs border border-slate-300"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Profiles</span>
              </button>
              <button
                onClick={() => setProfilesModalTab("team")}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  profilesModalTab === "team"
                    ? "bg-slate-100 text-slate-900 shadow-xs border border-slate-300"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Team & Roles</span>
              </button>
              <button
                onClick={() => setProfilesModalTab("portfolio")}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  profilesModalTab === "portfolio"
                    ? "bg-slate-100 text-slate-900 shadow-xs border border-slate-300"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Portfolio ({portfolioProjects.length})</span>
              </button>
            </div>

            {/* Modal Body Tab Content */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs font-sans">
              
              {/* TAB 1: ACTIVE TECHNICAL PROFILES */}
              {profilesModalTab === "profiles" && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
                    <span>SELECT ACTIVE PROPOSALA PROFILE</span>
                    <span className="text-emerald-400 font-semibold">{selectedProfile}</span>
                  </div>

                  {[
                    { title: "Senior Fullstack Developer", subtitle: "React 18, Node.js, TypeScript, Cloud Native Architecture", rate: "$65/hr", score: "100% Match" },
                    { title: "Lead AI & LLM Systems Engineer", subtitle: "Gemini 1.5, RAG Architecture, LangChain, Python, Vector DBs", rate: "$85/hr", score: "98% Match" },
                    { title: "Mobile App Specialist (React Native/Flutter)", subtitle: "Cross-platform iOS & Android, Native Bridges, SQLite", rate: "$70/hr", score: "95% Match" },
                    { title: "DevOps & Cloud Architect (GCP / AWS)", subtitle: "Terraform, Docker, Kubernetes, CI/CD, Serverless", rate: "$75/hr", score: "92% Match" },
                    { title: "UI/UX & Frontend Lead", subtitle: "Tailwind CSS, Next.js, Design Systems, Motion, Accessibility", rate: "$60/hr", score: "94% Match" },
                  ].map((prof) => (
                    <div 
                      key={prof.title}
                      onClick={() => {
                        setSelectedProfile(prof.title);
                        addToast(`Switched active profile to: ${prof.title}`, "success");
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selectedProfile === prof.title
                          ? "bg-emerald-950/30 border-emerald-500/60 text-slate-900 shadow-md"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-gray-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span>{prof.title}</span>
                          {selectedProfile === prof.title && (
                            <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-medium border border-emerald-500/40">Active</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{prof.subtitle}</p>
                      </div>

                      <div className="text-right shrink-0 font-mono">
                        <div className="text-emerald-400 font-bold text-xs">{prof.rate}</div>
                        <div className="text-[10px] text-slate-400">{prof.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: TEAM MEMBERS */}
              {profilesModalTab === "team" && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-500 font-mono">TEAM MEMBERS & WORKSPACE ROLES</div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-900 text-emerald-200 font-bold flex items-center justify-center text-xs border border-emerald-700">
                        {user?.name ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : (user?.email ? user.email.substring(0, 2).toUpperCase() : "US")}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{user?.name || (user?.email ? user.email.split("@")[0] : "Workspace Member")}</div>
                        <div className="text-[10px] text-slate-500">{user?.email || "user@company.com"} • Primary Freelancer</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-mono font-semibold">Workspace Owner</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-900 text-blue-200 font-bold flex items-center justify-center text-xs border border-blue-700">
                        SC
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Sarah Chen</div>
                        <div className="text-[10px] text-slate-500">sarah.c@agency.com • Fullstack Specialist</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-semibold">Admin</span>
                  </div>

                  <button
                    onClick={() => {
                      closeProfilesModal();
                      setShowInviteTeamModal(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md mt-2 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Invite New Team Profile</span>
                  </button>
                </div>
              )}

              {/* TAB 3: PORTFOLIO & CASE STUDIES */}
              {profilesModalTab === "portfolio" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>PORTFOLIO & PROOF PROFILES ({portfolioProjects.length})</span>
                    <button
                      onClick={() => {
                        closeProfilesModal();
                        setShowNewPortfolioModal(true);
                      }}
                      className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-sans"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {portfolioProjects.length === 0 ? (
                    <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <FolderGit2 className="w-8 h-8 text-gray-600 mx-auto" />
                      <div className="text-xs text-slate-700 font-semibold">No portfolio projects added yet</div>
                      <p className="text-[11px] text-slate-400">Add case study proofs to attach directly into generated proposals.</p>
                      <button
                        onClick={() => {
                          closeProfilesModal();
                          setShowNewPortfolioModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-900 text-xs font-semibold inline-flex items-center gap-1.5 mt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create First Case Study</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {portfolioProjects.map((proj) => (
                        <div 
                          key={proj.id}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-semibold text-slate-900 text-xs">{proj.title}</div>
                              <div className="text-[10px] text-indigo-300 font-mono">{proj.clientIndustry}</div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">
                              {proj.metrics || "Verified Proof"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-2">{proj.summary}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.techStack.map((tech) => (
                              <span key={tech} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                <span>URL Synced:</span>
                <span className="text-emerald-400 font-semibold">{window.location.search || "?view=profiles"}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  title="Share Profiles details on WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>
                <button
                  onClick={closeProfilesModal}
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 8. INVITE TEAM MEMBER MODAL               */}
      {/* ========================================== */}
      {showInviteTeamModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Invite Team Member</span>
              </h3>
              <button onClick={() => setShowInviteTeamModal(false)} className="text-slate-500 hover:text-slate-900 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteTeamMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@agency.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Role Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
                  className="px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-semibold cursor-pointer shadow-md"
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
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>Workspace Settings</span>
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-500 hover:text-slate-900 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Active Workspace Name</label>
                <input
                  type="text"
                  value={activeWorkspace}
                  onChange={(e) => setActiveWorkspace(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Gemini AI Key Proxy</label>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-emerald-400 font-mono text-[11px]">Server Proxy Active (Encrypted)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Default Proposal Tone</label>
                <select className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500">
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
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 text-xs font-semibold cursor-pointer shadow-md"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

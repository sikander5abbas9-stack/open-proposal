export interface UpworkJob {
  id: string;
  title: string;
  category: string;
  postedTime: string;
  budget: string;
  jobType: 'Fixed-price' | 'Hourly';
  experienceLevel: 'Entry Level' | 'Intermediate' | 'Expert';
  description: string;
  skillsRequired: string[];
  clientInfo: {
    location: string;
    paymentVerified: boolean;
    rating: number;
    totalSpent: string;
    hireRate: string;
    jobsPosted: number;
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  clientIndustry: string;
  summary: string;
  techStack: string[];
  keyOutcome: string;
  metrics: string;
  relevantSkills: string[];
  link?: string;
}

export interface JobAnalysisResult {
  score: number; // 0-100
  matchLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: 'Apply Immediately' | 'Send Quick Pitch' | 'Skip Job (Low ROI)' | 'Recommended: Detailed Proposal';
  connectsCostEstimate: number;
  summary: string;
  clientAnalysis: {
    trustScore: number;
    riskFlags: string[];
    highlights: string[];
  };
  jobScope: {
    perceivedComplexity: 'Low' | 'Medium' | 'High';
    estimatedHours?: string;
    keyProblemToSolve: string;
    extractedRequirements: string[];
  };
  matchedPortfolioIds: string[];
  pastWorkRationales: {
    projectId: string;
    whyItMatches: string;
  }[];
  proposalDraft: {
    hook: string;
    body: string;
    pastWorkReference: string;
    callToAction: string;
    screeningQuestionAnswers?: { question: string; answer: string }[];
  };
}

export interface ProposalOutcome {
  id: string;
  jobTitle: string;
  jobBudget: string;
  score: number;
  dateSent: string;
  status: 'Draft' | 'Viewed' | 'Replied' | 'Won' | 'Rejected';
  notes?: string;
}

export interface DemoRequestForm {
  name: string;
  email: string;
  teamType: 'Freelancer' | 'Agency (2-10)' | 'Agency (10+)';
  niche: string;
  monthlyProposals: string;
  preferredDate: string;
  preferredTime: string;
}

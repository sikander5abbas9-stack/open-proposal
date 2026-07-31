import { UpworkJob } from '../types';

export const SAMPLE_JOBS: UpworkJob[] = [
  {
    id: 'job-1',
    title: 'Senior React & Node.js Developer Needed for SaaS Dashboard Performance Optimization',
    category: 'Full Stack Development',
    postedTime: '15 minutes ago',
    budget: '$3,500 Fixed Price',
    jobType: 'Fixed-price',
    experienceLevel: 'Expert',
    description: `We are looking for an experienced Full Stack React + Node.js engineer to optimize our web application dashboard. Currently, large data charts and dynamic table views are rendering slowly when users switch date ranges or filter metrics.

Key tasks:
- Refactor heavy React components and implement memoization / virtualized lists.
- Optimize Express backend API endpoint queries and implement Redis caching strategy.
- Fix UI flickering and memory leaks during real-time WebSocket state updates.
- Provide clean, documented code and lightweight performance benchmarks.

Must have proven experience with React 18, TypeScript, Tailwind CSS, Express, and high-volume dashboard optimizations. Please attach links to similar dashboards you have optimized or built from scratch.`,
    skillsRequired: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Performance Optimization', 'Express.js', 'Redis'],
    clientInfo: {
      location: 'United States',
      paymentVerified: true,
      rating: 4.9,
      totalSpent: '$120k+ spent',
      hireRate: '88% hire rate',
      jobsPosted: 42,
    },
  },
  {
    id: 'job-2',
    title: 'Figma to Webflow / Tailwind Pixel-Perfect Conversion for AI Marketing Startup',
    category: 'Front-End Web Development',
    postedTime: '1 hour ago',
    budget: '$45 - $65 / hr',
    jobType: 'Hourly',
    experienceLevel: 'Intermediate',
    description: `We have completed our brand redesign in Figma (12 desktop and mobile responsive frames) for our B2B AI software product landing page.

We need a front-end specialist to convert these Figma designs into clean, responsive HTML/Tailwind or Webflow with smooth micro-animations.

Requirements:
- 100% pixel perfect match with Figma design system components.
- Mobile first responsive layouts for desktop, tablet, and mobile.
- Subtle Framer Motion / CSS keyframe transitions on scroll and hover.
- Fast page load performance (Lighthouse score 90+).
- Clean semantic code structure.

Looking for someone who can start immediately and finish within 7 days.`,
    skillsRequired: ['Figma to Webflow', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'HTML5/CSS3', 'JavaScript'],
    clientInfo: {
      location: 'United Kingdom',
      paymentVerified: true,
      rating: 4.8,
      totalSpent: '$45k+ spent',
      hireRate: '75% hire rate',
      jobsPosted: 19,
    },
  },
  {
    id: 'job-3',
    title: 'Need quick script to extract data from 5,000 PDFs into clean CSV file',
    category: 'Data Scraping & Python',
    postedTime: '3 hours ago',
    budget: '$150 Fixed Price',
    jobType: 'Fixed-price',
    experienceLevel: 'Entry Level',
    description: `URGENT: I have a folder of around 5,000 invoice PDFs. I need a python script to extract invoice numbers, date, vendor name, line items, and total amount into a clean CSV spreadsheet.
Must be done today in 4 hours. Cheap price only. Will give 5 stars feedback.`,
    skillsRequired: ['Python', 'Data Extraction', 'PDF Parsing', 'CSV'],
    clientInfo: {
      location: 'India',
      paymentVerified: false,
      rating: 3.2,
      totalSpent: '$50 spent',
      hireRate: '20% hire rate',
      jobsPosted: 5,
    },
  },
  {
    id: 'job-4',
    title: 'AI Integration Specialist: Add Gemini API Chatbot & Document Summarizer to Custom CRM',
    category: 'AI / Machine Learning',
    postedTime: '2 hours ago',
    budget: '$5,000 Fixed Price',
    jobType: 'Fixed-price',
    experienceLevel: 'Expert',
    description: `Our enterprise sales CRM needs an intelligent AI assistant layer. We want to connect the Google Gemini API to analyze customer interaction logs, summarize long meeting transcriptions, and auto-suggest next action steps for account managers.

Key Deliverables:
1. Secure backend API endpoints (Node.js/TypeScript) proxying Gemini 3.6 Flash / Pro models.
2. Contextual document summarizer for uploaded client PDFs/Docs.
3. React slide-over chat drawer for real-time sales query answering.
4. Error handling, rate limiting, and structured JSON parsing for CRM record updates.

We value candidates who understand prompt engineering, AI safety, structured JSON responses, and secure API key management.`,
    skillsRequired: ['Gemini API', 'Node.js', 'React', 'TypeScript', 'AI Agent Development', 'LLM Integration', 'REST API'],
    clientInfo: {
      location: 'Canada',
      paymentVerified: true,
      rating: 5.0,
      totalSpent: '$250k+ spent',
      hireRate: '92% hire rate',
      jobsPosted: 67,
    },
  },
];

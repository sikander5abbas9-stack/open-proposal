import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, Plus, Trash2, ArrowLeft, CheckCircle2, Sparkles, ExternalLink, 
  Tag, Award, Check
} from 'lucide-react';
import { DEFAULT_PORTFOLIO } from '../data/samplePortfolio';
import { PortfolioProject } from '../types';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

export const PortfolioPage: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid || 'mock-uid-ejaz';

  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem('proposala_portfolio');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PORTFOLIO;
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const colRef = collection(db, 'users', userId, 'portfolioProjects');
        const snapshot = await getDocs(colRef);
        if (!snapshot.empty) {
          const fetched: PortfolioProject[] = snapshot.docs.map(d => d.data() as PortfolioProject);
          setProjects(fetched);
        } else {
          // Initialize Firestore with default portfolio if empty
          for (const p of DEFAULT_PORTFOLIO) {
            const docRef = doc(db, 'users', userId, 'portfolioProjects', p.id);
            await setDoc(docRef, { ...p, userId, createdAt: new Date().toISOString() });
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, `users/${userId}/portfolioProjects`);
      }
    };
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [clientIndustry, setClientIndustry] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [techStackInput, setTechStackInput] = useState<string>('');
  const [keyOutcome, setKeyOutcome] = useState<string>('');
  const [metrics, setMetrics] = useState<string>('');
  const [relevantSkillsInput, setRelevantSkillsInput] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [successNotice, setSuccessNotice] = useState<string>('');

  const saveToStorage = async (updatedList: PortfolioProject[], newProj?: PortfolioProject, deletedId?: string) => {
    setProjects(updatedList);
    try {
      localStorage.setItem('proposala_portfolio', JSON.stringify(updatedList));
      if (newProj) {
        const docRef = doc(db, 'users', userId, 'portfolioProjects', newProj.id);
        await setDoc(docRef, { ...newProj, userId, createdAt: new Date().toISOString() });
      }
      if (deletedId) {
        const docRef = doc(db, 'users', userId, 'portfolioProjects', deletedId);
        await deleteDoc(docRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const newProject: PortfolioProject = {
      id: `port-${Date.now()}`,
      title: title.trim(),
      clientIndustry: clientIndustry.trim() || 'Software & Tech',
      summary: summary.trim(),
      techStack: techStackInput ? techStackInput.split(',').map(s => s.trim()) : ['React', 'TypeScript'],
      keyOutcome: keyOutcome.trim() || 'Delivered project on time with high client satisfaction.',
      metrics: metrics.trim() || '100% completion rate',
      relevantSkills: relevantSkillsInput ? relevantSkillsInput.split(',').map(s => s.trim()) : ['Front-End', 'Full Stack'],
      link: link.trim() || undefined,
    };

    const updated = [newProject, ...projects];
    await saveToStorage(updated, newProject);

    // Reset form
    setTitle('');
    setClientIndustry('');
    setSummary('');
    setTechStackInput('');
    setKeyOutcome('');
    setMetrics('');
    setRelevantSkillsInput('');
    setLink('');
    setIsAdding(false);

    setSuccessNotice('New case study saved to Portfolio Bank!');
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  const handleDeleteProject = async (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    await saveToStorage(updated, undefined, id);
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#17140f] py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#17140f] selection:text-[#f7f2e8]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f7f2e8] p-6 rounded-2xl border border-[#ddd2bf] shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#17140f]/70 mb-1">
              <Link to="/" className="hover:text-[#17140f] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Home
              </Link>
              <span>/</span>
              <span className="text-[#17140f] font-bold">Portfolio Bank Manager</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17140f] font-serif tracking-tight flex items-center gap-2">
              <Database className="w-7 h-7 text-[#17140f]" />
              <span>Agency & Freelancer Portfolio Bank</span>
            </h1>
            <p className="text-[#17140f]/80 text-sm mt-1 font-sans">
              Store your best case studies, verified metrics, and tech stacks. Proposala pulls these into proposal drafts automatically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-5 py-2.5 rounded-xl bg-[#17140f] hover:bg-[#27241e] text-[#f7f2e8] font-mono font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#ddd2bf]" />
              <span>{isAdding ? 'Close Form' : 'Add New Case Study'}</span>
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2.5 rounded-xl bg-[#17140f]/5 hover:bg-[#17140f]/10 text-[#17140f] border border-[#ddd2bf] font-mono font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#17140f]" />
              <span>Test with Job Analyzer</span>
            </Link>
          </div>
        </div>

        {successNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-xs">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Add Project Form Drawer */}
        {isAdding && (
          <form onSubmit={handleAddProject} className="bg-[#f7f2e8] p-6 rounded-2xl border border-[#ddd2bf] shadow-sm space-y-4 animate-fade-in">
            <h3 className="text-base font-bold font-serif text-[#17140f] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#17140f]" />
              <span>Add New Case Study to Portfolio Bank</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#17140f] font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Real-Time Analytics Dashboard Performance Overhaul"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ddd2bf] text-[#17140f] text-xs focus:ring-1 focus:ring-[#17140f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#17140f] font-semibold mb-1">Client Industry</label>
                <input
                  type="text"
                  value={clientIndustry}
                  onChange={(e) => setClientIndustry(e.target.value)}
                  placeholder="e.g. SaaS / FinTech"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ddd2bf] text-[#17140f] text-xs focus:ring-1 focus:ring-[#17140f] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#17140f] font-semibold mb-1">Project Summary & Problem Solved *</label>
                <textarea
                  required
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Describe the main bottleneck solved and how you executed it..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ddd2bf] text-[#17140f] text-xs focus:ring-1 focus:ring-[#17140f] focus:outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-[#17140f] font-semibold mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="React, Node.js, TypeScript, Tailwind"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ddd2bf] text-[#17140f] text-xs focus:ring-1 focus:ring-[#17140f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#17140f] font-semibold mb-1">Key Measurable Outcome / Metrics</label>
                <input
                  type="text"
                  value={metrics}
                  onChange={(e) => setMetrics(e.target.value)}
                  placeholder="e.g. 74% faster load time, +32% conversion"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ddd2bf] text-[#17140f] text-xs focus:ring-1 focus:ring-[#17140f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#17140f] font-semibold mb-1">Outcome Rationale Summary</label>
                <input
                  type="text"
                  value={keyOutcome}
                  onChange={(e) => setKeyOutcome(e.target.value)}
                  placeholder="e.g. Reduced initial render latency from 4.2s to 1.1s."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ddd2bf] text-[#17140f] text-xs focus:ring-1 focus:ring-[#17140f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#17140f] font-semibold mb-1">Case Study Link (Optional)</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com/case-study"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#ddd2bf] text-[#17140f] text-xs focus:ring-1 focus:ring-[#17140f] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl bg-[#17140f]/5 hover:bg-[#17140f]/10 text-[#17140f] font-bold text-xs border border-[#ddd2bf] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#17140f] hover:bg-[#27241e] text-[#f7f2e8] font-bold text-xs shadow-md cursor-pointer font-mono"
              >
                Save to Portfolio Bank
              </button>
            </div>
          </form>
        )}

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#f7f2e8] p-6 rounded-2xl border border-[#ddd2bf] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#17140f] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#17140f] text-[#f7f2e8]">
                    {project.clientIndustry}
                  </span>

                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    title="Delete project"
                    className="p-1.5 rounded-lg text-[#17140f]/60 hover:text-red-600 hover:bg-red-100/50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-bold font-serif text-[#17140f]">{project.title}</h3>

                <p className="text-xs text-[#17140f]/80 leading-relaxed font-sans">{project.summary}</p>

                {/* Metrics Highlight pill */}
                {project.metrics && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-medium space-y-1">
                    <span className="font-bold text-emerald-800 flex items-center gap-1 text-[11px] font-mono">
                      <Award className="w-3.5 h-3.5" /> Key Proven Metric:
                    </span>
                    <div>{project.metrics}</div>
                  </div>
                )}

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="text-[11px] font-mono bg-[#17140f]/5 text-[#17140f] border border-[#ddd2bf] px-2.5 py-0.5 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#ddd2bf] flex items-center justify-between text-xs text-[#17140f]/60 font-sans">
                <span>Included in AI job matching</span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17140f] font-semibold font-mono hover:underline flex items-center gap-1"
                  >
                    <span>View Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

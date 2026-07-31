import React, { useState } from 'react';
import { X, FolderGit2, Plus, Trash2, Edit2, Check, ExternalLink, Sparkles } from 'lucide-react';
import { PortfolioProject } from '../types';

interface PortfolioManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioProject[];
  onUpdatePortfolio: (newPortfolio: PortfolioProject[]) => void;
}

export const PortfolioManagerModal: React.FC<PortfolioManagerModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onUpdatePortfolio,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
    title: '',
    clientIndustry: 'SaaS / Web App',
    summary: '',
    techStack: [],
    keyOutcome: '',
    metrics: '',
    relevantSkills: [],
  });
  const [techInput, setTechInput] = useState('');

  if (!isOpen) return null;

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.keyOutcome) return;

    const projectToAdd: PortfolioProject = {
      id: `port-${Date.now()}`,
      title: newProject.title || 'Untitled Case Study',
      clientIndustry: newProject.clientIndustry || 'Software',
      summary: newProject.summary || 'Custom software development case study.',
      techStack: techInput ? techInput.split(',').map(s => s.trim()) : ['React', 'TypeScript', 'Node.js'],
      keyOutcome: newProject.keyOutcome || 'Improved performance and client business outcomes.',
      metrics: newProject.metrics || 'High satisfaction rate',
      relevantSkills: techInput ? techInput.split(',').map(s => s.trim()) : ['Full Stack'],
    };

    onUpdatePortfolio([projectToAdd, ...portfolio]);
    setIsAdding(false);
    setNewProject({
      title: '',
      clientIndustry: 'SaaS / Web App',
      summary: '',
      techStack: [],
      keyOutcome: '',
      metrics: '',
      relevantSkills: [],
    });
    setTechInput('');
  };

  const handleDelete = (id: string) => {
    onUpdatePortfolio(portfolio.filter(p => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Portfolio Bank Manager</h3>
              <p className="text-xs text-slate-400">Manage past work case studies used for AI semantic matching</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Saved Projects ({portfolio.length})
            </span>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? 'Cancel' : 'Add New Project'}</span>
            </button>
          </div>

          {/* Add Project Form */}
          {isAdding && (
            <form onSubmit={handleAddProject} className="p-5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-4 animate-fade-in">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Add New Case Study
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Healthcare Patient Portal Redesign"
                    value={newProject.title}
                    onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Industry / Category</label>
                  <input
                    type="text"
                    placeholder="e.g. SaaS, E-Commerce, AI"
                    value={newProject.clientIndustry}
                    onChange={e => setNewProject({ ...newProject, clientIndustry: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Summary of Problem Solved</label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe what client issue you addressed..."
                  value={newProject.summary}
                  onChange={e => setNewProject({ ...newProject, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Node.js, Redis"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Key Outcome & Proof Metric *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cut load latency by 74%, +32% conversions"
                    value={newProject.keyOutcome}
                    onChange={e => setNewProject({ ...newProject, keyOutcome: e.target.value, metrics: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold"
                >
                  Save to Portfolio Bank
                </button>
              </div>
            </form>
          )}

          {/* List of Projects */}
          <div className="space-y-3">
            {portfolio.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                      {proj.clientIndustry}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{proj.title}</h4>
                  </div>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300">{proj.summary}</p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800/60 text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Metric: {proj.keyOutcome}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

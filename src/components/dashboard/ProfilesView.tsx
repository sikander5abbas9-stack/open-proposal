import React, { useState } from 'react';

interface ProfilesViewProps {
  userName?: string;
  userEmail?: string;
}

export const ProfilesView: React.FC<ProfilesViewProps> = ({
  userName = 'Tahir Khan',
  userEmail = 'salmanziachattha107@gmail.com'
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPersonaModal, setShowEditPersonaModal] = useState(false);

  // Form state
  const [variantName, setVariantName] = useState('DevOps');
  const [headline, setHeadline] = useState('Senior DevOps engineer — 10 years, Kubernetes & Terraform.');
  const [content, setContent] = useState('The body sent to extraction. Paste your CV, Upwork bio, or a hand-crafted pitch.');
  const [skillsStack, setSkillsStack] = useState('React, Postgres, Terraform...');
  const [notes, setNotes] = useState('When to use this variant. Which platforms you\'ve pitched it on.');

  return (
    <div className="space-y-6 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            PROPOSALA · LIBRARY
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight mt-0.5">
            Profiles
          </h1>
          <p className="text-xs text-slate-600 font-sans mt-1">
            Personas group multiple profile variants. Create a persona for each identity you write under (yourself, a teammate) and add variants for the specialisations they pitch — DevOps, Backend, Frontend, etc.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <button
            onClick={() => setShowEditPersonaModal(true)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-sm font-bold cursor-pointer"
          >
            New persona
          </button>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm font-semibold cursor-pointer">
            Export JSON
          </button>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm font-semibold cursor-pointer">
            Import JSON
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 bg-white border border-slate-200 p-3 rounded-sm shadow-2xs">
        <input
          type="text"
          placeholder="Search personas, variants, headlines, skills..."
          className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-sm px-3 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
        />

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded-sm text-slate-900" />
            <span>show archived</span>
          </label>
          <span>1 active variant</span>
        </div>
      </div>

      {/* Personas Card List */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-6 shadow-2xs font-mono">
        
        {/* Persona Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">{userName}</h2>
            <span className="text-xs text-slate-400">1 variant</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold rounded-sm cursor-pointer"
            >
              Add variant
            </button>
            <button
              onClick={() => setShowEditPersonaModal(true)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold rounded-sm cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Variant Item */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-sans">Logo Design and Brand Identity</h3>
            <span className="text-xs font-mono text-slate-400">142x</span>
          </div>

          <div className="text-xs text-slate-600 font-sans">
            Logo Design | Brand Identity Designer | Packaging & Brand Guidelines
          </div>

          <p className="text-xs text-slate-700 font-sans leading-relaxed">
            🚀 Transforming businesses into memorable brands through strategic design and visual storytelling. We help startups, entrepreneurs, and est...
          </p>

          <div className="flex flex-wrap gap-1.5 text-[10px] pt-1">
            {['design', 'Logo Design', 'Brand Identity', 'Branding', 'Brand Guidelines', 'Visual Identity', 'Corporate Branding', '+14'].map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200 flex justify-between">
            <span>used 142x · last today</span>
            <span className="text-emerald-700 font-bold">Active Variant</span>
          </div>
        </div>

      </div>

      {/* Add Variant Modal / Drawer (Screenshot 7 & 8) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full p-6 space-y-6 overflow-y-auto font-mono text-xs shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900">New variant for {userName}</h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">VARIANT NAME *</label>
                <input
                  type="text"
                  value={variantName}
                  onChange={e => setVariantName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">HEADLINE</label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">CONTENT *</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900"
                />
                <div className="text-[10px] text-slate-400">0 chars</div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">TARGET JOB CATEGORIES</label>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['dev', 'design', 'copy', 'strategy', 'admin', 'video', 'data', 'other'].map(cat => (
                    <span key={cat} className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-sm text-slate-700 cursor-pointer hover:bg-slate-200">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">SKILLS / TECH STACK</label>
                <input
                  type="text"
                  value={skillsStack}
                  onChange={e => setSkillsStack(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">NOTES (PRIVATE, NEVER SENT TO AI)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-sm cursor-pointer"
              >
                Create
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Persona Modal (Screenshot 9) */}
      {showEditPersonaModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full p-6 space-y-6 overflow-y-auto font-mono text-xs shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="text-[10px] text-slate-400 uppercase">EDIT PERSONA</div>
                <h2 className="text-xl font-serif font-bold text-slate-900">{userName}</h2>
              </div>
              <button
                onClick={() => setShowEditPersonaModal(false)}
                className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">NAME *</label>
                <input
                  type="text"
                  defaultValue={userName}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Who is this? One or two sentences for your own reference."
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">LINKS</label>
                <button className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-sm cursor-pointer">
                  Add link
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button className="text-red-600 hover:underline text-xs font-semibold cursor-pointer">
                Archive
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditPersonaModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEditPersonaModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-sm cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

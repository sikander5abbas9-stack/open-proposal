import React, { useState } from 'react';

interface ProposalsListViewProps {
  onSelectJob?: (jobId: string) => void;
  userName?: string;
}

export const ProposalsListView: React.FC<ProposalsListViewProps> = ({
  onSelectJob,
  userName = 'Tahir Khan'
}) => {
  const [outcomeFilter, setOutcomeFilter] = useState<'ALL' | 'VIEWED' | 'RESPONSE' | 'REJECTED' | 'WON'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const proposals = [
    {
      id: '29',
      score: 29,
      badge: 'WEAK',
      color: 'bg-red-100 text-red-800 border-red-200',
      title: 'Open job in a new window Live Video Editing for Talks',
      posted: 'Posted 2 weeks ago Worldwide',
      summary: 'Seeking a skilled video editor to enhance live video content in real-time. Responsibilities include adding text overlays, logos, and transitions to create engaging visuals. Must be able to...',
      date: '2026-08-01',
      status: 'Pending',
      model: 'anthropic:claude-sonnet-4-6',
      author: userName,
      profile: 'Logo Design and Brand Identity'
    },
    {
      id: '46',
      score: 46,
      badge: 'MARGINAL',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      title: 'Open job in a new window Custom Lettering Artist Needed for MMA Fighter Brand Identity',
      posted: 'Posted 4 minutes ago Worldwide',
      summary: 'We\'re looking for an experienced lettering artist—not an AI image generator or generic logo designer—to create a timeless identity system for an MMA fighter...',
      date: '2026-08-01',
      status: 'Pending',
      model: 'anthropic:claude-sonnet-4-6',
      author: userName,
      profile: 'Logo Design and Brand Identity'
    },
    {
      id: '52',
      score: 52,
      badge: 'RECENT',
      color: 'bg-slate-200 text-slate-800 border-slate-300',
      title: 'Open job in a new window Brand Identity and Jewelry Design',
      posted: 'Posted 6 minutes ago Worldwide',
      summary: 'I am seeking a professional to help define the brand identity and jewelry shape codes for my jewelry brand. The ideal candidate will have experience in brand consulting and graphic...',
      date: '2026-08-01',
      status: 'Pending',
      model: 'anthropic:claude-sonnet-4-6',
      author: userName,
      profile: 'Logo Design and Brand Identity'
    },
    {
      id: '53',
      score: 53,
      badge: 'RECENT',
      color: 'bg-slate-200 text-slate-800 border-slate-300',
      title: 'Open job in a new window Jewelry Symbol Designer Needed',
      posted: 'Posted 6 minutes ago Worldwide',
      summary: 'I am seeking a talented designer to create an emblem and symbol set for high-end craft jewelry...',
      date: '2026-08-01',
      status: 'Pending',
      model: 'anthropic:claude-sonnet-4-6',
      author: userName,
      profile: 'Logo Design and Brand Identity'
    },
    {
      id: '70',
      score: 70,
      badge: 'GOOD',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      title: 'Open job in a new window Graphic Designer - Logo Work',
      posted: 'Posted 11 minutes ago Worldwide',
      summary: 'I have an existing logo that I need refined and converted to modern vector formats with branding guidelines...',
      date: '2026-08-01',
      status: 'Pending',
      model: 'anthropic:claude-sonnet-4-6',
      author: userName,
      profile: 'Logo Design and Brand Identity'
    },
    {
      id: '67',
      score: 67,
      badge: 'GOOD',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      title: 'Open job in a new window Convert logo',
      posted: 'Posted 19 minutes ago Worldwide',
      summary: 'Attached you find the details. After complete raster to vector conversion, send AI, SVG, and EPS files...',
      date: '2026-08-01',
      status: 'Pending',
      model: 'anthropic:claude-sonnet-4-6',
      author: userName,
      profile: 'Logo Design and Brand Identity'
    }
  ];

  const filteredProposals = proposals.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            PROPOSALA · HISTORY
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight mt-0.5">
            Proposals
          </h1>
          <p className="text-xs text-slate-600 font-sans mt-1">
            Every job worked on in <span className="font-semibold text-slate-900">salmanziachattha107's workspace</span>. Each row opens the full set of generated drafts for that job.
          </p>
        </div>

        <button
          onClick={() => onSelectJob?.('new')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-sm text-xs font-mono font-bold cursor-pointer transition-all self-start sm:self-auto"
        >
          New proposal
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-3 rounded-sm shadow-2xs font-mono text-xs">
        
        {/* Outcome Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-sm border border-slate-200 overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase px-2">OUTCOME</span>
          {(['ALL', 'VIEWED', 'RESPONSE', 'REJECTED', 'WON'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setOutcomeFilter(tab)}
              className={`px-3 py-1 rounded-sm transition-colors cursor-pointer text-[11px] ${
                outcomeFilter === tab ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Select dropdowns */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
          />
        </div>

        <div className="text-[11px] text-slate-400">
          122 jobs · page 1 of 7
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-3 font-mono">
        {filteredProposals.map(p => (
          <div
            key={p.id}
            onClick={() => onSelectJob?.(p.id)}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-sm p-4 sm:p-5 transition-all shadow-2xs cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 group"
          >
            <div className="flex items-start gap-4">
              <div className={`px-2.5 py-1 rounded-sm border font-bold text-xs text-center shrink-0 w-20 ${p.color}`}>
                <div className="text-base font-black">{p.score}</div>
                <div className="text-[9px] uppercase tracking-wider">{p.badge}</div>
              </div>

              <div className="space-y-1.5">
                <div className="font-sans font-bold text-slate-900 text-base group-hover:underline">
                  {p.title}
                </div>
                <div className="text-xs text-slate-500 font-sans">
                  {p.posted} — <span className="text-slate-600">{p.summary}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-3 pt-1">
                  <span>{p.date}</span>
                  <span>·</span>
                  <span className="text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-sm">{p.status}</span>
                  <span>·</span>
                  <span>{p.model}</span>
                  <span>·</span>
                  <span className="text-slate-700 font-semibold">{p.profile}</span>
                  <span>·</span>
                  <span>by {p.author}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right self-end md:self-start">
              <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 underline">
                Open draft →
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

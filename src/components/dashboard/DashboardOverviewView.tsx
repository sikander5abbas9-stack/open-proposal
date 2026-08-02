import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DashboardOverviewProps {
  onNavigateTab?: (tab: string) => void;
  userEmail?: string;
  userName?: string;
}

export const DashboardOverviewView: React.FC<DashboardOverviewProps> = ({
  onNavigateTab,
  userEmail = 'salmanziachattha107@gmail.com',
  userName = 'Tahir Khan'
}) => {
  const [timeFilter, setTimeFilter] = useState<'today' | '7d' | '30d' | 'all'>('30d');

  // Key metric cards row 1
  const metricsRow1 = [
    { label: 'SENT · LAST 30 DAYS', value: '123', subtitle: 'Proposals generated in the last 30 days window' },
    { label: 'VIEWED · LAST 30 DAYS', value: '0', subtitle: '0% of sent' },
    { label: 'RESPONSES · LAST 30 DAYS', value: '0', subtitle: '0% of sent' },
    { label: 'WON · LAST 30 DAYS', value: '0', subtitle: '0% of sent' }
  ];

  // Key metric cards row 2
  const metricsRow2 = [
    { label: 'DRAFTS (ALL TIME)', value: '123', subtitle: '123 in last 30d · 23 in last 7d' },
    { label: 'WIN RATE', value: '—', subtitle: 'No outcomes labeled yet' },
    { label: 'RESPONSE RATE', value: '0%', subtitle: '0 of 123 drafts marked' },
    { label: 'AVG SCORE', value: '64.7', subtitle: '64.7 in last 30d · 27% ≥70' }
  ];

  // Outcome Funnel data
  const outcomeFunnel = [
    { name: 'Pending', count: 123, percentage: 100, color: 'bg-emerald-500' },
    { name: 'Viewed', count: 0, percentage: 0, color: 'bg-slate-300' },
    { name: 'Response', count: 0, percentage: 0, color: 'bg-slate-300' },
    { name: 'Won', count: 0, percentage: 0, color: 'bg-slate-300' },
    { name: 'Rejected', count: 0, percentage: 0, color: 'bg-slate-300' }
  ];

  // Daily volume graph mock bars (last 30 days)
  const dailyVolumeBars = [
    { date: '2026-07-03', count: 2 },
    { date: '2026-07-05', count: 5 },
    { date: '2026-07-08', count: 8 },
    { date: '2026-07-12', count: 14 },
    { date: '2026-07-15', count: 19 },
    { date: '2026-07-17', count: 27 }, // Peak
    { date: '2026-07-20', count: 12 },
    { date: '2026-07-22', count: 15 },
    { date: '2026-07-25', count: 9 },
    { date: '2026-07-28', count: 6 },
    { date: '2026-08-01', count: 6 }
  ];

  // Teammate rows
  const teammateStats = [
    { name: userName, email: userEmail, sent: 123, viewed: 0, response: 0, won: 0, winRate: '—' }
  ];

  // Score Band Distribution (0-100)
  const scoreBands = [
    { band: '0-10', count: 0 },
    { band: '10-20', count: 0 },
    { band: '20-30', count: 1 },
    { band: '30-40', count: 0 },
    { band: '40-50', count: 7 },
    { band: '50-60', count: 20 },
    { band: '60-70', count: 62, highlight: 'blue' },
    { band: '70-80', count: 33, highlight: 'emerald' },
    { band: '80-90', count: 0 },
    { band: '90-100', count: 0 }
  ];

  // Top Proof Items
  const topProofItems = [
    { type: 'OPENING', title: 'Fantech — Technology & Digital Innovation', snippet: 'Our team built a futuristic visual identity for Fantech, a tech company...', count: '0x' },
    { type: 'OPENING', title: 'EverNew Lab — Automotive Protection & Detailing', snippet: 'Our design team created a clean visual identity for EverNew Lab, a high-end...', count: '0x' },
    { type: 'OPENING', title: 'DAVIS — Apparel & Fashion Brand', snippet: 'Our design team created an elegant, high-end visual identity for DAVIS, a modern...', count: '0x' },
    { type: 'OPENING', title: 'CoreX Gym — Fitness & Training Brand', snippet: 'Our design team created an energetic visual identity for CoreX Gym, a...', count: '0x' },
    { type: 'PURSE', title: 'Broken Label — Streetwear Apparel', snippet: 'Our team created an edgy, modern brand identity for Broken Label, an urban...', count: '0x' },
    { type: 'OPENING', title: 'Atlas — Financial Technology Platform', snippet: 'Our team developed a bold visual identity for Atlas, a modern financial technology...', count: '0x' },
    { type: 'OPENING', title: 'MindRay — Software & Tech Branding', snippet: 'Our design team crafted a sleek, modern visual identity for MindRay...', count: '0x' },
    { type: 'OPENING', title: 'Lukas PC Fix — Tech Repair & Custom PC Building', snippet: 'Our design team developed a futuristic visual identity for Lukas PC Fix...', count: '0x' }
  ];

  // Recent Activity Jobs
  const recentActivities = [
    { id: '1', score: 29, badge: 'WEAK', color: 'bg-red-100 text-red-800 border-red-200', title: 'Open job in a new window Live Video Editing for Talks', postDate: 'Posted 2 weeks ago Worldwide', summary: 'Seeking a skilled video editor to enhance live video content in real-time. Responsibilities include adding text overlays, logos, and transitions...', date: '2026-08-01', status: 'pending', author: userName },
    { id: '2', score: 46, badge: 'MARGINAL', color: 'bg-amber-100 text-amber-800 border-amber-200', title: 'Open job in a new window Custom Lettering Artist Needed for MMA Fighter Brand Identity', postDate: 'Posted 4 minutes ago Worldwide', summary: 'We\'re looking for an experienced lettering artist—not an AI image generator or generic logo designer—to create a timeless identity system for an MMA fighter...', date: '2026-08-01', status: 'pending', author: userName },
    { id: '3', score: 52, badge: 'RECENT', color: 'bg-slate-200 text-slate-800 border-slate-300', title: 'Open job in a new window Brand Identity and Jewelry Design', postDate: 'Posted 6 minutes ago Worldwide', summary: 'I am seeking a professional to help define the brand identity and jewelry shape codes for my jewelry brand. The ideal candidate will have experience in brand consulting...', date: '2026-08-01', status: 'pending', author: userName },
    { id: '4', score: 53, badge: 'RECENT', color: 'bg-slate-200 text-slate-800 border-slate-300', title: 'Open job in a new window Jewelry Symbol Designer Needed', postDate: 'Posted 6 minutes ago Worldwide', summary: 'I am seeking a talented designer to create an emblem and symbol set for high-end craft jewelry...', date: '2026-08-01', status: 'pending', author: userName },
    { id: '5', score: 70, badge: 'GOOD', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', title: 'Open job in a new window Graphic Designer - Logo Work', postDate: 'Posted 11 minutes ago Worldwide', summary: 'I have an existing logo that I need refined and converted to modern vector formats with branding guidelines...', date: '2026-08-01', status: 'pending', author: userName },
    { id: '6', score: 67, badge: 'GOOD', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', title: 'Open job in a new window Convert logo', postDate: 'Posted 19 minutes ago Worldwide', summary: 'Attached you find the details. After complete raster to vector conversion, send AI, SVG, and EPS files...', date: '2026-08-01', status: 'pending', author: userName },
    { id: '7', score: 66, badge: 'MARGINAL', color: 'bg-amber-100 text-amber-800 border-amber-200', title: 'Open job in a new window Convert logo (Variant B)', postDate: 'Posted 19 minutes ago Worldwide', summary: 'Attached you find the details. Need fast turnaround on high resolution file vectorization...', date: '2026-08-01', status: 'pending', author: userName },
    { id: '8', score: 71, badge: 'GOOD', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', title: 'Back Brand and Logo Designer for Egyptian Restaurant', postDate: 'Posted 5 minutes ago Worldwide', summary: 'Send a proposal for: 11 Connects Available. We are opening an authentic Egyptian restaurant brand in Dallas...', date: '2026-08-01', status: 'pending', author: userName }
  ];

  return (
    <div className="space-y-8 font-sans text-slate-900 dark:text-slate-100 pb-16">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            PROPOSALA · OWNER VIEW
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Dashboard
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1">
            Workspace health for <span className="font-semibold text-slate-900 dark:text-slate-200">salmanziachattha107's workspace</span>. Activity, outcomes, and library coverage at a glance.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-sm border border-slate-200 dark:border-slate-700 shrink-0 font-mono text-[11px]">
          <button
            onClick={() => setTimeFilter('today')}
            className={`px-3 py-1 rounded-sm transition-colors cursor-pointer ${
              timeFilter === 'today' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            TODAY
          </button>
          <button
            onClick={() => setTimeFilter('7d')}
            className={`px-3 py-1 rounded-sm transition-colors cursor-pointer ${
              timeFilter === '7d' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            LAST 7D
          </button>
          <button
            onClick={() => setTimeFilter('30d')}
            className={`px-3 py-1 rounded-sm transition-colors cursor-pointer ${
              timeFilter === '30d' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            LAST 30D
          </button>
          <button
            onClick={() => setTimeFilter('all')}
            className={`px-3 py-1 rounded-sm transition-colors cursor-pointer ${
              timeFilter === 'all' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ALL PROPOSALS
          </button>
        </div>
      </div>

      {/* Row 1 Metrics (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsRow1.map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-5 space-y-2 shadow-2xs">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {m.label}
            </div>
            <div className="text-3xl font-serif font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {m.value}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {m.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 Metrics (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsRow2.map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-5 space-y-2 shadow-2xs">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {m.label}
            </div>
            <div className="text-3xl font-serif font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {m.value}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              {m.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Outcome Funnel & Daily Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Outcome Funnel (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Outcome funnel</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Where every draft lands today.</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {outcomeFunnel.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{item.name}</span>
                  <span>{item.count} <span className="text-slate-400 dark:text-slate-500 text-[11px]">· {item.percentage}%</span></span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-sm overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono">
            123 drafts total · 100% pending label
          </div>
        </div>

        {/* Daily volume bar chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Daily volume · last 30 days</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">123 drafts · peak 27 on 2026-07-17</p>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="h-44 flex items-end gap-2 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800 px-2">
            {dailyVolumeBars.map((bar, i) => {
              const maxVal = 27;
              const heightPct = Math.max((bar.count / maxVal) * 100, 8);
              const isPeak = bar.count === 27;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-mono px-1.5 py-0.5 rounded-sm whitespace-nowrap z-10 pointer-events-none">
                    {bar.date}: {bar.count}
                  </div>
                  
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-36 flex items-end rounded-sm overflow-hidden">
                    <div
                      className={`w-full transition-all ${isPeak ? 'bg-emerald-600' : 'bg-slate-700 dark:bg-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-slate-200'}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 truncate w-full text-center">
                    {bar.date.substring(8)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
            <span>2026-07-02</span>
            <span>2026-08-01</span>
          </div>
        </div>

      </div>

      {/* Row 4: By Teammate Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs">
        <div>
          <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">By teammate · last 30 days</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Submissions and outcomes per teammate in the selected window.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">TEAMMATE</th>
                <th className="py-2.5 px-3">SENT</th>
                <th className="py-2.5 px-3">VIEWED</th>
                <th className="py-2.5 px-3">RESPONSE</th>
                <th className="py-2.5 px-3">WON</th>
                <th className="py-2.5 px-3 text-right">WIN RATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {teammateStats.map((tm, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-slate-100 font-sans text-xs">{tm.name}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{tm.email}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-900 dark:text-slate-100 font-bold">{tm.sent}</td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{tm.viewed}</td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{tm.response}</td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{tm.won}</td>
                  <td className="py-3 px-3 text-right text-slate-400 dark:text-slate-500">{tm.winRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 5: Score Band Distribution */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-5 shadow-2xs">
        <div>
          <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Score band distribution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            How Layer A is rating the jobs you process. Concentration in 50–70 is healthy; a fat left tail means upstream filtering needs work.
          </p>
        </div>

        {/* Score band bar chart */}
        <div className="h-48 flex items-end gap-2 pt-8 pb-4 border-b border-slate-100 dark:border-slate-800 px-2">
          {scoreBands.map((sb, idx) => {
            const maxVal = 62;
            const heightPct = sb.count > 0 ? Math.max((sb.count / maxVal) * 100, 10) : 4;
            
            let barColor = 'bg-slate-200 dark:bg-slate-700';
            if (sb.highlight === 'blue') barColor = 'bg-sky-500';
            if (sb.highlight === 'emerald') barColor = 'bg-emerald-500';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                  {sb.count}
                </span>
                <div className="w-full bg-slate-50 dark:bg-slate-800 h-32 flex items-end rounded-sm overflow-hidden">
                  <div
                    className={`w-full transition-all ${barColor}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  {sb.band}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 6: Top Creators & Top Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Creators */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Top creators</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Drafts generated by each teammate, with their personal win rate.</p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-sm flex items-center justify-between text-xs font-mono">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 font-sans text-xs">{userName}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{userEmail}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900 dark:text-slate-100">123 drafts</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">no labels · avg 65</div>
            </div>
          </div>
        </div>

        {/* Top Profiles */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Top profiles</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Which profiles get the most use, and which actually convert.</p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-sm flex items-center justify-between text-xs font-mono">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 font-sans text-xs">Logo Design and Brand Identity</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Active variant · 142 atoms linked</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900 dark:text-slate-100">123 drafts</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">no labels · avg 65</div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 7: Top proof, Library health, Model usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Proof */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Top proof</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Most-pulled proof from the library. Stale top entries hint at a need for fresh content.</p>

            <div className="space-y-3 mt-4 text-xs font-mono max-h-72 overflow-y-auto pr-1">
              {topProofItems.map((tp, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm">
                      {tp.type}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{tp.count}</span>
                  </div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] truncate">{tp.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{tp.snippet}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Library Health */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Library health</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Coverage across the seven proof types — gaps surface here.</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center my-4 font-mono border-y border-slate-100 dark:border-slate-800 py-3">
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-slate-100">94</div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">PROOFS</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-slate-100">1</div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">PROFILES</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-slate-100">33</div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">SHAPES</div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Case study</span>
                <span className="font-bold">4</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-sm overflow-hidden mb-2">
                <div className="bg-slate-700 dark:bg-slate-300 h-full w-[15%]" />
              </div>

              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Opening</span>
                <span className="font-bold">85</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-sm overflow-hidden mb-2">
                <div className="bg-slate-900 dark:bg-slate-100 h-full w-[90%]" />
              </div>

              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Metric</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Risk</span>
                <span className="font-bold">1</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Phase</span>
                <span className="font-bold">1</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Pricing</span>
                <span className="font-bold text-slate-400 dark:text-slate-500">0</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Pain ref</span>
                <span className="font-bold text-slate-400 dark:text-slate-500">0</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
            1 teammate · <button onClick={() => onNavigateTab?.('profiles')} className="underline hover:text-slate-900 dark:hover:text-white cursor-pointer">manage team</button>
          </div>
        </div>

        {/* Model Usage */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Model usage</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Generation cost by model. 586.5k tokens consumed.</p>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-sm space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">anthropic:claude-sonnet-4-6</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">123 drafts</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                549.0k in · 37.5k out tokens
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-sm overflow-hidden">
                <div className="bg-emerald-600 h-full w-[94%]" />
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
            Optimized pipeline active
          </div>
        </div>

      </div>

      {/* Row 8: Recent Activity Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 space-y-4 shadow-2xs">
        <div>
          <h3 className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Recent activity</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Last 10 drafts across the workspace.</p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
          {recentActivities.map((act) => (
            <div key={act.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 p-2 rounded-sm transition-colors">
              <div className="flex items-start gap-3">
                <div className={`px-2 py-1 rounded-sm border font-bold text-[10px] text-center shrink-0 w-16 ${act.color}`}>
                  <div>{act.score}</div>
                  <div className="text-[8px] uppercase">{act.badge}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm hover:underline cursor-pointer">
                    {act.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                    {act.postDate} · <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{act.summary}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">
                    {act.date} · <span className="text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1 py-0.2 border border-amber-200 dark:border-amber-800 rounded-sm">{act.status}</span> · {act.author}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <button 
                  onClick={() => onNavigateTab?.('proposals')}
                  className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-sm text-[11px] font-bold cursor-pointer transition-colors"
                >
                  View draft
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

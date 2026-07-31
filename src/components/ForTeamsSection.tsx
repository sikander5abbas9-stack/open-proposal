import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart3, FolderCheck, ShieldAlert, Award, XCircle, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { ProposalOutcome } from '../types';

export const ForTeamsSection: React.FC = () => {
  const [outcomes, setOutcomes] = useState<ProposalOutcome[]>([
    {
      id: 'out-1',
      jobTitle: 'Senior React & Node.js Dashboard Performance Optimization',
      jobBudget: '$3,500',
      score: 94,
      dateSent: 'Today, 10:30 AM',
      status: 'Won',
      notes: 'Client replied in 15 mins directly referencing the FinTech portfolio case study.',
    },
    {
      id: 'out-2',
      jobTitle: 'Figma to Tailwind Conversion for AI Startup Landing Page',
      jobBudget: '$55/hr',
      score: 86,
      dateSent: 'Yesterday',
      status: 'Replied',
      notes: 'Interview scheduled for tomorrow 3 PM.',
    },
    {
      id: 'out-3',
      jobTitle: 'AI Integration Specialist: Gemini API & CRM Assistant',
      jobBudget: '$5,000',
      score: 92,
      dateSent: '3 days ago',
      status: 'Viewed',
      notes: 'Client opened proposal twice.',
    },
    {
      id: 'out-4',
      jobTitle: 'Extract 5,000 PDF invoices to CSV',
      jobBudget: '$150',
      score: 28,
      dateSent: '4 days ago',
      status: 'Rejected',
      notes: 'Skipped job automatically by score rule.',
    },
  ]);

  const updateStatus = (id: string, newStatus: ProposalOutcome['status']) => {
    setOutcomes(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const wonCount = outcomes.filter(o => o.status === 'Won').length;
  const repliedCount = outcomes.filter(o => o.status === 'Replied').length;
  const totalSent = outcomes.length;
  const winRate = totalSent > 0 ? Math.round(((wonCount + repliedCount) / totalSent) * 100) : 0;

  return (
    <section id="for-teams" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Built for Agencies & Freelancer Teams</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            It gets better when your team marks results.
          </h2>
          <p className="text-slate-600 text-base">
            Track which proposal angles win, share top case studies across account managers, and refine job scoring rules over time.
          </p>
        </div>

        {/* 3 Core Team Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Proposal Results Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mark proposals as Viewed, Replied, Won, or Rejected. Proposala learns which past work references yield the highest client reply rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700">
              <FolderCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Shared Past Work Bank</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Keep agency portfolios, department metrics, case studies, and code sample links in one place accessible to all business developers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Admin Control & Risk Filters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Set team-wide minimum budget thresholds, client rating rules, and connect expenditure limits to eliminate wasteful bidding.
            </p>
          </div>

        </div>

        {/* Interactive Live Team Dashboard Mockup */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-6 shadow-xs">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Interactive Agency Feedback Loop</span>
              <h3 className="text-lg font-bold text-slate-900">Recent Team Proposals & Outcome Tracker</h3>
            </div>
            
            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500">Response & Win Rate</div>
                <div className="text-sm font-extrabold text-emerald-700 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> {winRate}% positive
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500">Contracts Won</div>
                <div className="text-sm font-extrabold text-teal-700">{wonCount} won</div>
              </div>
            </div>
          </div>

          {/* Table of proposal outcomes */}
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Job Title & Budget</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Outcome Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {outcomes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-slate-900 line-clamp-1">{item.jobTitle}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.jobBudget}</div>
                    </td>
                    <td className="p-3">
                      <span className={`font-bold px-2 py-0.5 rounded ${
                        item.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.score}/100
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px] whitespace-nowrap">{item.dateSent}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        item.status === 'Won' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        item.status === 'Replied' ? 'bg-teal-100 text-teal-800 border border-teal-200' :
                        item.status === 'Viewed' ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status === 'Won' && <Award className="w-3 h-3" />}
                        {item.status === 'Replied' && <MessageSquare className="w-3 h-3" />}
                        {item.status === 'Viewed' && <Eye className="w-3 h-3" />}
                        {item.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value as ProposalOutcome['status'])}
                        className="bg-white border border-slate-300 text-[11px] text-slate-800 rounded px-2 py-1 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Viewed">Viewed</option>
                        <option value="Replied">Replied</option>
                        <option value="Won">Won 🎉</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200 text-xs">
            <span className="text-slate-500">
              💡 Proposala automatically correlates won proposals with matching portfolio projects to improve future AI scores.
            </span>
            <Link
              to="/demo"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shrink-0 shadow-sm"
            >
              Request Agency Access
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

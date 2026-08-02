import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, FolderGit2, Play, Calendar, Home, Menu, X, ShieldCheck, 
  Zap, ChevronRight, HelpCircle, ArrowRight, CheckCircle2, Sliders, ExternalLink
} from 'lucide-react';

export const AppWorkspaceLayout: React.FC = () => {
  const location = useLocation();

  const isAnalyzer = location.pathname.startsWith('/analyzer');

  if (isAnalyzer) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col md:flex-row selection:bg-indigo-600 selection:text-white">
      {/* Mobile Top App Bar */}
      <div className="md:hidden bg-white text-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900">Proposala</div>
            <div className="text-[10px] text-slate-500 font-mono">Workspace App</div>
          </div>
        </Link>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

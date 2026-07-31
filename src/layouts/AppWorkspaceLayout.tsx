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
    <div className="min-h-screen bg-[#f7f2e8] text-[#17140f] font-sans antialiased flex flex-col md:flex-row selection:bg-[#17140f] selection:text-[#f7f2e8]">
      {/* Mobile Top App Bar */}
      <div className="md:hidden bg-[#f7f2e8] text-[#17140f] px-4 py-3 flex items-center justify-between border-b border-[#ddd2bf] sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#17140f] flex items-center justify-center text-[#f7f2e8] font-bold">
            <Sparkles className="w-4 h-4 text-[#f7f2e8]" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight font-serif text-[#17140f]">Proposala</div>
            <div className="text-[10px] text-[#17140f]/70 font-mono">Workspace App</div>
          </div>
        </Link>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

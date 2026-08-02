import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowLeft, Sparkles, CheckCircle2, Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { VideoModal } from '../components/VideoModal';

export const VideoDemoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <Link to="/" className="hover:text-emerald-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">Product Video Demo</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Play className="w-7 h-7 text-emerald-600 fill-emerald-600" />
            <span>Proposala Product Walkthrough</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Watch how to analyze an Upwork job post, screen client risks, match portfolio case studies, and generate proposal drafts in 60 seconds.
          </p>
        </div>

        {/* Video Player Box / Pop-up Trigger */}
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div 
            onClick={() => setIsModalOpen(true)}
            className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-lg cursor-pointer group flex items-center justify-center"
          >
            <iframe
              title="Proposala Demo Video"
              src="https://player.vimeo.com/video/76979871?title=0&byline=0&portrait=0"
              className="w-full h-full border-0 pointer-events-none"
              allow="autoplay; fullscreen; picture-in-picture"
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all flex flex-col items-center justify-center gap-2 text-white">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
              </div>
              <span className="text-xs font-bold font-mono px-3 py-1 bg-slate-900/90 rounded border border-slate-700 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> Click to Expand in Popup Modal
              </span>
            </div>
          </div>

          {/* Timestamps & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-600" /> 00:00 - 00:25
              </span>
              <p className="text-slate-600 dark:text-slate-400">Pasting an Upwork job & screening client risk factors.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 00:25 - 00:45
              </span>
              <p className="text-slate-600 dark:text-slate-400">Semantic portfolio matching: selecting past case studies with metrics.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 00:45 - 01:20
              </span>
              <p className="text-slate-600 dark:text-slate-400">Generating problem-first hook draft and copying directly to Upwork.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">Ready to test this with your own Upwork jobs?</span>
            <Link
              to="/analyzer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try Live Job Analyzer Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Pop-up Video Modal */}
        <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      </div>
    </div>
  );
};


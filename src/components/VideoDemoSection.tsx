import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const VideoDemoSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-slate-900 text-white text-xs font-semibold shadow-xs">
            <span>Live Product Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight font-serif">
            See how Proposala analyzes an Upwork post in 45 seconds
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Watch a real job post parsed live: score client risk, match portfolio case studies, and generate a high-converting draft.
          </p>
        </div>

        {/* Video Player Thumbnail Box - Clicking opens Popup Modal */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="relative max-w-3xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl cursor-pointer group"
        >
          <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60 opacity-90" />
            
            {/* Fake UI Background Elements */}
            <div className="absolute inset-0 p-6 opacity-25 pointer-events-none flex flex-col justify-between font-mono text-xs text-emerald-400">
              <div className="flex justify-between border-b border-emerald-500/30 pb-3">
                <span>Proposala_Engine_v2.4.1</span>
                <span>[Click to Launch Popup]</span>
              </div>
              <div className="grid grid-cols-3 gap-4 my-auto text-slate-300">
                <div className="p-3 bg-slate-800 rounded border border-slate-700">Client Score: 94/100</div>
                <div className="p-3 bg-slate-800 rounded border border-slate-700">Risk: Low (Verified)</div>
                <div className="p-3 bg-slate-800 rounded border border-slate-700">Matched 2 Case Studies</div>
              </div>
              <div className="flex justify-between border-t border-emerald-500/30 pt-3 text-slate-400">
                <span>Target: React SaaS Dashboard Optimization</span>
                <span>Duration: 00:45</span>
              </div>
            </div>

            {/* Center Play Button & Callout */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
              </div>
              <div className="text-center space-y-1">
                <span className="text-white text-sm font-bold tracking-wide block">
                  Watch 45-Second Walkthrough (Popup Demo)
                </span>
                <span className="text-xs text-slate-400 block">
                  Click to open video demo in pop-up modal
                </span>
              </div>
            </div>

            {/* Bottom Badge Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 hidden sm:flex items-center justify-between text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 font-medium">
                <span>Connect Protection Engine in action</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                <span>✓ 0-100 Score</span>
                <span>✓ Portfolio Match</span>
                <span>✓ Instant Draft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Pop-up Modal */}
        <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      </div>
    </section>
  );
};

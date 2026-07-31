import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const VideoDemoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-[#FAF9F5] border-b border-[#EAE6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Product Tour</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1C1A17] tracking-tight font-serif">
            See how Proposala analyzes an Upwork post in 45 seconds
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Watch a real job post parsed live: score client risk, match portfolio case studies, and generate a high-converting draft.
          </p>
        </div>

        {/* Video Player Box / Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E0DACF] bg-slate-900 shadow-2xl group">
          {!isPlaying ? (
            <div
              onClick={() => setIsPlaying(true)}
              className="relative aspect-video w-full bg-slate-950 flex items-center justify-center cursor-pointer group"
            >
              {/* Background Mockup Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60 opacity-90" />
              
              {/* Fake UI Background Elements */}
              <div className="absolute inset-0 p-8 opacity-20 pointer-events-none flex flex-col justify-between font-mono text-xs text-emerald-400">
                <div className="flex justify-between border-b border-emerald-500/30 pb-4">
                  <span>Proposala_Engine_v2.4.1</span>
                  <span>[Live Stream Preview]</span>
                </div>
                <div className="grid grid-cols-3 gap-6 my-auto text-slate-300">
                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">Client Score: 94/100</div>
                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">Risk: Low (Verified)</div>
                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">Matched 2 Case Studies</div>
                </div>
                <div className="flex justify-between border-t border-emerald-500/30 pt-4 text-slate-400">
                  <span>Target: React SaaS Dashboard Optimization</span>
                  <span>Duration: 00:45</span>
                </div>
              </div>

              {/* Center Play Button & Callout */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 transform group-hover:scale-110 transition-all duration-300">
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-white text-base font-bold font-serif tracking-wide block">
                    Watch 45-Second Walkthrough
                  </span>
                  <span className="text-xs text-slate-400 font-sans block">
                    Click to play interactive video demonstration
                  </span>
                </div>
              </div>

              {/* Bottom Badge Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-10 hidden sm:flex items-center justify-between text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Connect Protection Engine in action</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 0-100 Score</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Portfolio Match</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Draft</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
              {/* Simulated HTML5 Video Player */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Proposala Product Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

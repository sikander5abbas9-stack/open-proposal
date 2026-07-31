import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowLeft, Sparkles, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export const VideoDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <Link to="/" className="hover:text-emerald-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">2-Minute Video Demo</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Play className="w-7 h-7 text-emerald-600 fill-emerald-600" />
            <span>Proposala Product Walkthrough</span>
          </h1>

          <p className="text-slate-600 text-sm">
            Watch how to analyze an Upwork job post, screen client risks, match portfolio case studies, and generate proposal drafts in 60 seconds.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
            <iframe
              title="Proposala Demo Video"
              src="https://player.vimeo.com/video/76979871?title=0&byline=0&portrait=0"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Timestamps & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-600" /> 00:00 - 00:25
              </span>
              <p className="text-slate-600">Pasting an Upwork job & screening client risk factors (unverified payment, low spend history).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 00:25 - 00:45
              </span>
              <p className="text-slate-600">Semantic portfolio matching: automatically selecting past case studies with metrics (+32% conversion).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 00:45 - 01:20
              </span>
              <p className="text-slate-600">Generating the problem-first non-AI hook draft and copying directly into Upwork.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Ready to test this with your own Upwork jobs?</span>
            <Link
              to="/analyzer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try Live Job Analyzer Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

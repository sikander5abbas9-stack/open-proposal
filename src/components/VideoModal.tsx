import React from 'react';
import { X, Play, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            <span className="text-sm font-bold text-white">Proposala Product Walkthrough (2 Min Demo)</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://player.vimeo.com/video/76979871?h=8272103f6e&autoplay=1&title=0&byline=0&portrait=0"
            title="Proposala Demo Video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-4 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Learn how to parse Upwork job descriptions & match past portfolio metrics in 60s</span>
          <button onClick={onClose} className="text-emerald-400 font-semibold hover:underline">
            Close Video
          </button>
        </div>

      </div>
    </div>
  );
};

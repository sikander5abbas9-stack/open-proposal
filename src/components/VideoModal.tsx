import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            <span className="text-xs font-bold text-white font-mono">Proposala Product Walkthrough (Demo Pop-up)</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer transition-colors"
            title="Close Pop-up"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame - Compact aspect ratio pop-up */}
        <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
          <iframe
            className="w-full h-full border-0"
            src="https://player.vimeo.com/video/76979871?h=8272103f6e&autoplay=1&title=0&byline=0&portrait=0"
            title="Proposala Demo Video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span className="truncate mr-2">Learn how to parse Upwork job descriptions & match portfolio metrics</span>
          <button onClick={onClose} className="text-emerald-400 text-xs font-semibold hover:underline cursor-pointer shrink-0">
            Close Pop-up
          </button>
        </div>

      </div>
    </div>
  );
};


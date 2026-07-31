import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | 'refund' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const title = type === 'terms' ? 'Terms of Service' : type === 'privacy' ? 'Privacy Policy' : 'Refund Policy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white font-display">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Text */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
          {type === 'terms' && (
            <>
              <p className="font-semibold text-white">Last updated: July 2026</p>
              <p>Welcome to Proposala, provided by uConnect Technologies PVT LTD ("we", "us", "our"). By accessing or using our platform, you agree to be bound by these Terms of Service.</p>
              <h4 className="font-bold text-slate-200 text-sm">1. Acceptable Use</h4>
              <p>Proposala is designed to analyze publicly available Upwork job postings and assist freelancers in organizing past portfolio metrics and drafting customized proposals. Users remain solely responsible for the content submitted on Upwork.</p>
              <h4 className="font-bold text-slate-200 text-sm">2. Account Security & Data Privacy</h4>
              <p>You agree to maintain the security of your account credentials. We do not store full client passwords or unencrypted OAuth tokens.</p>
              <h4 className="font-bold text-slate-200 text-sm">3. Intellectual Property</h4>
              <p>All software code, user interface designs, and algorithms associated with Proposala remain the property of uConnect Technologies PVT LTD.</p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p className="font-semibold text-white">Last updated: July 2026</p>
              <p>At Proposala (uConnect Technologies PVT LTD), we respect your data privacy.</p>
              <h4 className="font-bold text-slate-200 text-sm">1. Information We Collect</h4>
              <p>We collect account email addresses, team workspace names, and user-provided portfolio case studies to facilitate job matching.</p>
              <h4 className="font-bold text-slate-200 text-sm">2. How We Use Data</h4>
              <p>Your portfolio case studies are strictly used to perform semantic matching for your team's proposals. We never sell or share your proprietary portfolio data with third parties or external advertising networks.</p>
            </>
          )}

          {type === 'refund' && (
            <>
              <p className="font-semibold text-white">Last updated: July 2026</p>
              <h4 className="font-bold text-slate-200 text-sm">14-Day Money Back Guarantee</h4>
              <p>If you are not 100% satisfied with Proposala within your first 14 days of subscription, contact our support team at support@proposala.com for a full, hassle-free refund.</p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

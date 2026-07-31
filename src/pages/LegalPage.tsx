import React from 'react';
import { useLocation } from 'react-router-dom';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let activeTab: 'terms' | 'privacy' | 'refund' = 'terms';
  if (path.includes('privacy')) activeTab = 'privacy';
  else if (path.includes('refund')) activeTab = 'refund';

  return (
    <div className="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
      
      {activeTab === 'terms' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Block */}
          <div className="border-b border-gray-200 pb-5 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#1C1A17] font-serif tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-gray-500 font-sans">
              Last Updated: January 15, 2026
            </p>
          </div>

          {/* Content Body */}
          <div className="space-y-6 text-gray-700 font-sans text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">1. Acceptance of Terms</h2>
              <p>
                By registering, accessing, or using Open Proposal ("the Service"), operated by uConnect Technologies PVT LTD, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use the application.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">2. Description of Service</h2>
              <p>
                Open Proposal provides AI-assisted Upwork job post scoring, client risk analysis, past work portfolio matching, and custom proposal draft generation for freelancers, independent contractors, and agencies. Open Proposal is an independent software product and is not affiliated with, endorsed by, or sponsored by Upwork Inc.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">3. User Responsibilities & Conduct</h2>
              <p>
                You are strictly responsible for reviewing, modifying, and editing all generated proposal drafts prior to submitting them to prospective clients or job boards. You agree not to use Open Proposal to send automated spam, misleading proposals, or violate Upwork Terms of Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">4. Accounts and Billing</h2>
              <p>
                To access premium proposal scoring features, you must maintain an active subscription or usage quota. Subscription billing automatically recurs until cancelled. You may cancel your subscription at any time via your account settings.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">5. Limitation of Liability</h2>
              <p>
                Open Proposal is provided on an "as is" and "as available" basis without warranties of any kind. Open Proposal does not guarantee job acquisition, client interviews, or specific financial earnings on Upwork or any third-party platform.
              </p>
            </section>
          </div>

        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Block */}
          <div className="border-b border-gray-200 pb-5 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#1C1A17] font-serif tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 font-sans">
              Last Updated: January 15, 2026
            </p>
          </div>

          {/* Content Body */}
          <div className="space-y-6 text-gray-700 font-sans text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">1. Information We Collect</h2>
              <p>
                We collect account details (such as your name and email address) and user-provided portfolio case studies, metrics, and past project details to enable automated past work matching.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">2. How Your Information is Used</h2>
              <p>
                Your saved portfolio case studies are processed solely to match your past work against analyzed Upwork job posts and generate custom proposal drafts for your explicit account. We do not sell your data or portfolio snippets to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">3. Security & AI Processing</h2>
              <p>
                Job analysis and proposal generation requests process job descriptions securely via API endpoints. No private financial keys or account credentials are stored in clear text or exposed to client-side code.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">4. Your Data Rights</h2>
              <p>
                You have the right to request access to, correction of, or permanent deletion of your portfolio items and account data at any time by contacting our support team at support@openproposal.com.
              </p>
            </section>
          </div>

        </div>
      )}

      {activeTab === 'refund' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Block */}
          <div className="border-b border-gray-200 pb-5 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#1C1A17] font-serif tracking-tight">
              Refund Policy
            </h1>
            <p className="text-xs text-gray-500 font-sans">
              Last Updated: January 15, 2026
            </p>
          </div>

          {/* Content Body */}
          <div className="space-y-6 text-gray-700 font-sans text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">1. 30-Day Money-Back Guarantee</h2>
              <p>
                We offer a full 30-day money-back guarantee for all new Open Proposal subscription plans. If Open Proposal does not help you save connects or improve your proposal workflow, simply email us within 30 days of purchase for a 100% full refund.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">2. How to Request a Refund</h2>
              <p>
                To initiate a refund, please send an email to <strong className="text-black font-semibold">support@openproposal.com</strong> with your account email and transaction ID. Refund requests are processed within 2–3 business days back to your original payment method.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 font-serif">3. Exceptions & Renewals</h2>
              <p>
                Refunds apply to initial subscription purchases. Recurring monthly renewals must be cancelled prior to the renewal date; however, if you forget to cancel, reach out within 48 hours of renewal for assistance.
              </p>
            </section>
          </div>

        </div>
      )}

    </div>
  );
};

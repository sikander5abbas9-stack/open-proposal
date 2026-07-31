import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, MessageSquare, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    upworkUrl: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-8">
      
      {/* Contact Header Block */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1C1A17] font-serif tracking-tight">
          Contact Support & Sales
        </h1>
        <p className="text-sm text-gray-500 mt-2 font-sans">
          Have a question or need custom team onboarding? We'd love to hear from you.
        </p>
      </div>

      {formSubmitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-serif">Message Received!</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you for reaching out. Our support team typically responds within 2-4 business hours.
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Form Area */}
          <form onSubmit={handleSubmit} className="md:col-span-8 space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs">
            
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Morgan"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@agency.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="upworkUrl" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Upwork Agency / Freelancer Profile URL <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                id="upworkUrl"
                type="url"
                value={formData.upworkUrl}
                onChange={(e) => setFormData({ ...formData, upworkUrl: e.target.value })}
                placeholder="https://www.upwork.com/freelancers/~..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Message *
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you win more proposals or save connects?"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-black hover:bg-zinc-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4 text-emerald-400" />
            </button>

          </form>

          {/* Contact Details Side Box */}
          <div className="md:col-span-4 space-y-6 bg-[#F4F3EF] p-6 rounded-2xl border border-gray-200 text-sm text-gray-700">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-serif">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Direct Email Support</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Prefer sending a direct email? Reach out anytime to our dedicated support desk:
              </p>
              <a
                href="mailto:support@openproposal.com"
                className="inline-block text-xs font-bold text-black underline hover:text-emerald-700 transition-colors pt-1"
              >
                support@openproposal.com
              </a>
            </div>

            <hr className="border-gray-300" />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-serif">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Response Time</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                We respond to all technical queries, agency billing questions, and feature requests Monday through Friday within 4 hours.
              </p>
            </div>

            <hr className="border-gray-300" />

            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-semibold text-gray-700">uConnect Technologies PVT LTD</p>
              <p>Open Proposal Product Support</p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

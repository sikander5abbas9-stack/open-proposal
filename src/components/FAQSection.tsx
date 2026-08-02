import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How does it know my past work?',
      answer: 'You easily store your key case studies, past projects, and metric outcomes (e.g., "-74% render latency", "+35% signup conversion") in your Open Proposal Portfolio Bank. When you paste an Upwork job post, our semantic matching engine automatically analyzes the client\'s stated problem and pairs the exact past work snippet that proves you can solve it.',
    },
    {
      question: 'Will proposals sound like AI?',
      answer: 'No. Open Proposal is explicitly engineered to eliminate generic AI tropes (like "Dear Hiring Manager", "I am a passionate developer with 5 years of experience", or "I read your job post with interest"). Instead, it generates a sharp, problem-focused opening hook, integrates your verified past outcomes, and presents a direct, human tone tailored to high-value clients.',
    },
    {
      question: 'Does it work with non-tech jobs?',
      answer: 'Yes! While software engineers and product designers love Open Proposal, it works seamlessly for copywriters, video editors, marketing strategists, virtual assistants, project managers, and financial analysts. Any job post that specifies client goals can be scored and matched with relevant past work.',
    },
    {
      question: 'Can I see why a job scored high or low?',
      answer: 'Yes! Every analysis comes with a transparent 0-100 score breakdown detailing client trust score, payment verification status, budget consistency, client rating, competition risk, and skill overlap rationale so you understand exactly why a job is worth bidding on or skipping.',
    },
    {
      question: 'How many Upwork Connects can I expect to save?',
      answer: 'Freelancers using Open Proposal report saving 30% to 50% of their monthly Connects by avoiding low-quality, unverified, or poorly matched jobs. At the same time, their interview reply rate increases significantly because every sent proposal features specific proof of work.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-slate-900 text-white text-xs font-semibold shadow-xs">
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 tracking-tight font-serif">
            Got questions? We've got answers.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about scoring Upwork jobs and generating winning proposal drafts.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-sm bg-white border border-slate-200 overflow-hidden transition-all shadow-2xs hover:border-slate-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg font-serif hover:text-emerald-800 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`w-7 h-7 rounded-sm flex items-center justify-center transition-all shrink-0 ${
                    isOpen ? 'bg-emerald-100 text-emerald-700 rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center p-8 rounded-sm bg-white border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 font-serif">Still have questions about Open Proposal?</h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Schedule a 1-on-1 personalized demo with an Upwork proposal specialist.
          </p>
          <div className="pt-2">
            <Link
              to="/request-demo"
              className="px-6 py-3 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center justify-center transition-all shadow-md"
            >
              <span>Book a Live Demo</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Calendar, ArrowRight, Loader2, Sparkles, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DemoPage: React.FC = () => {
  const { requestAccess } = useAuth();

  // Form fields state
  const [nameOrCompany, setNameOrCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  // Call booking modal/mode state
  const [isBookingCallMode, setIsBookingCallMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Tomorrow (Friday)');
  const [selectedTime, setSelectedTime] = useState('2:00 PM EST');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState<'demo' | 'call'>('demo');

  const handleRequestDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !email) return;

    setIsSubmitting(true);
    setSubmittedType('demo');
    requestAccess({ nameOrCompany, phone, email, lookingFor });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleBookCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !email) return;

    setIsSubmitting(true);
    setSubmittedType('call');
    requestAccess({ nameOrCompany, phone, email, lookingFor });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4 bg-[#f7f2e8] text-[#17140f] selection:bg-slate-900 selection:text-slate-50">
      
      {/* Centered Box (max-width 440px) */}
      <div className="w-full max-w-[440px] mx-auto space-y-6">

        {isSubmitted ? (
          /* Confirmation Success View */
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-6 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#17140f] font-serif">
                You're all set!
              </h2>
              <p className="text-[#17140f]/80 text-sm leading-relaxed font-sans">
                {submittedType === 'call'
                  ? `We've scheduled your 1-on-1 walkthrough for ${selectedDate} at ${selectedTime}. Confirmation details have been sent to ${email}.`
                  : `Proposala is invite-only. We've received your request and will send an invitation link to ${email} shortly.`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f7f2e8] border border-slate-200 text-left text-xs space-y-1.5 text-[#17140f] font-sans">
              <p>• <strong>Contact:</strong> {nameOrCompany || email}</p>
              <p>• <strong>Phone:</strong> {phone}</p>
              <p>• <strong>Status:</strong> {submittedType === 'call' ? `Confirmed (${selectedDate} @ ${selectedTime})` : 'Invite Priority Queue'}</p>
            </div>

            <div className="pt-2 space-y-2">
              <Link
                to="/login"
                className="w-full py-3 px-4 rounded-md bg-slate-900 hover:bg-[#27241e] text-slate-50 font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-xs font-mono"
              >
                <Sparkles className="w-4 h-4 text-slate-200" />
                <span>Go to Sign in</span>
              </Link>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setIsBookingCallMode(false);
                }}
                className="w-full py-2.5 px-4 text-xs font-medium text-[#17140f]/70 hover:text-[#17140f] transition-colors cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          </div>
        ) : isBookingCallMode ? (
          /* Book a Call Selector View */
          <div className="space-y-6 animate-fade-in bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setIsBookingCallMode(false)}
              className="inline-flex items-center gap-1.5 text-xs text-[#17140f]/70 hover:text-[#17140f] font-medium transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Request Access</span>
            </button>

            <div>
              <h1 className="text-2xl font-bold text-[#17140f] font-serif tracking-tight">
                Book a 15-min call
              </h1>
              <p className="text-[#17140f]/80 text-sm mt-1">
                Pick a slot that works best for you and we'll analyze one of your actual Upwork jobs live.
              </p>
            </div>

            <form onSubmit={handleBookCallSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold">
                  PHONE *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 text-[#17140f] placeholder-[#17140f]/40 focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 text-[#17140f] placeholder-[#17140f]/40 focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold">
                    DATE
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 text-[#17140f] focus:outline-none focus:ring-1 focus:ring-[#17140f]"
                  >
                    <option value="Tomorrow (Friday)">Tomorrow (Fri)</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold">
                    TIME SLOT
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 text-[#17140f] focus:outline-none focus:ring-1 focus:ring-[#17140f]"
                  >
                    <option value="10:00 AM EST">10:00 AM EST</option>
                    <option value="11:30 AM EST">11:30 AM EST</option>
                    <option value="2:00 PM EST">2:00 PM EST</option>
                    <option value="4:30 PM EST">4:30 PM EST</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-[#27241e] text-slate-50 rounded-md py-3 text-sm font-medium transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-4 font-mono"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-200" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Call Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Request Access Form */
          <div className="space-y-6 text-left bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            
            {/* Header Section */}
            <div>
              <h1 className="text-2xl font-bold text-[#17140f] font-serif tracking-tight">
                Request a demo
              </h1>
              <p className="text-[#17140f]/80 text-sm mt-1 mb-6 leading-relaxed">
                Proposala is invite-only for now. Tell us a little about yourself and we’ll send you an invitation link.
              </p>
            </div>

            {/* Request Demo Form */}
            <form onSubmit={handleRequestDemo} className="space-y-4">
              
              {/* Field 1: NAME OR COMPANY (OPTIONAL) */}
              <div>
                <label 
                  htmlFor="nameOrCompany" 
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold"
                >
                  NAME OR COMPANY (OPTIONAL)
                </label>
                <input
                  id="nameOrCompany"
                  type="text"
                  value={nameOrCompany}
                  onChange={(e) => setNameOrCompany(e.target.value)}
                  placeholder="Your name or company name"
                  className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 placeholder-[#17140f]/40 text-[#17140f] focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
                />
              </div>

              {/* Field 2: PHONE * */}
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold"
                >
                  PHONE *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 placeholder-[#17140f]/40 text-[#17140f] focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
                />
              </div>

              {/* Field 3: EMAIL * */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold"
                >
                  EMAIL *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 placeholder-[#17140f]/40 text-[#17140f] focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
                />
              </div>

              {/* Field 4: WHAT ARE YOU LOOKING FOR? (OPTIONAL) */}
              <div>
                <label 
                  htmlFor="lookingFor" 
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#17140f]/70 mb-1.5 font-semibold"
                >
                  WHAT ARE YOU LOOKING FOR? (OPTIONAL)
                </label>
                <textarea
                  id="lookingFor"
                  rows={3}
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  placeholder="A line or two about your work and what you’d use Proposala for."
                  className="w-full bg-[#f7f2e8] border border-slate-200 rounded-md text-sm p-3 placeholder-[#17140f]/40 text-[#17140f] focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all resize-none"
                />
              </div>

              {/* Primary CTA Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-slate-50 hover:bg-[#27241e] rounded-md py-3 text-sm font-medium transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-200" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Request a demo</span>
                  )}
                </button>
              </div>

              {/* Divider with "or" */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-[#17140f]/60 font-medium font-mono">or</span>
                </div>
              </div>

              {/* Secondary CTA Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsBookingCallMode(true)}
                  className="w-full bg-[#f7f2e8] hover:bg-[#efe8d8] border border-slate-200 text-[#17140f] rounded-md py-3 text-sm font-medium transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <Calendar className="w-4 h-4 text-[#17140f]/70" />
                  <span>Book a call</span>
                </button>
              </div>

            </form>

            {/* Footer Sign-in link */}
            <div className="pt-4 text-center">
              <p className="text-sm text-[#17140f]/80">
                Already have an account?{' '}
                <Link to="/login" className="text-[#17140f] font-semibold underline hover:text-black transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

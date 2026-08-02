import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await login(email, password);
      setIsSubmitting(false);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign in.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await loginWithGoogle();
      setIsSubmitting(false);
      navigate('/dashboard');
    } catch (err: any) {
      setIsSubmitting(false);
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        setErrorMsg('Sign-in popup was closed before completing. Please try again.');
      } else if (err?.code === 'auth/popup-blocked') {
        setErrorMsg('Sign-in popup was blocked by your browser. Please allow popups for this site.');
      } else {
        setErrorMsg(err?.message || 'Google sign-in failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-center items-center px-4 py-8 selection:bg-indigo-600 selection:text-white">
      
      {/* Centered Box (max-width 400px) */}
      <div className="w-full max-w-[400px] mx-auto space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Header: Brand & Main Heading */}
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs tracking-[0.15em] text-indigo-600 font-mono uppercase font-bold">
              PROPOSALA
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sign in
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Access your AI job analyzer & proposals workspace.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Google Sign In Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-mono font-semibold rounded-xl py-3 transition-colors shadow-2xs flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.19v3.15C3.2 21.34 7.28 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.09-3.16z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.28 0 3.2 2.66 1.19 6.6l4.09 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-400 font-mono text-[10px]">OR EMAIL</span>
          </div>
        </div>

        {/* Form Layout */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL Field */}
          <div>
            <label 
              htmlFor="email"
              className="block text-[11px] tracking-wider text-slate-600 font-mono uppercase mb-1 font-bold"
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
            />
          </div>

          {/* PASSWORD Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label 
                htmlFor="password"
                className="block text-[11px] tracking-wider text-slate-600 font-mono uppercase font-bold"
              >
                PASSWORD
              </label>
              <a 
                href="#forgot" 
                onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }}
                className="text-[11px] text-indigo-600 hover:underline transition-colors font-sans"
              >
                Forgot?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold rounded-xl py-3 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>

        </form>

        {/* Secondary Links & Footer */}
        <div className="pt-4 border-t border-slate-200 text-center space-y-2">
          <p className="text-xs text-slate-600">
            Don't have an account?{' '}
            <Link to="/request-demo" className="text-indigo-600 font-semibold hover:underline transition-colors">
              Request a demo
            </Link>
          </p>
          <div>
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

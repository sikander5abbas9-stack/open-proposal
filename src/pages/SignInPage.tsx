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
      setErrorMsg('Google sign-in failed.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#17140f] font-sans antialiased flex flex-col justify-center items-center px-4 py-8 selection:bg-[#17140f] selection:text-[#f7f2e8]">
      
      {/* Centered Box (max-width 380px) */}
      <div className="w-full max-w-[380px] mx-auto space-y-6 bg-white p-8 rounded-2xl border border-[#ddd2bf] shadow-sm">
        
        {/* Header: Brand & Main Heading */}
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#17140f] flex items-center justify-center text-[#f7f2e8]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] tracking-[0.2em] text-[#17140f]/70 font-mono uppercase font-semibold">
              PROPOSALA
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#17140f] tracking-tight">
            Sign in
          </h1>
          <p className="text-xs text-[#17140f]/70 font-sans">
            Access your AI job analyzer & proposals workspace.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Google Sign In Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full bg-[#f7f2e8] hover:bg-[#efe8d8] text-[#17140f] border border-[#ddd2bf] text-xs font-mono font-semibold rounded-xl py-3 transition-colors shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
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
            <div className="w-full border-t border-[#ddd2bf]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-[#17140f]/50 font-mono text-[10px]">OR EMAIL</span>
          </div>
        </div>

        {/* Form Layout */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL Field */}
          <div>
            <label 
              htmlFor="email"
              className="block text-[11px] tracking-wider text-[#17140f]/70 font-mono uppercase mb-1 font-semibold"
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
              className="w-full bg-[#f7f2e8] border border-[#ddd2bf] rounded-xl text-xs p-3 text-[#17140f] placeholder-[#17140f]/40 focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
            />
          </div>

          {/* PASSWORD Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label 
                htmlFor="password"
                className="block text-[11px] tracking-wider text-[#17140f]/70 font-mono uppercase font-semibold"
              >
                PASSWORD
              </label>
              <a 
                href="#forgot" 
                onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }}
                className="text-[11px] text-[#17140f]/70 hover:text-[#17140f] transition-colors"
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
              className="w-full bg-[#f7f2e8] border border-[#ddd2bf] rounded-xl text-xs p-3 text-[#17140f] placeholder-[#17140f]/40 focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#17140f] text-[#f7f2e8] hover:bg-[#27241e] text-xs font-mono font-bold rounded-xl py-3 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#ddd2bf]" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>

        </form>

        {/* Secondary Links & Footer */}
        <div className="pt-4 border-t border-[#ddd2bf] text-center space-y-2">
          <p className="text-xs text-[#17140f]/80">
            Don't have an account?{' '}
            <Link to="/request-demo" className="text-[#17140f] font-semibold underline hover:text-black transition-colors">
              Request a demo
            </Link>
          </p>
          <div>
            <Link to="/" className="text-xs text-[#17140f]/60 hover:text-[#17140f] transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

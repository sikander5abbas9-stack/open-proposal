import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, password);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#17140f] font-sans antialiased flex flex-col justify-center items-center px-4 py-8 selection:bg-[#17140f] selection:text-[#f7f2e8]">
      
      {/* Centered Box (max-width 360px) */}
      <div className="w-full max-w-[360px] mx-auto space-y-6">
        
        {/* Header: Brand & Main Heading */}
        <div className="text-left space-y-1">
          <div className="text-[10px] tracking-[0.2em] text-[#17140f]/60 font-mono uppercase font-semibold">
            PROPOSALA
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#17140f] tracking-tight">
            Sign in
          </h1>
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
              className="w-full bg-white border border-[#ddd2bf] rounded-md text-sm p-2.5 text-[#17140f] placeholder-[#17140f]/40 focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
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
              className="w-full bg-white border border-[#ddd2bf] rounded-md text-sm p-2.5 text-[#17140f] placeholder-[#17140f]/40 focus:outline-none focus:ring-1 focus:ring-[#17140f] transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#17140f] text-[#f7f2e8] hover:bg-[#27241e] text-sm font-medium rounded-md py-2.5 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer font-mono"
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

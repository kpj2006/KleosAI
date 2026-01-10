"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Github, 
  Chrome,
  AlertCircle 
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider 
} from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Firebase Authentication - Email/Password Sign In
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get Firebase ID token
      const token = await user.getIdToken();

      // SESSION PERSISTENCE
      localStorage.setItem('kleosai_session', token);
      localStorage.setItem('kleosai_user_email', user.email);
      localStorage.setItem('kleosai_user_uid', user.uid);
      
      // Redirect to dashboard on success
      window.location.href = '/dashboard';
      
    } catch (err) {
      // Firebase error handling
      let errorMessage = 'An error occurred during login';
      
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid credentials. Please check your email and password';
          break;
        default:
          errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Get Firebase ID token
      const token = await user.getIdToken();
      
      // SESSION PERSISTENCE
      localStorage.setItem('kleosai_session', token);
      localStorage.setItem('kleosai_user_email', user.email);
      localStorage.setItem('kleosai_user_uid', user.uid);
      
      // Redirect to dashboard on success
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Get Firebase ID token
      const token = await user.getIdToken();
      
      // SESSION PERSISTENCE
      localStorage.setItem('kleosai_session', token);
      localStorage.setItem('kleosai_user_email', user.email);
      localStorage.setItem('kleosai_user_uid', user.uid);
      
      // Redirect to dashboard on success
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-transparent transition-colors duration-300">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-lg relative animate-fade-in z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-6">
            <Sparkles size={14} /> KleosAI Security
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 font-normal">
            Enter your credentials to access your financial dashboard.
          </p>
        </div>

        <div className="card-modern p-8 md:p-12 rounded-3xl">
          
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@heisenbucks.com"
                  className="input-modern pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Password
                </label>
                <Link href="#" className="text-xs font-semibold uppercase tracking-wide text-emerald-400 hover:text-emerald-300">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-modern pl-12"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 rounded-xl text-lg flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
              {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <span className="relative px-4 bg-slate-900/60 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="btn-secondary flex items-center justify-center gap-3 py-4 rounded-xl disabled:opacity-50"
            >
              <Chrome size={18} /> Google
            </button>
            <button 
              type="button"
              onClick={handleGithubSignIn}
              disabled={isLoading}
              className="btn-secondary flex items-center justify-center gap-3 py-4 rounded-xl disabled:opacity-50"
            >
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm font-normal text-slate-400">
          Don't have an account? 
          <Link 
            href="/register" 
            className="ml-2 font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-tight"
          >
            Create Free Account
          </Link>
        </p>
      </div>
    </div>
  );
}
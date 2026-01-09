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
      localStorage.setItem('finai_session', token);
      localStorage.setItem('finai_user_email', user.email);
      localStorage.setItem('finai_user_uid', user.uid);
      
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
      localStorage.setItem('finai_session', token);
      localStorage.setItem('finai_user_email', user.email);
      localStorage.setItem('finai_user_uid', user.uid);
      
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
      localStorage.setItem('finai_session', token);
      localStorage.setItem('finai_user_email', user.email);
      localStorage.setItem('finai_user_uid', user.uid);
      
      // Redirect to dashboard on success
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-transparent transition-colors duration-700">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="w-full max-w-lg relative animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} /> FinAI Security
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Enter your credentials to access your financial dashboard.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] border border-white/60 dark:border-slate-800/50">
          
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@heisenbucks.com"
                  className="w-full pl-14 pr-6 py-5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Password
                </label>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl active:scale-95 transition-all disabled:opacity-50 group"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
              {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <span className="relative px-4 bg-white dark:bg-[#020617] text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <Chrome size={18} /> Google
            </button>
            <button 
              type="button"
              onClick={handleGithubSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Don't have an account? 
          <Link 
            href="/register" 
            className="ml-2 font-black text-indigo-500 hover:text-indigo-600 uppercase tracking-tight"
          >
            Create Free Account
          </Link>
        </p>
      </div>
    </div>
  );
}
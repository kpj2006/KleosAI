"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Firebase Authentication - Create new user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, {
        displayName: formData.name
      });

      // Get Firebase ID token
      const token = await user.getIdToken();

      // SESSION PERSISTENCE
      localStorage.setItem('finai_session', token);
      localStorage.setItem('finai_user_email', user.email);
      localStorage.setItem('finai_user_uid', user.uid);
      localStorage.setItem('finai_user_name', formData.name);

      // Success: Take them to dashboard
      window.location.href = '/dashboard';
      
    } catch (err) {
      // Firebase error handling
      let errorMessage = 'An error occurred during registration';
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = err.message;
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative bg-transparent transition-colors duration-700">
      <div className="w-full max-w-lg relative animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Join FinAI
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Start your journey with Team Heisenbucks.</p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] border border-white/60 dark:border-slate-800/50">
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                  placeholder="Walter White"
                  className="w-full pl-14 pr-6 py-5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  placeholder="admin@heisenbucks.com"
                  className="w-full pl-14 pr-6 py-5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl active:scale-95 transition-all disabled:opacity-50">
              {isLoading ? "Creating Account..." : "Sign Up"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account? 
          <Link href="/login" className="ml-2 font-black text-indigo-500 hover:text-indigo-600 uppercase tracking-tight">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
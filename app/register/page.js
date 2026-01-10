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
    <div className="min-h-screen flex items-center justify-center px-6 relative bg-transparent transition-colors duration-300">
      <div className="w-full max-w-lg relative animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-6">
            <Sparkles size={14} /> New Account
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-100 mb-2">Begin Setup</h1>
          <p className="text-slate-400 font-normal">Create your financial command center with Team Schrödinger Devs.</p>
        </div>

        <div className="card-modern p-8 md:p-12 rounded-3xl">
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                  placeholder="Walter White"
                  className="input-modern pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  placeholder="admin@schrodingerdevs.com"
                  className="input-modern pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                  placeholder="••••••••"
                  className="input-modern pl-12"
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 rounded-xl text-lg flex items-center justify-center gap-3 disabled:opacity-50">
              {isLoading ? "Setting up..." : "Create Account"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm font-normal text-slate-400">
          Already registered?
          <Link href="/login" className="ml-2 font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-tight">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
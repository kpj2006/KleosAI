"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // FIX: Matches the backend folder path app/api/auth/register/route.js
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      // Success: Take them to login page
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative bg-transparent transition-colors duration-300">
      <div className="w-full max-w-lg relative animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-6">
            <Sparkles size={14} /> Join KleosAI
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-100 mb-2">Create Account</h1>
          <p className="text-slate-400 font-normal">Start your journey with Team Heisenbucks.</p>
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
                  placeholder="admin@heisenbucks.com"
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
              {isLoading ? "Creating Account..." : "Sign Up"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm font-normal text-slate-400">
          Already have an account? 
          <Link href="/login" className="ml-2 font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-tight">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
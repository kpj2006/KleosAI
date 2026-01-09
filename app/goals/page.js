"use client";

import { useEffect, useState } from 'react';
// Ensure imports match your exact file names (case-sensitive)
import Goalform from '../../components/Goalform'; 
import GoalProgress from '../../components/GoalProgress';
import Loading from '../../components/Loading';
import { useTransactions } from '../../hooks/useTransactions';
import { useGoal } from '../../hooks/useGoal'; 
import { Target, Trophy, Sparkles } from "lucide-react";

export default function GoalsPage() {
  // 1. GLOBAL CURRENCY STATE SYNC
  const [globalCurrency, setGlobalCurrency] = useState('INR');

  useEffect(() => {
    // Auth check - redirect to login if no session
    const session = localStorage.getItem('finai_session');
    if (!session) {
      window.location.href = '/login';
      return;
    }

    // Initial sync from localStorage
    const savedCurrency = localStorage.getItem('finai_currency') || 'INR';
    setGlobalCurrency(savedCurrency);

    // Event listener for real-time currency toggles from the Navbar
    const handleCurrencyUpdate = () => {
      const updatedCurrency = localStorage.getItem('finai_currency') || 'INR';
      setGlobalCurrency(updatedCurrency);
    };

    window.addEventListener('currencyChange', handleCurrencyUpdate);
    return () => window.removeEventListener('currencyChange', handleCurrencyUpdate);
  }, []);

  const { transactions, isLoaded: txLoaded } = useTransactions();
  const { goals, addGoal, deleteGoal, isLoaded: goalsLoaded } = useGoal(transactions);

  // Use the custom Loading component for a consistent premium feel
  if (!txLoaded || !goalsLoaded) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 pb-24 transition-all duration-700 bg-transparent min-h-screen">
      
      {/* 1. ADAPTIVE HEADER */}
      <header className="px-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
          <Sparkles size={12} /> Ambition Tracking
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-indigo-600">
            <Target size={32} />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
              Financial Goals
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              Strategy for <span className="text-indigo-500 font-bold">Team Heisenbucks</span> in {globalCurrency}
            </p>
          </div>
        </div>
      </header>

      {/* 2. GOAL CREATION FORM */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="glass-panel p-10 rounded-[3rem] border border-white/10">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8 uppercase">
            Create New Goal
          </h2>
          {/* Passing currency to the form to show the correct input symbol */}
          <Goalform onSubmit={addGoal} currency={globalCurrency} />
        </div>
      </section>

      {/* 3. ADAPTIVE TARGET LIST */}
      <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex items-center gap-3 px-4">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Active Targets
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {goals && goals.length > 0 ? (
            goals.map((goal) => (
              <div key={goal.id} className="glass-panel p-2 rounded-[3.5rem] hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-white/5">
                {/* FIX: Passing the globalCurrency prop to handle dynamic ₹ to $ conversion */}
                <GoalProgress 
                  goal={goal} 
                  currency={globalCurrency}
                  onDelete={() => deleteGoal(goal.id)} 
                />
              </div>
            ))
          ) : (
            <div className="p-20 glass-panel rounded-[3rem] text-center text-slate-400 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <Trophy size={64} className="mx-auto mb-4 opacity-10" />
              <p className="font-black uppercase tracking-widest text-xs">No active goals found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
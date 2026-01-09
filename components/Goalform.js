"use client";
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function GoalForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !target) return;
    // FIX: Submitting 'targetAmount' which is mapped in the addGoal hook
    onSubmit({ name, targetAmount: parseFloat(target) });
    setName('');
    setTarget('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Goal Name</label>
          <input
            placeholder="e.g., Laptop"
            className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white font-bold outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Target Amount (₹)</label>
          <input
            type="number"
            placeholder="50000"
            className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white font-black text-2xl outline-none"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
        <PlusCircle size={22} /> SET NEW GOAL
      </button>
    </form>
  );
}
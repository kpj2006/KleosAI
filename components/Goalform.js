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
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">Target Name</label>
          <input
            placeholder="e.g., Laptop Purchase"
            className="input-modern"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">Required Amount (₹)</label>
          <input
            type="number"
            placeholder="50000"
            className="input-modern text-2xl font-bold"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn-primary w-full py-5 rounded-xl flex items-center justify-center gap-3">
        <PlusCircle size={22} /> <span className="uppercase tracking-wide">Create Target</span>
      </button>
    </form>
  );
}
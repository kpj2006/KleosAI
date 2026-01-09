"use client";

import React from 'react';
import { Target, Sparkles, Trash2, Trophy } from 'lucide-react';
import { formatGlobal } from '../utils/currencyConstants';

export default function GoalProgress({ goal, onDelete, currency = 'INR' }) {
  // 1. DATA NORMALIZATION: Prevents NaN and ensures property alignment
  const name = goal?.name || "Target Goal";
  const target = Number(goal?.target) || 0; 
  const saved = Number(goal?.saved) || 0;
  
  // Calculate remaining balance before formatting
  const remaining = target - saved;
  
  // Percentage calculation with safety check to prevent division by zero
  const percentage = target > 0 ? Math.min(Math.round((saved / target) * 100), 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {/* Icon Container with mesh-friendly transparency */}
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-indigo-400">
            <Target size={24} /> 
          </div>
          <div>
            <h3 className="text-2xl font-black text-white capitalize">{name}</h3>
            {/* FIX: Standardized dynamic target display */}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Target: {formatGlobal(target, currency)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-4xl font-black text-indigo-400 tabular-nums">{percentage}%</span>
          <button 
            onClick={onDelete}
            className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
            title="Remove Target"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* NEON PROGRESS BAR: Reflects live transaction data */}
      <div className="h-4 bg-slate-900/50 rounded-full overflow-hidden border border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Saved</p>
          {/* FIX: Dynamic conversion for current savings */}
          <p className="text-2xl font-black text-white tabular-nums">
            {formatGlobal(saved, currency)}
          </p>
        </div>
        
        {percentage >= 100 ? (
          <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[10px] tracking-tighter animate-bounce">
            <Trophy size={14} /> Goal Achieved!
          </div>
        ) : (
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 italic">
              <Sparkles size={12} className="inline mr-1 text-indigo-400" />
              {/* FIX: Accurate "more to go" display in selected currency */}
              {formatGlobal(remaining, currency)} more to go!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
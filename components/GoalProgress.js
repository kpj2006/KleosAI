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
          {/* Icon Container with modern styling */}
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Target size={24} /> 
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-100 capitalize">{name}</h3>
            {/* FIX: Standardized dynamic target display */}
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Target: {formatGlobal(target, currency)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-emerald-400 tabular-nums">{percentage}%</span>
          <button 
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
            title="Remove Target"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* MODERN PROGRESS BAR */}
      <div className="h-4 bg-slate-800/50 rounded-full overflow-hidden border border-emerald-500/10">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 shadow-glow-emerald transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Saved</p>
          {/* FIX: Dynamic conversion for current savings */}
          <p className="text-2xl font-bold text-slate-100 tabular-nums">
            {formatGlobal(saved, currency)}
          </p>
        </div>
        
        {percentage >= 100 ? (
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-tight animate-pulse">
            <Trophy size={14} /> Goal Achieved!
          </div>
        ) : (
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-400">
              <Sparkles size={12} className="inline mr-1 text-emerald-400" />
              {/* FIX: Accurate "more to go" display in selected currency */}
              {formatGlobal(remaining, currency)} more to go!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
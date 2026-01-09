"use client";
import React from 'react';
import { formatGlobal } from '../utils/currencyConstants';

export default function TransactionHistory({ transactions = [], currency = 'INR' }) {
  return (
    <div className="space-y-4">
      {transactions.map((t, idx) => (
        <div key={idx} className="glass-panel p-6 rounded-3xl flex justify-between items-center border border-white/5">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl font-black text-xl ${t.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
              {/* FIX: Use Optional Chaining (?.) and a fallback string to prevent crash */}
              {t.name?.charAt(0).toUpperCase() || "T"}
            </div>
            <div>
              {/* FIX: Fallback for missing transaction name */}
              <p className="text-white font-black text-lg">{t.name || "Unknown Transaction"}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.date}</p>
            </div>
          </div>
          {/* FIX: Standardized currency formatting to match dashboard */}
          <p className={`text-xl font-black ${t.amount > 0 ? 'text-emerald-500' : 'text-white'}`}>
            {t.amount > 0 ? '+' : ''}{formatGlobal(t.amount, currency)}
          </p>
        </div>
      ))}
    </div>
  );
}
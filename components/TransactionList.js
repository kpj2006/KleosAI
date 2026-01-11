"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatGlobal } from '../utils/currencyConstants';

export default function TransactionList({ transactions = [], onDelete, currency = 'INR' }) {
  return (
    <div className="space-y-2">
      {/* 1. EMPTY STATE HANDLER */}
      {transactions.length === 0 ? (
        <div className="p-20 text-center text-slate-400 font-semibold border-2 border-dashed border-emerald-500/10 rounded-3xl">
          No records found in the ledger.
        </div>
      ) : (
        transactions.map((t) => {
          // 2. ROBUST LABEL DETECTION
          // Searches all possible keys used in your form and hook history
          const displayName = t.name || t.merchant || t.title || t.description || "Untitled Record";

          return (
            <div key={t.id} className="group flex items-center justify-between p-6 bg-slate-800/40 hover:bg-slate-800/60 transition-all border-b border-emerald-500/5 last:border-0">
              <div className="flex items-center gap-4">
                {/* 3. CRASH PREVENTION: charAt now always has a valid string */}
                <div className={`p-4 rounded-xl font-bold text-xl w-14 h-14 flex items-center justify-center ${t.amount > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-slate-100 font-semibold text-lg capitalize">{displayName}</p>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{t.date || 'Pending Date'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* 4. DYNAMIC CURRENCY CONTROL */}
                <p className={`text-xl font-bold tabular-nums ${t.amount > 0 ? 'text-emerald-400' : 'text-slate-100'}`}>
                  {t.amount > 0 ? '+' : ''}{formatGlobal(t.amount, currency)}
                </p>
                <button 
                  onClick={() => onDelete(t.id)} 
                  className="p-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 active:scale-95"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
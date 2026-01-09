"use client";

import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { formatGlobal } from '../utils/currencyConstants';

export default function AvailableMoneyCard({ balance, income, expenses, currency }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance Card */}
      <div className="glass-panel p-8 rounded-[2rem] bg-indigo-600 text-white border-none shadow-2xl shadow-indigo-500/20">
        <div className="flex items-center gap-3 mb-4 opacity-80">
          <Wallet size={18} />
          <p className="text-[10px] font-black uppercase tracking-widest">Total Balance</p>
        </div>
        <h3 className="text-4xl font-black tracking-tighter">
          {/* FIX: Use formatGlobal instead of hardcoded ₹ */}
          {formatGlobal(balance, currency)}
        </h3>
      </div>

      {/* Monthly Income Card */}
      <div className="glass-panel p-8 rounded-[2rem] border border-white/5">
        <div className="flex items-center gap-3 mb-4 text-emerald-500">
          <TrendingUp size={18} />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Monthly Income</p>
        </div>
        <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
          {formatGlobal(income, currency)}
        </h3>
      </div>

      {/* Total Expenses Card */}
      <div className="glass-panel p-8 rounded-[2rem] border border-white/5">
        <div className="flex items-center gap-3 mb-4 text-rose-500">
          <TrendingDown size={18} />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Expenses</p>
        </div>
        <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
          {formatGlobal(expenses, currency)}
        </h3>
      </div>
    </div>
  );
}
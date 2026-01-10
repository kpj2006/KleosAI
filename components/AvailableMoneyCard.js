"use client";

import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { formatGlobal } from '../utils/currencyConstants';

export default function AvailableMoneyCard({ balance, income, expenses, currency }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance Card */}
      <div className="card-modern p-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none shadow-2xl shadow-emerald-500/20">
        <div className="flex items-center gap-3 mb-4 opacity-90">
          <Wallet size={18} />
          <p className="text-xs font-semibold uppercase tracking-wide">Total Balance</p>
        </div>
        <h3 className="text-4xl font-bold tracking-tight">
          {/* FIX: Use formatGlobal instead of hardcoded ₹ */}
          {formatGlobal(balance, currency)}
        </h3>
      </div>

      {/* Monthly Income Card */}
      <div className="card-modern p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-4 text-emerald-400">
          <TrendingUp size={18} />
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Monthly Inflow</p>
        </div>
        <h3 className="text-4xl font-bold tracking-tight text-slate-100">
          {formatGlobal(income, currency)}
        </h3>
      </div>

      {/* Total Expenses Card */}
      <div className="card-modern p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-4 text-rose-400">
          <TrendingDown size={18} />
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Expenses</p>
        </div>
        <h3 className="text-4xl font-bold tracking-tight text-slate-100">
          {formatGlobal(expenses, currency)}
        </h3>
      </div>
    </div>
  );
}
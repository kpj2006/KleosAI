"use client";
import React from 'react';
import { Activity, ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';
import { formatGlobal } from '../utils/currencyConstants';

export default function FitnessScoreCard({ 
  income = 0, 
  expenses = 0, 
  balance = 0, 
  currency = 'USD' 
}) {
  // 1. DATA SANITIZATION: Ensure these are numbers
  const monthlyIncome = Number(income) || 0;
  const monthlyExpenses = Math.max(Math.abs(Number(expenses)), 1); // Minimum $1 to avoid 0 months
  const totalBalance = Number(balance) || 0;

  // 2. DYNAMIC OVERHEADS
  const inflationRate = 0.005; // 0.5% monthly inflation (~6% annual)
  const safetyBuffer = totalBalance * 0.10; // 10% Emergency reserve
  
  // 3. CALCULATE USABLE CAPITAL
  const usableSavings = totalBalance - safetyBuffer;

  // 4. DYNAMIC RUNWAY CALCULATION (Iterative Burn with Inflation)
  let runwayMonths = 0;
  let remainingCapital = usableSavings;
  let currentBurn = monthlyExpenses;

  if (remainingCapital > 0) {
    while (remainingCapital >= currentBurn) {
      remainingCapital -= currentBurn;
      runwayMonths++;
      // Every month, cost of living increases slightly
      currentBurn *= (1 + inflationRate);
      if (runwayMonths > 600) break; // 50-year cap
    }
  }

  // 5. STABILITY SCORING
  const monthlySurplus = monthlyIncome - monthlyExpenses - 600; // Deducting EMIs
  const healthScore = runwayMonths > 24 ? 90 : runwayMonths > 6 ? 60 : 50;

  return (
    <div className="card-modern p-10 rounded-3xl relative overflow-hidden transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-6 w-full md:w-2/3">
          <div className="flex items-center gap-3">
            <Activity className="text-emerald-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Stability Index</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Survival Runway Display */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-emerald-500/10 group hover:border-emerald-500/30 transition-all">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-semibold uppercase text-slate-400">Survival Runway</p>
                <TrendingUp size={14} className="text-emerald-400" />
              </div>
              <p className="text-3xl font-bold text-emerald-400">{runwayMonths} <span className="text-xs uppercase">Months</span></p>
              <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Inflation Adjusted (6% Annually)</p>
            </div>

            {/* Safety Buffer Display */}
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-teal-500/10 group hover:border-teal-500/30 transition-all">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-semibold uppercase text-slate-400">Safety Buffer</p>
                <ShieldCheck size={14} className="text-teal-400" />
              </div>
              <p className="text-3xl font-bold text-slate-100">{formatGlobal(safetyBuffer, currency)}</p>
              <p className="text-xs text-slate-500 font-semibold uppercase mt-1">10% Emergency Protection</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-center gap-4">
            <AlertCircle size={20} className="text-emerald-400" />
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase">Monthly Surplus</p>
              <p className="text-slate-100 font-bold">{formatGlobal(monthlySurplus, currency)}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Health Gauge */}
        <div className="relative flex flex-col items-center justify-center min-w-[180px]">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-800" />
            <circle 
              cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="16" fill="transparent" 
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * healthScore) / 100}
              className="text-emerald-500 transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold text-slate-100">{healthScore}</span>
            <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wide">Health</span>
          </div>
        </div>
      </div>
    </div>
  );
}
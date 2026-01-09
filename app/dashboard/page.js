"use client";

import { useEffect, useState } from 'react';
import { LayoutDashboard, BrainCircuit, RefreshCw, ShoppingCart } from 'lucide-react';

import FitnessScoreCard from '../../components/FitnessScoreCard';
import AvailableMoneyCard from '../../components/AvailableMoneyCard';
import SpendingChart from '../../components/SpendingChart';
import InsightCard from '../../components/InsightCard';
import PurchaseAssistant from '../../components/PurchaseAssistant';
import Loading from '../../components/Loading';

import { useTransactions } from '../../hooks/useTransactions';
import { useInsights } from '../../hooks/useInsights';

export default function DashboardPage() {
  const [globalCurrency, setGlobalCurrency] = useState('INR');

  useEffect(() => {
    const session = localStorage.getItem('finai_session');
    if (!session) window.location.href = '/login';
    
    const savedCurrency = localStorage.getItem('finai_currency') || 'INR';
    setGlobalCurrency(savedCurrency);

    const handleCurrencyUpdate = () => {
      setGlobalCurrency(localStorage.getItem('finai_currency') || 'INR');
    };

    window.addEventListener('currencyChange', handleCurrencyUpdate);
    return () => window.removeEventListener('currencyChange', handleCurrencyUpdate);
  }, []);

  const { transactions, balance, income, expenses, isLoaded } = useTransactions();
  // Named import now works correctly
  const { insights, loading: aiLoading, generateInsights } = useInsights(transactions);

  // FIX: Data Normalization
  // We use the transactions-derived values, falling back to realistic defaults only if null
  const userFinances = {
    income: Number(income) || 0, 
    expenses: Math.abs(Number(expenses)) || 0,
    balance: Number(balance) || 0,
    currentEMIs: 0 
  };

  // FIX: Standardized Product Prices (Always in INR base for the logic)
  const productDatabase = [
    { name: "Samsung S23 FE", price: 49800, tier: 2, category: "smartphone", currency: "INR" },
    { name: "iPhone 15 Pro", price: 119900, tier: 3, category: "smartphone", currency: "INR" },
    { name: "MacBook Air M3", price: 114900, tier: 2, category: "laptop", currency: "INR" },
    { name: "2BHK Apartment", price: 8500000, tier: 2, category: "real-estate", currency: "INR" },
    { name: "Electric Sedan", price: 1500000, tier: 2, category: "automobile", currency: "INR" }
  ];

  useEffect(() => {
    if (transactions?.length > 0 && !insights && !aiLoading) {
      generateInsights();
    }
  }, [transactions, insights, aiLoading, generateInsights]);

  if (!isLoaded) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 min-h-screen px-4">
      
      <header className="pt-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl border border-white/5 text-indigo-600">
              <LayoutDashboard size={32} />
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tighter text-white uppercase">Wealth Overview</h1>
              <p className="text-slate-500 font-medium italic">
                Strategic Ledger for <span className="text-indigo-500 font-bold">Team Heisenbucks</span> in {globalCurrency}
              </p>
            </div>
          </div>
          <button 
            onClick={() => generateInsights()} 
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCw size={16} className={aiLoading ? "animate-spin" : ""} />
            Re-Analyze Data
          </button>
        </div>
      </header>

      {/* CORE FINANCIAL ANALYSIS */}
      <section className="space-y-8">
        <FitnessScoreCard 
          income={userFinances.income} 
          expenses={userFinances.expenses} 
          balance={userFinances.balance} 
          currency={globalCurrency} 
        />
        <AvailableMoneyCard 
          balance={userFinances.balance} 
          income={userFinances.income} 
          expenses={userFinances.expenses} 
          currency={globalCurrency}
        />
      </section>

      {/* SMART PURCHASE VALIDATOR */}
      <section className="glass-panel p-10 rounded-[3.5rem] border border-white/10">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingCart className="text-indigo-500" size={28} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Smart Purchase Validator</h2>
        </div>
        <PurchaseAssistant 
          userFinances={userFinances} 
          productDatabase={productDatabase} 
          globalCurrency={globalCurrency} 
        />
      </section>

      {/* DYNAMIC SPENDING CHART */}
      <section className="glass-panel p-10 rounded-[3.5rem] border border-white/10">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-10">Spending Patterns</h2>
        <SpendingChart transactions={transactions} currency={globalCurrency} />
      </section>

      {/* GROWTH MENTOR SECTION */}
      <section className="space-y-8 pb-20">
        <h2 className="text-3xl font-black text-white flex items-center gap-4">
          <BrainCircuit className="text-indigo-500" />
          Growth Mentor Strategy 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insights ? insights.map((item, index) => (
            <InsightCard key={index} index={index} insight={item} currency={globalCurrency} />
          )) : [1, 2].map((i) => (
            <div key={i} className="h-44 glass-panel rounded-[2.5rem] animate-pulse bg-slate-100/10" />
          ))}
        </div>
      </section>
    </div>
  );
}
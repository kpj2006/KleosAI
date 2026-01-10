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
    const session = localStorage.getItem('kleosai_session');
    if (!session) window.location.href = '/login';
    
    const savedCurrency = localStorage.getItem('kleosai_currency') || 'INR';
    setGlobalCurrency(savedCurrency);

    const handleCurrencyUpdate = () => {
      setGlobalCurrency(localStorage.getItem('kleosai_currency') || 'INR');
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
      
      <header className="pt-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
              <LayoutDashboard size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-slate-100">Wealth Overview</h1>
              <p className="text-slate-400 font-normal">
                Strategic Ledger for <span className="text-emerald-400 font-semibold">Team Heisenbucks</span> in {globalCurrency}
              </p>
            </div>
          </div>
          <button 
            onClick={() => generateInsights()} 
            className="btn-primary flex items-center gap-2 rounded-xl text-sm"
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
      <section className="card-modern p-10 rounded-3xl">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingCart className="text-emerald-400" size={28} />
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Smart Purchase Validator</h2>
        </div>
        <PurchaseAssistant 
          userFinances={userFinances} 
          productDatabase={productDatabase} 
          globalCurrency={globalCurrency} 
        />
      </section>

      {/* DYNAMIC SPENDING CHART */}
      <section className="card-modern p-10 rounded-3xl">
        <h2 className="text-2xl font-semibold text-slate-100 tracking-tight mb-10">Spending Patterns</h2>
        <SpendingChart transactions={transactions} currency={globalCurrency} />
      </section>

      {/* GROWTH MENTOR SECTION */}
      <section className="space-y-8 pb-20">
        <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-4">
          <BrainCircuit className="text-emerald-400" />
          Growth Mentor Strategy 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insights ? insights.map((item, index) => (
            <InsightCard key={index} index={index} insight={item} currency={globalCurrency} />
          )) : [1, 2].map((i) => (
            <div key={i} className="h-44 card-modern rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    </div>
  );
}
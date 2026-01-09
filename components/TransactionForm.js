"use client";

import { useState } from 'react';
import { PlusCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
// FIX: Import CURRENCIES to handle dynamic symbols
import { CURRENCIES } from '../utils/currencyConstants';

export default function TransactionForm({ onSubmit, currency = 'INR' }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    // FIX: Normalize the amount to the base INR currency before saving.
    // This ensures your $600 input is stored as ~₹50,000 so the global 
    // analytics and conversion remain accurate.
    const rate = CURRENCIES[currency]?.rate || 1;
    const baseAmount = parseFloat(amount) * rate;

    onSubmit({
      // FIX: Changed 'merchant' to 'name' to resolve the "Unknown Record" bug
      name: description, 
      amount: type === 'expense' ? -Math.abs(baseAmount) : Math.abs(baseAmount),
      category,
      type,
      date: new Date().toISOString().split('T')[0]
    });
    
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-10 rounded-[2.5rem] space-y-8 transition-all border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Merchant Input */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 ml-1">
            Merchant / Detail
          </label>
          <input
            type="text"
            placeholder="e.g., Apple Store"
            className="w-full px-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-900 dark:text-white font-bold transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 ml-1">
            {/* FIX: Dynamic Currency Symbol in Label */}
            Amount ({CURRENCIES[currency]?.symbol || '₹'})
          </label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full px-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-900 dark:text-white font-black text-2xl transition-all"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Type Toggle */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 ml-1">
            Type
          </label>
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                type === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              <ArrowDownRight size={14} /> EXPENSE
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                type === 'income' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              <ArrowUpRight size={14} /> INCOME
            </button>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 ml-1">
            Category
          </label>
          <select 
            className="w-full px-6 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none text-slate-900 dark:text-white font-bold transition-all focus:ring-4 focus:ring-indigo-500/10"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Savings">Savings</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 dark:bg-indigo-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
      >
        <PlusCircle size={22} />
        <span className="uppercase tracking-widest text-sm">Add {type}</span>
      </button>
    </form>
  );
}
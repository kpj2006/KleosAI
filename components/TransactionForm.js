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
    <form onSubmit={handleSubmit} className="card-modern p-10 rounded-3xl space-y-8 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Merchant Input */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">
            Transaction Source
          </label>
          <input
            type="text"
            placeholder="e.g., Apple Store"
            className="input-modern"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">
            {/* FIX: Dynamic Currency Symbol in Label */}
            Amount ({CURRENCIES[currency]?.symbol || '₹'})
          </label>
          <input
            type="number"
            placeholder="0.00"
            className="input-modern text-2xl font-bold"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Type Toggle */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">
            Type
          </label>
          <div className="flex p-1.5 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold transition-all ${
                type === 'expense' ? 'bg-slate-700/50 text-rose-400 shadow-sm' : 'text-slate-400'
              }`}
            >
              <ArrowDownRight size={14} /> EXPENSE
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold transition-all ${
                type === 'income' ? 'bg-slate-700/50 text-emerald-400 shadow-sm' : 'text-slate-400'
              }`}
            >
              <ArrowUpRight size={14} /> INCOME
            </button>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-400 ml-1">
            Category
          </label>
          <select 
            className="input-modern font-semibold"
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
        className="btn-primary w-full py-5 rounded-xl flex items-center justify-center gap-3"
      >
        <PlusCircle size={22} />
        <span className="uppercase tracking-wide text-sm">Log {type}</span>
      </button>
    </form>
  );
}
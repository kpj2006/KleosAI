"use client";

import { useEffect, useState } from 'react';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import Loading from '../../components/Loading';
import { useTransactions } from '../../hooks/useTransactions';
import { ReceiptText, PlusCircle } from "lucide-react";

export default function TransactionsPage() {
  const [globalCurrency, setGlobalCurrency] = useState('INR');
  const { transactions, addTransaction, deleteTransaction, isLoaded } = useTransactions();

  useEffect(() => {
    const savedCurrency = localStorage.getItem('finai_currency') || 'INR';
    setGlobalCurrency(savedCurrency);

    const handleCurrencyUpdate = () => {
      setGlobalCurrency(localStorage.getItem('finai_currency') || 'INR');
    };

    window.addEventListener('currencyChange', handleCurrencyUpdate);
    return () => window.removeEventListener('currencyChange', handleCurrencyUpdate);
  }, []);

  // 1. DATA SANITIZATION: Force-mapping keys to 'name'
  // This looks at every possible field (category, type, etc.) to find a label
  const sanitizedTransactions = transactions?.map(t => ({
    ...t,
    name: t.name || t.title || t.description || t.category || t.type || "Untitled Record"
  })) || [];

  if (!isLoaded) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 pb-24 min-h-screen">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-white/5 text-indigo-600">
          <ReceiptText size={32} />
        </div>
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white">Transactions</h1>
          <p className="text-slate-500 font-medium italic">
            Ledger for Team Heisenbucks in {globalCurrency}
          </p>
        </div>
      </header>

      <section>
        <div className="flex items-center gap-3 mb-6 px-4">
          <PlusCircle className="text-indigo-500" size={20} />
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Add New Record</h2>
        </div>
        <TransactionForm onSubmit={addTransaction} currency={globalCurrency} />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 px-4">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
          <h2 className="text-xl font-black text-white uppercase tracking-tight">History</h2>
        </div>
        
        <div className="glass-panel rounded-[3rem] overflow-hidden border border-white/10">
          {/* Use the sanitizedTransactions here */}
          <TransactionList 
            transactions={sanitizedTransactions} 
            onDelete={deleteTransaction} 
            currency={globalCurrency} 
          />
        </div>
      </section>
    </div>
  );
}
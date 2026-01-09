"use client";

import { useEffect, useState, useRef } from 'react';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import Loading from '../../components/Loading';
import { useTransactions } from '../../hooks/useTransactions';
import { ReceiptText, PlusCircle, Upload } from "lucide-react";

export default function TransactionsPage() {
  const [globalCurrency, setGlobalCurrency] = useState('INR');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const { transactions, addTransaction, deleteTransaction, isLoaded } = useTransactions();

  useEffect(() => {
    // Auth check - redirect to login if no session
    const session = localStorage.getItem('kleosai_session');
    if (!session) {
      window.location.href = '/login';
      return;
    }

    const savedCurrency = localStorage.getItem('kleosai_currency') || 'INR';
    setGlobalCurrency(savedCurrency);

    const handleCurrencyUpdate = () => {
      setGlobalCurrency(localStorage.getItem('kleosai_currency') || 'INR');
    };

    window.addEventListener('currencyChange', handleCurrencyUpdate);
    return () => window.removeEventListener('currencyChange', handleCurrencyUpdate);
  }, []);

  // Handle JSON file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.json')) {
      setUploadError('Only .json files are allowed');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploadError('');

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      // Handle both array and single object
      const transactionsArray = Array.isArray(jsonData) ? jsonData : [jsonData];
      
      // Convert and import each transaction
      transactionsArray.forEach((item) => {
        // Convert type: Debit -> expense, Credit -> income
        const type = item.type === 'Debit' ? 'expense' : item.type === 'Credit' ? 'income' : 'expense';
        
        // Determine amount sign based on type
        const amount = type === 'expense' ? -Math.abs(item.amount) : Math.abs(item.amount);
        
        // Create transaction object
        const transaction = {
          id: item.id || `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: item.merchant || 'Imported Transaction',
          merchant: item.merchant || 'Imported Transaction',
          amount: amount,
          type: type,
          category: item.category || 'Other',
          date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          currency: item.currency || globalCurrency
        };
        
        addTransaction(transaction);
      });
      
      // Clear the input
      if (fileInputRef.current) fileInputRef.current.value = '';
      
    } catch (error) {
      setUploadError('Invalid JSON file format');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // 1. DATA SANITIZATION: Force-mapping keys to 'name'
  // This looks at every possible field (category, type, etc.) to find a label
  const sanitizedTransactions = transactions?.map(t => ({
    ...t,
    name: t.name || t.title || t.description || t.category || t.type || "Untitled Record"
  })) || [];

  if (!isLoaded) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 pb-24 min-h-screen">
      <header className="flex items-center gap-4 animate-fade-in">
        <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
          <ReceiptText size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-100">Transactions</h1>
          <p className="text-slate-400 font-normal">
            Ledger for <span className="text-emerald-400 font-semibold">Team Heisenbucks</span> in {globalCurrency}
          </p>
        </div>
      </header>

      <section>
        <div className="flex items-center gap-3 mb-6 px-4">
          <PlusCircle className="text-emerald-400" size={20} />
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Add New Record</h2>
        </div>
        <TransactionForm onSubmit={addTransaction} currency={globalCurrency} />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 px-4">
          <Upload className="text-emerald-400" size={20} />
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Import from JSON</h2>
        </div>
        <div className="card-modern p-10 rounded-3xl">
          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-500/20 rounded-2xl cursor-pointer hover:border-emerald-500/40 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-slate-400" />
                <p className="mb-2 text-sm text-slate-300 font-semibold">
                  <span className="font-bold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">JSON files only</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {uploadError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <p className="text-rose-500 text-sm font-semibold">{uploadError}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 px-4">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">History</h2>
        </div>
        
        <div className="card-modern rounded-3xl overflow-hidden">
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
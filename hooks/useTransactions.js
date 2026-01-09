'use client';

import { useState, useMemo, useEffect } from 'react';
// FIX: Using relative path because the @/ alias is broken on your system
import { SAMPLE_TRANSACTIONS } from '../lib/sampleData'; 

export function useTransactions() {
  // 1. Initialize state for transactions and a loading flag
  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. Hydration Fix: Only load from localStorage after the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hackmars_transactions');
      setTransactions(saved ? JSON.parse(saved) : SAMPLE_TRANSACTIONS);
      setIsLoaded(true);
    }
  }, []);

  // 3. Sync: Save to localStorage whenever the transactions list changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('hackmars_transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  // 4. DELETE LOGIC: Removes a transaction by ID
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // 5. ADD LOGIC: Formats and adds a new income or expense
  const addTransaction = (formData) => {
    const newTx = {
      ...formData,
      id: `tx_${Date.now()}`, // Generate unique ID for demo
      amount: parseFloat(formData.amount),
      date: formData.date || new Date().toISOString().split('T')[0],
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // 6. MATH LOGIC: Recalculates totals for the Dashboard and Fitness Score
  const { balance, income, expenses } = useMemo(() => {
    let inc = 0;
    let exp = 0;

    transactions.forEach((t) => {
      const val = parseFloat(t.amount || 0);
      // Logic: Positive numbers are Income, Negative are Expenses
      if (val > 0) {
        inc += val;
      } else {
        exp += Math.abs(val);
      }
    });

    return {
      balance: inc - exp,
      income: inc,
      expenses: exp
    };
  }, [transactions]);

  return {
    transactions,
    isLoaded,
    balance,
    income,
    expenses,
    addTransaction,
    deleteTransaction // CRITICAL: This allows the Trash icon to work
  };
}
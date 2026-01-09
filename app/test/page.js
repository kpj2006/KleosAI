'use client';

import { useState } from 'react';
// FIX: Relative paths instead of @/ alias for Vercel
import { detectSubscriptions, getSubscriptionSummary } from '../../lib/subscriptionDetector';
import { calculateAvailableMoney, formatMoney, getSpendingAdvice, canAfford } from '../../lib/moneyCalculator';
import { useInsights } from '../../hooks/useInsights';

export default function TestPage() {
  const [apiResult, setApiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testTransactions = [
    { date: '2024-12-10', merchant: 'Starbucks', amount: 350, category: 'Food' },
    { date: '2024-12-11', merchant: 'Zomato', amount: 450, category: 'Food' },
    { date: '2024-12-12', merchant: 'BookMyShow', amount: 300, category: 'Entertainment' },
    { date: '2024-12-09', merchant: 'Swiggy', amount: 280, category: 'Food' },
    { date: '2024-12-08', merchant: 'Uber', amount: 150, category: 'Transport' },
    { date: '2024-11-10', merchant: 'Netflix', amount: 199, category: 'Entertainment' },
    { date: '2024-10-12', merchant: 'Netflix', amount: 199, category: 'Entertainment' },
    { date: '2024-12-05', merchant: 'Spotify', amount: 119, category: 'Entertainment' },
    { date: '2024-11-05', merchant: 'Spotify', amount: 119, category: 'Entertainment' },
    { date: '2024-12-01', merchant: 'Gym Membership', amount: 1500, category: 'Health' },
    { date: '2024-09-01', merchant: 'Gym Membership', amount: 1500, category: 'Health' },
  ];

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions: testTransactions })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'API request failed');
      setApiResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testSubscriptions = () => {
    const result = detectSubscriptions(testTransactions);
    const summary = getSubscriptionSummary(result.subscriptions);
    alert(`✅ Subscriptions Found: ${result.subscriptions.length}\n💰 Monthly Cost: ₹${result.totalMonthlyCost}\n\n${summary}`);
  };

  const testMoneyCalculator = () => {
    const result = calculateAvailableMoney({
      currentBalance: 15000,
      transactions: testTransactions,
      upcomingBills: [{ name: 'Rent', amount: 5000, dueDate: '2024-12-25' }],
      savingsGoals: [{ name: 'Laptop', target: 50000, saved: 10000 }],
      monthlyIncome: 25000
    });
    alert(`✅ Available: ${formatMoney(result.availableMoney)}\n📊 Status: ${result.status.toUpperCase()}`);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>🧪 Component Test Suite</h1>
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <button onClick={testAPI} disabled={loading} style={{ padding: '10px', background: '#0070f3', color: 'white', borderRadius: '5px' }}>Test API</button>
        <button onClick={testSubscriptions} style={{ padding: '10px', background: '#10b981', color: 'white', borderRadius: '5px' }}>Test Subscriptions</button>
        <button onClick={testMoneyCalculator} style={{ padding: '10px', background: '#f59e0b', color: 'white', borderRadius: '5px' }}>Test Calculator</button>
      </div>
      {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
      {apiResult && <div style={{ marginTop: '20px', background: '#efe', padding: '10px' }}>API Test Success!</div>}
    </div>
  );
}
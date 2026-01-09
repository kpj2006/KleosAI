'use client';
import { useState, useCallback } from 'react';

// FIX: Standardize as a NAMED export to match dashboard imports
export function useInsights(transactions = []) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = useCallback(async () => {
    // Safety check to prevent analysis of empty data
    if (!transactions || transactions.length === 0) return;
    
    setLoading(true);
    try {
      // Logic for calculating AI-driven insights
      // (Mocked for current hackathon version)
      const mockInsights = [
        { type: 'SAVINGS', text: 'You are saving 12% more than last month. Keep it up!', impact: 'positive' },
        { type: 'RISK', text: 'High spending in "Shopping" detected.', impact: 'neutral' }
      ];
      setInsights(mockInsights);
    } catch (err) {
      console.error("Insight Error:", err);
    } finally {
      setLoading(false);
    }
  }, [transactions]);

  return { insights, loading, generateInsights };
}
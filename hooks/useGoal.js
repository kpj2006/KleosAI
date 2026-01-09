'use client';
import { useState, useEffect, useMemo } from 'react';

export function useGoal(transactions = []) {
  const [goals, setGoals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('finai_goals');
      // Standardized default data
      setGoals(saved ? JSON.parse(saved) : [{ id: 'g1', name: 'Laptop', target: 1000000 }]);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('finai_goals', JSON.stringify(goals));
    }
  }, [goals, isLoaded]);

  const processedGoals = useMemo(() => {
    // 1. Calculate the global pool of all 'Savings' transactions
    const totalSavingsPool = (transactions || [])
      .filter(t => t.category === 'Savings')
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

    let remainingPool = totalSavingsPool;

    return goals.map(goal => {
      const target = Number(goal.target) || 0;
      // 2. Distribute funds to goals sequentially
      const allocated = Math.min(remainingPool, target);
      remainingPool -= allocated;

      return {
        ...goal,
        target: target,
        saved: allocated // Correct key for GoalProgress
      };
    });
  }, [goals, transactions]);

  const addGoal = (newGoal) => {
    const sanitizedGoal = {
      ...newGoal,
      id: `goal_${Date.now()}`,
      // Standardize input key
      target: Number(newGoal.target) || Number(newGoal.targetAmount) || 0
    };
    setGoals(prev => [...prev, sanitizedGoal]);
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return { goals: processedGoals, addGoal, deleteGoal, isLoaded };
}
"use client";

import React, { useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import { formatGlobal } from '../utils/currencyConstants';
import { CATEGORIES } from '../utils/categories';

export default function TransactionList({ transactions = [], onDelete, currency = 'INR' }) {
  // Group transactions by category
  const groupedTransactions = useMemo(() => {
    const groups = {};
    transactions.forEach((t) => {
      // Map 'Cash' to 'Other' and use 'Other' as default
      let category = t.category || 'Other';
      if (category === 'Cash') {
        category = 'Other';
      }
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(t);
    });
    return groups;
  }, [transactions]);

  // Sort categories: defined categories first, then 'Other' at the end
  const categories = useMemo(() => {
    const cats = Object.keys(groupedTransactions);
    return cats.sort((a, b) => {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      const indexA = CATEGORIES.indexOf(a);
      const indexB = CATEGORIES.indexOf(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [groupedTransactions]);

  return (
    <div className="p-6 overflow-y-hidden">
      {/* EMPTY STATE HANDLER */}
      {transactions.length === 0 ? (
        <div className="p-20 text-center text-slate-400 font-semibold border-2 border-dashed border-emerald-500/10 rounded-3xl">
          No records found in the ledger.
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth">
          {categories.map((category) => (
            <div key={category} className="bg-slate-800/30 rounded-2xl border border-emerald-500/10 overflow-hidden flex flex-col flex-shrink-0 w-80">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-5 py-4 border-b border-emerald-500/20">
                <h3 className="text-lg font-bold text-emerald-400 capitalize tracking-wide">
                  {category}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {groupedTransactions[category].length} transaction{groupedTransactions[category].length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Transactions List - Scrollable */}
              <div className="flex-1 overflow-y-auto max-h-[600px]">
                {groupedTransactions[category].map((t) => {
                  const isIncome = t.amount > 0;
                  
                  return (
                    <div key={t.id} className="group flex items-center justify-between p-4 hover:bg-slate-700/40 transition-all border-b border-slate-700/30 last:border-0">
                      {/* Date on the left */}
                      <div className="flex-1">
                        <p className="text-sm text-slate-400 font-semibold uppercase tracking-wide">
                          {t.date || 'Pending'}
                        </p>
                      </div>

                      {/* Amount on the right with delete button */}
                      <div className="flex items-center gap-3">
                        <p className={`text-base font-bold tabular-nums ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isIncome ? '+' : '-'}{formatGlobal(Math.abs(t.amount), currency)}
                        </p>
                        <button 
                          onClick={() => onDelete(t.id)} 
                          className="p-1.5 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 active:scale-95"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
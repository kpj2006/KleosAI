"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function SpendingChart({ transactions = [] }) {
  // 1. DATA PROCESSING: Group expenses by category
  const categoryData = transactions
    .filter((t) => t.type === "expense" || t.amount < 0)
    .reduce((acc, t) => {
      const category = t.category || "Other";
      const amount = Math.abs(t.amount);
      const existing = acc.find((item) => item.category === category);
      if (existing) {
        existing.amount += amount;
      } else {
        acc.push({ category, amount });
      }
      return acc;
    }, []);

  // Sort by amount descending to make the chart look organized
  const sortedData = categoryData.sort((a, b) => b.amount - a.amount);

  // 2. THEME COLORS: Vibrant neon colors for the bars
  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4"];

  // 3. CUSTOM TOOLTIP: Matches your Glassmorphism style
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-4 rounded-2xl shadow-2xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {/* GRID LINES: Subtle and adaptive to dark mode */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            strokeOpacity={0.1}
            className="stroke-slate-300 dark:stroke-slate-700"
          />

          {/* X AXIS: Bold, readable labels */}
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.05em' }}
            dy={10}
            className="fill-slate-500 dark:fill-slate-400 uppercase"
          />

          {/* Y AXIS: Clean currency markers */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fontWeight: 700 }}
            className="fill-slate-400"
            tickFormatter={(value) => `₹${value >= 1000 ? value / 1000 + 'k' : value}`}
          />

          <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} content={<CustomTooltip />} />

          {/* BARS: Thick rounded bars with glowing gradients */}
          <Bar
            dataKey="amount"
            radius={[12, 12, 12, 12]}
            barSize={45}
            animationDuration={1500}
          >
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
"use client";

import { Calendar, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function WeeklyRecapCard({
  week = "This Week",
  totalSpent = 0,
  totalIncome = 0,
  savings = 0,
  trend = 0,
}) {
  const isPositiveTrend = trend >= 0;

  return (
    <div className="glass-card p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">{week}</h4>
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${isPositiveTrend ? "text-green-600" : "text-red-600"}`}
        >
          {isPositiveTrend ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(trend || 0)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/60 rounded-lg p-3 border border-white/40">
          <p className="text-xs text-gray-600 mb-1">Spent</p>
          <p className="text-lg font-bold text-red-600">
            ${(totalSpent || 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-white/40">
          <p className="text-xs text-gray-600 mb-1">Income</p>
          <p className="text-lg font-bold text-green-600">
            ${(totalIncome || 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-white/40">
          <p className="text-xs text-gray-600 mb-1">Saved</p>
          <p className="text-lg font-bold text-cyan-600">
            ${(savings || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-700">
          <span className="font-semibold">Pattern:</span> Spending is{" "}
          {isPositiveTrend ? "within range" : "elevated"} compared to previous period.
        </p>
      </div>
    </div>
  );
}
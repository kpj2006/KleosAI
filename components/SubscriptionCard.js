"use client";

import { Calendar, DollarSign, AlertCircle } from "lucide-react";

export default function SubscriptionCard({
  name = "Subscription",
  amount = 0,
  billingCycle = "monthly",
  nextBilling = "N/A",
  status = "active",
}) {
  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    expiring: "bg-orange-100 text-orange-700 border-orange-200",
    inactive: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="glass-card p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500 capitalize">
            {billingCycle} billing
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-2xl font-bold text-gray-900">
            ${(amount || 0).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">/ {billingCycle}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Next billing: {nextBilling}</span>
        </div>
      </div>

      {status === "expiring" && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-orange-700">Renews in 3 days</p>
        </div>
      )}
    </div>
  );
}
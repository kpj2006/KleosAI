"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, XCircle, PlusCircle, Layout, Globe, RefreshCw } from 'lucide-react';
import { validatePurchase, getSimilarityScore } from '../utils/purchaseValidator';
import { CURRENCIES, formatGlobal } from '../utils/currencyConstants';

export default function PurchaseAssistant({ userFinances, productDatabase, globalCurrency }) {
  const [viewMode, setViewMode] = useState('input');
  const [selectedCurrency, setSelectedCurrency] = useState(globalCurrency || 'INR');
  const [target, setTarget] = useState({ name: "", price: "", category: "smartphone" });
  const [result, setResult] = useState(null);

  // Sync state if globalCurrency changes via Navbar
  useEffect(() => {
    if (globalCurrency) setSelectedCurrency(globalCurrency);
  }, [globalCurrency]);

  const handleRunAnalysis = () => {
    if (!target.name || !target.price || isNaN(target.price)) return;
    
    const analysis = validatePurchase(parseFloat(target.price), selectedCurrency, userFinances);
    
    const alternatives = productDatabase
      .filter(p => p.category === target.category)
      .map(p => {
        // Standardize all product prices to INR base for the comparison logic
        const altPriceINR = p.price * (CURRENCIES[p.currency]?.rate || 1);
        return { 
          ...p, 
          priceINR: altPriceINR,
          similarity: getSimilarityScore(target, p, analysis.budgetINR) 
        };
      })
      .filter(p => p.priceINR < analysis.actualPriceInINR)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 2);

    setResult({ ...analysis, alternatives });
    setViewMode('result');
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-800/50 rounded-xl border border-emerald-500/10 w-fit">
        <button onClick={() => setViewMode('input')} className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${viewMode === 'input' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400'}`}>
          <PlusCircle size={14} /> Add Product
        </button>
        <button onClick={() => result && setViewMode('result')} disabled={!result} className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${!result ? 'opacity-30' : ''} ${viewMode === 'result' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400'}`}>
          <Layout size={14} /> Analysis
        </button>
      </div>

      {viewMode === 'input' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <input type="text" placeholder="Product Name" className="input-modern" onChange={(e) => setTarget({...target, name: e.target.value})} />
          
          <select className="input-modern cursor-pointer" onChange={(e) => setTarget({...target, category: e.target.value})}>
            <option value="smartphone">Smartphone</option>
            <option value="real-estate">Real Estate</option>
            <option value="automobile">Automobile</option>
          </select>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-semibold">{CURRENCIES[selectedCurrency]?.symbol || '$'}</span>
            <input type="number" placeholder="Price" className="input-modern pl-10" onChange={(e) => setTarget({...target, price: e.target.value})} />
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-emerald-500/10">
            <Globe size={14} className="text-emerald-400" />
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="bg-transparent text-xs font-semibold text-slate-300 outline-none cursor-pointer">
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code} className="bg-slate-900">{code}</option>
              ))}
            </select>
          </div>
          
          <button onClick={handleRunAnalysis} className="btn-primary col-span-full py-5 rounded-xl uppercase tracking-wide">Run Strategy Analysis</button>
        </div>
      ) : (
        /* ANALYSIS VIEW */
        <div className="space-y-8 animate-fade-in">
          <div className={`p-8 rounded-2xl flex items-center gap-6 border ${result.status === 'SAFE TO BUY' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
            {result.status === 'SAFE TO BUY' ? <ShieldCheck size={40} /> : <XCircle size={40} />}
            <div>
              <h4 className="text-3xl font-bold uppercase tracking-tight">{result.status}</h4>
              <p className="text-sm font-normal opacity-80">Analysis complete for {target.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.alternatives.map((alt) => {
              // 1. Convert alternative's INR base price back to the current global dashboard currency
              const dashboardRate = CURRENCIES[globalCurrency]?.rate || 1;
              const convertedAltPrice = alt.priceINR / dashboardRate;
              
              // 2. Normalize savings to avoid "Save $1,193" bug
              const targetInINR = parseFloat(target.price) * (CURRENCIES[selectedCurrency]?.rate || 1);
              const savingsINR = targetInINR - alt.priceINR;
              const normalizedSavings = savingsINR / dashboardRate;

              return (
                <div key={alt.name} className="p-6 bg-slate-800/30 border border-emerald-500/10 rounded-2xl flex justify-between items-center group hover:border-emerald-500/30 transition-all">
                  <div>
                    <p className="text-slate-100 font-semibold">{alt.name}</p>
                    {/* Render converted price instead of raw small numbers */}
                    <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
                      {formatGlobal(convertedAltPrice, globalCurrency)}
                    </p>
                  </div>
                  {/* Normalized savings value matching dashboard currency */}
                  <p className="text-emerald-400 font-semibold text-xs">Save {formatGlobal(normalizedSavings, globalCurrency)}</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => setViewMode('input')} className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wide hover:underline transition-all"><RefreshCw size={12} /> Analyze New Purchase</button>
        </div>
      )}
    </div>
  );
}
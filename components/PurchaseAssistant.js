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
    <div className="glass-panel p-10 rounded-[3.5rem] border border-white/10 space-y-8">
      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-900/50 rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setViewMode('input')} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'input' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
          <PlusCircle size={14} /> Add Product
        </button>
        <button onClick={() => result && setViewMode('result')} disabled={!result} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!result ? 'opacity-30' : ''} ${viewMode === 'result' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
          <Layout size={14} /> Analysis
        </button>
      </div>

      {viewMode === 'input' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-4">
          <input type="text" placeholder="Product Name" className="bg-slate-900/50 p-4 rounded-2xl text-white outline-none border border-white/5 font-bold" onChange={(e) => setTarget({...target, name: e.target.value})} />
          
          <select className="bg-slate-900/50 p-4 rounded-2xl text-white outline-none border border-white/5 font-bold cursor-pointer" onChange={(e) => setTarget({...target, category: e.target.value})}>
            <option value="smartphone">Smartphone</option>
            <option value="real-estate">Real Estate</option>
            <option value="automobile">Automobile</option>
          </select>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 font-bold">{CURRENCIES[selectedCurrency]?.symbol || '$'}</span>
            <input type="number" placeholder="Price" className="w-full bg-slate-900/50 p-4 pl-10 rounded-2xl text-white border border-white/5 font-bold outline-none" onChange={(e) => setTarget({...target, price: e.target.value})} />
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-2xl border border-white/5">
            <Globe size={14} className="text-indigo-500" />
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="bg-transparent text-[10px] font-black uppercase text-white outline-none cursor-pointer">
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code} className="bg-slate-900">{code}</option>
              ))}
            </select>
          </div>
          
          <button onClick={handleRunAnalysis} className="col-span-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">Run Strategy Analysis</button>
        </div>
      ) : (
        /* ANALYSIS VIEW */
        <div className="space-y-8 animate-in zoom-in-95">
          <div className={`p-8 rounded-[2.5rem] flex items-center gap-6 border ${result.status === 'SAFE TO BUY' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
            {result.status === 'SAFE TO BUY' ? <ShieldCheck size={40} /> : <XCircle size={40} />}
            <div>
              <h4 className="text-3xl font-black uppercase tracking-tighter">{result.status}</h4>
              <p className="text-sm font-medium opacity-80 italic">Analysis complete for {target.name}</p>
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
                <div key={alt.name} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex justify-between items-center group hover:border-indigo-500/50 transition-all">
                  <div>
                    <p className="text-white font-black">{alt.name}</p>
                    {/* Render converted price instead of raw small numbers */}
                    <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase">
                      {formatGlobal(convertedAltPrice, globalCurrency)}
                    </p>
                  </div>
                  {/* Normalized savings value matching dashboard currency */}
                  <p className="text-emerald-500 font-black text-xs">Save {formatGlobal(normalizedSavings, globalCurrency)}</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => setViewMode('input')} className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest hover:underline transition-all"><RefreshCw size={12} /> Analyze New Purchase</button>
        </div>
      )}
    </div>
  );
}
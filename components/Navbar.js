"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  LayoutDashboard, 
  ReceiptText, 
  Target, 
  LogOut, 
  LogIn, 
  User, 
  UserPlus, 
  Globe 
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { CURRENCIES } from '../utils/currencyConstants';

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currency, setCurrency] = useState('INR');

  // Initialization: Sync with LocalStorage and Session
  useEffect(() => {
    // Check Auth Status
    const token = localStorage.getItem('finai_session');
    setIsLoggedIn(!!token);

    // Sync Currency Preference
    const savedCurrency = localStorage.getItem('finai_currency') || 'INR';
    setCurrency(savedCurrency);
  }, [pathname]);

  // Global Currency Toggle Logic
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    
    // Save to local storage for persistence across pages
    localStorage.setItem('finai_currency', newCurrency);
    
    // Dispatch a custom event to notify components like SpendingChart
    window.dispatchEvent(new Event('currencyChange'));
  };

  const handleLogout = () => {
    localStorage.removeItem('finai_session');
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Transactions', path: '/transactions', icon: <ReceiptText size={18} /> },
    { name: 'Goals', path: '/goals', icon: <Target size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- LEFT SECTION: BRANDING --- */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">
            FINAI
          </Link>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  pathname === item.path
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* --- RIGHT SECTION: GLOBAL UTILITIES --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* 1. Global Currency Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500/30 transition-all">
            <Globe size={14} className="text-indigo-500" />
            <select 
              value={currency} 
              onChange={handleCurrencyChange} 
              className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer text-slate-600 dark:text-slate-300"
            >
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code} className="dark:bg-slate-900">
                  {code} ({CURRENCIES[code].symbol})
                </option>
              ))}
            </select>
          </div>

          <ThemeToggle />
          
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block" />

          {/* 2. Authentication State Management */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <User size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                  Team Heisenbucks
                </span>
              </div>

              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-rose-500 transition-colors group"
              >
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Exit</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
              >
                <LogIn size={16} />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
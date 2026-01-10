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
    const token = localStorage.getItem('kleosai_session');
    setIsLoggedIn(!!token);

    // Sync Currency Preference
    const savedCurrency = localStorage.getItem('kleosai_currency') || 'INR';
    setCurrency(savedCurrency);
  }, [pathname]);

  // Global Currency Toggle Logic
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    
    // Save to local storage for persistence across pages
    localStorage.setItem('kleosai_currency', newCurrency);
    
    // Dispatch a custom event to notify components like SpendingChart
    window.dispatchEvent(new Event('currencyChange'));
  };

  const handleLogout = () => {
    localStorage.removeItem('kleosai_session');
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Transactions', path: '/transactions', icon: <ReceiptText size={18} /> },
    { name: 'Goals', path: '/goals', icon: <Target size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-emerald-500/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- LEFT SECTION: BRANDING --- */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-gradient">KLEOSAI</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
                  pathname === item.path
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
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
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-emerald-500/30 transition-all">
            <Globe size={14} className="text-emerald-400" />
            <select 
              value={currency} 
              onChange={handleCurrencyChange} 
              className="bg-transparent text-xs font-semibold outline-none cursor-pointer text-slate-300"
            >
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code} className="bg-slate-900">
                  {code} ({CURRENCIES[code].symbol})
                </option>
              ))}
            </select>
          </div>

          <ThemeToggle />
          
          <div className="h-8 w-[1px] bg-slate-700/50 mx-1 hidden md:block" />

          {/* 2. Authentication State Management */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <User size={14} />
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  Team Schrödinger Devs
                </span>
              </div>

              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-rose-400 transition-colors group"
              >
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-xs font-semibold hidden sm:block">Exit</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/login" 
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold text-xs shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
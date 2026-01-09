"use client";

import {
  Sparkles,
  TrendingUp,
  Bell,
  Target,
  Brain,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-cyan-500" />,
      title: '"Can I Spend?" Decision Helper',
      description: "Get instant AI-powered recommendations on whether you can afford that purchase without derailing your goals.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      title: "Smart Expense Tracking",
      description: "Automatically categorize and analyze your spending patterns with intelligent insights that help you save more.",
    },
    {
      icon: <Bell className="w-8 h-8 text-pink-500" />,
      title: "Subscription Detection",
      description: "Never lose track of recurring charges. We identify and monitor all your subscriptions in one place.",
    },
    {
      icon: <Target className="w-8 h-8 text-orange-500" />,
      title: "Goal Progress Tracking",
      description: "Set financial goals and watch your progress in real-time with personalized milestones and celebrations.",
    },
    {
      icon: <Brain className="w-8 h-8 text-indigo-500" />,
      title: "AI Insights & Summaries",
      description: "Receive weekly financial health reports with actionable recommendations tailored to your spending habits.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-teal-500" />,
      title: "Intelligent Budgeting",
      description: "Dynamic budgets that adapt to your lifestyle and automatically adjust based on your income and expenses.",
    },
  ];

  return (
    /* FIX: bg-transparent allows the global mesh-gradient to flow through */
    <div className="min-h-screen bg-transparent transition-colors duration-700">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40 px-6">
        {/* Soft Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
        
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block">
              <span className="px-5 py-2.5 rounded-full bg-white/80 dark:bg-indigo-500/10 backdrop-blur-xl text-xs font-black text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 shadow-sm uppercase tracking-widest">
                ✨ AI-Powered Financial Intelligence
              </span>
            </div>

            {/* FIX: Adaptive Text Color (Slate-900 in day, White in night) */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
              Make Smarter <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Spending Decisions
              </span> <br />
              with AI
            </h1>

            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
              Stop guessing if you can afford it. Get instant, intelligent insights that help you spend confidently while crushing your financial goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/dashboard" className="px-10 py-5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all active:scale-95 group shadow-xl">
                Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> <span>Free to start</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Preview Card */}
          <div className="relative">
            <div className="glass-panel p-10 rounded-[3.5rem] relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Your Financial Overview</h2>
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl border border-indigo-500/20"><ShieldCheck size={24} /></div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Available to Spend</p>
                  <p className="text-5xl font-black tracking-tighter mb-4">$2,847.50</p>
                  <div className="flex items-center gap-2 text-xs font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-md"><TrendingUp size={14} /> +12% from last month</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/60 dark:border-slate-800/50 rounded-[2rem]">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">This Month</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">$1,234</p>
                  </div>
                  <div className="p-6 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/60 dark:border-slate-800/50 rounded-[2rem]">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Saved</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">$456</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="px-5 py-2 rounded-full bg-indigo-500/10 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border border-indigo-500/20 mb-6 inline-block">Features</span>
            <h2 className="font-black mb-6 text-4xl sm:text-5xl md:text-7xl text-slate-900 dark:text-white tracking-tighter">
              Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">Master Your Money</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-panel p-10 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 group shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">{feature.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
            <h2 className="font-black mb-8 text-4xl sm:text-5xl md:text-7xl text-slate-900 dark:text-white tracking-tighter">
              Ready to Take Control of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">Your Finances?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="px-12 py-5 rounded-2xl font-black bg-slate-900 dark:bg-indigo-600 text-white text-lg shadow-xl hover:scale-105 transition-all">Get Started Free</Link>
              <button className="px-12 py-5 rounded-2xl font-black bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-lg hover:scale-105 transition-all shadow-md">Watch Demo</button>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-10">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-16 px-6 text-center">
        <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 tracking-tighter mb-4 inline-block">FINAI</span>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">© 2025 FinAI • Intelligent Financial Planning</p>
      </footer>
    </div>
  );
}
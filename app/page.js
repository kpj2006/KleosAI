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
      icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
      title: '"Can I Spend?" Decision Helper',
      description: "Get instant AI-powered recommendations on whether you can afford that purchase without derailing your goals.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-teal-400" />,
      title: "Smart Expense Tracking",
      description: "Automatically categorize and analyze your spending patterns with intelligent insights that help you save more.",
    },
    {
      icon: <Bell className="w-8 h-8 text-cyan-400" />,
      title: "Subscription Detection",
      description: "Never lose track of recurring charges. We identify and monitor all your subscriptions in one place.",
    },
    {
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      title: "Goal Progress Tracking",
      description: "Set financial goals and watch your progress in real-time with personalized milestones and celebrations.",
    },
    {
      icon: <Brain className="w-8 h-8 text-teal-500" />,
      title: "AI Insights & Summaries",
      description: "Receive weekly financial health reports with actionable recommendations tailored to your spending habits.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-cyan-500" />,
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
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-teal-500/8 dark:bg-teal-500/12 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block">
              <span className="px-5 py-3 rounded-full bg-emerald-500/10 backdrop-blur-xl text-xs font-semibold text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 uppercase tracking-wide">
                ✨ AI-Powered Financial Intelligence
              </span>
            </div>

            {/* Modern headline with green/teal gradient */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-100 leading-[1.05]">
              Turn Your Money <br />
              <span className="text-gradient">
                Into Momentum
              </span>
            </h1>

            <p className="text-xl text-slate-400 font-normal max-w-lg leading-relaxed">
              Track, analyze, and act on your finances with clarity — powered by intelligent insights, not guesswork.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/dashboard" className="btn-primary px-10 py-5 rounded-xl text-base flex items-center justify-center gap-3 group">
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
            <div className="card-modern p-10 rounded-3xl relative overflow-hidden hover:scale-[1.02] transition-transform duration-500">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-semibold text-slate-100 tracking-tight">Current Financial State</h2>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20"><ShieldCheck size={24} /></div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-2">Available to Spend</p>
                  <p className="text-5xl font-bold tracking-tight mb-4">$2,847.50</p>
                  <div className="flex items-center gap-2 text-sm font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-md"><TrendingUp size={14} /> +12% from last month</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl hover:border-emerald-500/30 transition-all">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">This Month</p>
                    <p className="text-3xl font-bold text-slate-100">$1,234</p>
                  </div>
                  <div className="p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl hover:border-emerald-500/30 transition-all">
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">Saved</p>
                    <p className="text-3xl font-bold text-slate-100">$456</p>
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
            <span className="px-5 py-2 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-400 uppercase tracking-wide border border-emerald-500/20 mb-6 inline-block">Core Capabilities</span>
            <h2 className="font-bold mb-6 text-4xl sm:text-5xl md:text-6xl text-slate-100 tracking-tight">
              Financial Control <span className="text-gradient">Without Complexity</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card-modern p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-slate-400 font-normal leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="card-modern rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <h2 className="font-bold mb-8 text-4xl sm:text-5xl md:text-6xl text-slate-100 tracking-tight">
              Start Making <span className="text-gradient">Informed Decisions</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary px-12 py-5 rounded-xl text-lg">Access Dashboard</Link>
              <button className="btn-secondary px-12 py-5 rounded-xl text-lg">View Demo</button>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-10">No payment required • Always free tier included</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-emerald-500/10 py-16 px-6 text-center">
        <span className="text-3xl font-bold text-gradient tracking-tight mb-4 inline-block">KLEOSAI</span>
        <p className="text-slate-500 font-semibold uppercase tracking-wide text-xs">© 2026 KleosAI • Intelligent Financial Planning</p>
      </footer>
    </div>
  );
}
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

export default function InsightCard({ insight, index }) {
  // FIX: Safety check for 'cat' to prevent dashboard crash
  const getIcon = (cat) => {
    const category = cat?.toLowerCase() || ""; // Safe fallback string
    
    if (category.includes('leak')) return <AlertTriangle className="text-rose-400" />;
    if (category.includes('save')) return <TrendingUp className="text-emerald-400" />;
    return <Lightbulb className="text-indigo-400" />;
  };

  return (
    <div 
      className="glass-panel p-6 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
          {/* Use optional chaining here as well */}
          {getIcon(insight?.category)}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
            {insight?.category || "Strategy"}
          </p>
          <p className="text-sm font-medium text-slate-300 leading-relaxed">
            {insight?.text || "Analyzing financial patterns..."}
          </p>
        </div>
      </div>
    </div>
  );
}
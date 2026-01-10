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
      className="card-modern p-6 rounded-2xl hover:border-emerald-500/20 transition-all duration-300 group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all">
          {/* Use optional chaining here as well */}
          {getIcon(insight?.category)}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
            {insight?.category || "Strategy"}
          </p>
          <p className="text-sm font-normal text-slate-300 leading-relaxed">
            {insight?.text || "Analyzing financial patterns..."}
          </p>
        </div>
      </div>
    </div>
  );
}
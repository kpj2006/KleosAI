import "./globals.css";
import Navbar from "../components/Navbar"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="mesh-gradient text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
        {/* Modern ambient gradient glows with green/teal accents */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px] animate-pulse-glow" />
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/8 blur-[130px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[-15%] left-[30%] w-[550px] h-[550px] rounded-full bg-cyan-500/6 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>
        
        <Navbar />

        <main className="relative pt-20 pb-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
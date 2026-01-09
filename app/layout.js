import "./globals.css";
import Navbar from "../components/Navbar"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="mesh-gradient text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-700">
        {/* Dynamic Ambient Blurs - matching the landing page glow */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
        
        <Navbar />

        <main className="relative pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
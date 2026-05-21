import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Cpu, ArrowLeftRight, PieChart, History, Landmark, Settings, ShieldAlert, Menu, X, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  mode: 'DEMO' | 'LIVE';
  setMode: (mode: 'DEMO' | 'LIVE') => void;
}

export default function DashboardLayout({ mode, setMode }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Strategy Center', path: '/dashboard/strategy', icon: Cpu },
    { name: 'Manual Trade', path: '/dashboard/trade', icon: ArrowLeftRight },
    { name: 'Portfolio', path: '/dashboard/portfolio', icon: PieChart },
    { name: 'Transactions', path: '/dashboard/transactions', icon: History },
    { name: 'Banking', path: '/dashboard/banking', icon: Landmark },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* MANDATORY ENVIRONMENT BANNER */}
      <div className={`w-full py-2 px-4 text-center text-xs font-mono font-black tracking-wider transition-colors duration-300 z-50 shadow-md ${
        mode === 'DEMO' 
          ? 'bg-amber-500 text-slate-950' 
          : 'bg-emerald-500 text-slate-950'
      }`}>
        {mode === 'DEMO' 
          ? "DEMO MODE — PAPER TRADING ONLY. NO REAL FUNDS ARE AT RISK. ALL ACTIVITY IS SIMULATED."
          : "LIVE MODE — REAL CAPITAL AT RISK. VERIFY ALL TRANSACTIONS IN YOUR WALLET."
        }
      </div>

      {/* TOP NAVIGATION HUD */}
      <header className="h-16 border-b border-slate-900 bg-slate-900/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-4 md:px-8 z-40">
        <div className="flex items-center gap-3">
          <img 
            src="./acextrader.png" 
            alt="AceX Logo" 
            className="h-8 w-auto object-contain"
            onError={(e) => {
              // Fallback element if asset is not loaded yet
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="text-lg font-mono font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ACEX TRADER
          </span>
        </div>

        {/* HORIZONTAL MINI TICKER */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-400 max-w-xl overflow-hidden">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-slate-500 font-bold">BTC/USD</span>
            <span className="text-emerald-400">$94,240.50</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-slate-500 font-bold">ETH/USD</span>
            <span className="text-emerald-400">$3,422.15</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-slate-500 font-bold">SOL/USD</span>
            <span className="text-red-400">$174.80</span>
          </div>
        </div>

        {/* ENVIRONMENT SELECTOR SWITCH */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center shadow-inner">
            <button 
              onClick={() => setMode('DEMO')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                mode === 'DEMO' ? 'bg-amber-500/10 text-amber-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Demo Account
            </button>
            <button 
              onClick={() => setMode('LIVE')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                mode === 'LIVE' ? 'bg-emerald-500/10 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Live Account
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* SIDEBAR NAVIGATION (DESKTOP) */}
        <aside className="hidden md:flex flex-col w-64 bg-slate-900/30 border-r border-slate-900 p-4 justify-between shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-950 to-slate-900 text-cyan-400 border border-cyan-500/20 font-bold shadow-md shadow-cyan-950/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-slate-400'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={() => navigate('/auth')}
            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:text-red-400 hover:bg-red-950/10 rounded-xl transition-all font-mono"
          >
            <LogOut size={18} />
            Disconnect Hub
          </button>
        </aside>

        {/* WORKSPACE FRAME CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8 bg-gradient-to-b from-slate-950 to-slate-900">
          <Outlet />
        </main>

        {/* RESPONSIVE BOTTOM NAVIGATION BAR (MOBILE VIEWS) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 flex items-center justify-around px-2 z-40 shadow-2xl">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                  isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-mono tracking-tighter max-w-full truncate">{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}


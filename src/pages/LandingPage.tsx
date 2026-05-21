import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Zap, Lock, BarChart3, Users, CheckCircle } from 'lucide-react';
import { Sparkline } from '../components/charts/Sparkline';

export default function LandingPage() {
  const navigate = useNavigate();
  const [calcInput, setCalcInput] = useState('1000');
  
  const projectedReturn = (parseFloat(calcInput) * 0.45).toFixed(2); // Mock 45% APY

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* NAVIGATION */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="./acextrader.png" alt="AceX Logo" className="h-10 w-auto" />
            <span className="text-xl font-black tracking-tighter text-white font-mono">ACEX TRADER</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/auth')} className="text-sm font-bold text-slate-300 hover:text-white hidden md:block">Sign In</button>
            <button onClick={() => navigate('/auth')} className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)] hover:shadow-[0_0_25px_rgba(8,145,178,0.6)]">
              Launch Terminal
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> v2.4 Engine Now Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Institutional execution, <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">decentralized.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connect your wallet, allocate capital to strictly-audited algorithmic models, and let the execution engine capture volatility on-chain. Non-custodial. No black boxes.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button onClick={() => navigate('/auth')} className="w-full sm:w-auto bg-white text-slate-950 px-8 py-4 rounded-xl font-black text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                Connect Wallet <ChevronRight size={18} />
              </button>
              <button onClick={() => navigate('/auth')} className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-slate-800 transition-colors">
                Try Demo Mode
              </button>
            </div>
          </div>

          {/* FEASIBILITY CALCULATOR */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <BarChart3 className="text-cyan-400" />
              <h3 className="font-bold text-white font-mono">Yield Projection Matrix</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Initial Capital (USDT)</label>
                <input 
                  type="number" 
                  value={calcInput} 
                  onChange={(e) => setCalcInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white font-mono focus:border-cyan-500 focus:outline-none text-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Est. 30-Day Return</div>
                  <div className="text-xl font-black text-emerald-400 font-mono">+${(parseFloat(projectedReturn) / 12).toFixed(2)}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Est. 1-Year Return</div>
                  <div className="text-xl font-black text-cyan-400 font-mono">+${projectedReturn}</div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center">Projections are hypothetical based on historical volatility. Past performance does not guarantee future results.</p>
            </div>
          </div>
        </div>
      </div>

      {/* REAL-TIME MARKET PULSE */}
      <div className="py-24 bg-slate-950 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-10 font-mono tracking-tight text-center">REAL-TIME MARKET PULSE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* BTC Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-lg border-t-orange-500/50 hover:border-t-orange-500 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-white">BTC</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">+2.4%</span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-4">$64,240.50</div>
              <Sparkline data={[62000, 62500, 61800, 63000, 64240]} color="#f97316" height={40} />
            </div>
            {/* ETH Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-lg border-t-purple-500/50 hover:border-t-purple-500 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-white">ETH</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">+1.8%</span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-4">$3,422.10</div>
              <Sparkline data={[3200, 3250, 3300, 3350, 3422]} color="#a855f7" height={40} />
            </div>
            {/* SOL Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-lg border-t-green-500/50 hover:border-t-green-500 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-white">SOL</span>
                <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">-0.5%</span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-4">$145.80</div>
              <Sparkline data={[150, 148, 149, 146, 145]} color="#22c55e" height={40} />
            </div>
            {/* USDC Card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-lg border-t-blue-500/50 hover:border-t-blue-500 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-white">USDC</span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">0.0%</span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-4">$1.00</div>
              <Sparkline data={[1.00, 1.001, 0.999, 1.00, 1.00]} color="#3b82f6" height={40} />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center">
        <p className="text-slate-500 text-xs max-w-2xl mx-auto px-6 mb-4">
          AceX Trader Option is a decentralized strategy terminal interface. Trading involves substantial risk. Smart contracts are subject to market volatility and technical vulnerabilities. Not financial advice.
        </p>
        <div className="text-slate-600 font-mono text-[10px]">© 2026 ACEX TRADER SUITE</div>
      </footer>
    </div>
  );
}

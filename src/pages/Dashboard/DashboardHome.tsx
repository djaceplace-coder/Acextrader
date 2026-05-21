import React from 'react';
import { Activity, ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, ShieldCheck, Pause, Play, Plus, ArrowRightLeft } from 'lucide-react';
import { Sparkline } from '../../components/charts/Sparkline';

export default function DashboardHome() {
  // Mock Data for immediate visual impact
  const totalEquity = 12450.75;
  const unrealizedPnL = 342.50;
  const marginUsed = 45; // percentage
  
  // Sparkline mock data
  const btcData = [64000, 64200, 63800, 64500, 65100, 64900, 65500];
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto font-mono">
      {/* TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Total Equity</span>
            <Wallet size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">${totalEquity.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
          <div className="text-xs text-slate-500 mt-1">Available: $8,450.00</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Unrealized P&L</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 flex items-center gap-1">
            <ArrowUpRight size={20} />
            ${unrealizedPnL.toFixed(2)}
          </div>
          <div className="text-xs text-emerald-500/70 mt-1">+2.84% all-time</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Active Strategies</span>
            <Activity size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">1 <span className="text-sm text-slate-500 font-normal">/ 3</span></div>
          <div className="text-xs text-slate-500 mt-1">Running Volatility Grid</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg flex flex-col justify-center gap-3">
          <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Plus size={14} /> Deposit Funds
          </button>
          <button className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
            <ArrowRightLeft size={14} /> Withdraw
          </button>
        </div>
      </div>

      {/* ACCOUNT HEALTH BAR */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-slate-400 font-bold tracking-wider uppercase flex items-center gap-2">
            <ShieldCheck size={16} className={marginUsed < 50 ? 'text-emerald-400' : 'text-amber-400'} />
            Margin Utilization Health
          </span>
          <span className="text-sm font-bold text-white">{marginUsed}% Used</span>
        </div>
        <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden border border-slate-800 relative">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              marginUsed < 50 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 
              marginUsed < 80 ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 
              'bg-gradient-to-r from-red-600 to-red-400'
            }`}
            style={{ width: `${marginUsed}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-bold uppercase">
          <span>Safe (0-50%)</span>
          <span>Warning (50-80%)</span>
          <span>Danger (80-100%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ACTIVE STRATEGY WIDGET */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <div>
                <h3 className="font-bold text-white">Volatility Grid Engine</h3>
                <span className="text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">ETH/USDT • LIVE</span>
              </div>
            </div>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
              <Pause size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Allocated</div>
              <div className="text-lg font-bold text-white">$4,000.75</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Target (25%)</div>
              <div className="text-lg font-bold text-cyan-400">$5,000.93</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Runtime</div>
              <div className="text-lg font-bold text-slate-300">3d 14h</div>
            </div>
          </div>

          <div className="flex-1">
            <span className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-2 block">Recent Engine Activity</span>
            <div className="space-y-2">
              {[
                { type: 'Buy', amount: '0.05 ETH', price: '$3,420.50', time: '2 mins ago', color: 'text-emerald-400' },
                { type: 'Sell', amount: '0.05 ETH', price: '$3,445.10', time: '14 mins ago', color: 'text-red-400' },
                { type: 'Buy', amount: '0.05 ETH', price: '$3,410.20', time: '1 hr ago', color: 'text-emerald-400' },
              ].map((trade, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800/50 text-xs">
                  <span className={`font-bold ${trade.color}`}>{trade.type} {trade.amount}</span>
                  <span className="text-slate-300">@ {trade.price}</span>
                  <span className="text-slate-500">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MARKET SNAPSHOT */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xs text-slate-400 font-bold tracking-wider uppercase border-b border-slate-800 pb-3 mb-4">Market Snapshot</h3>
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-white">BTC/USDT</div>
                <div className="text-[10px] text-emerald-400">+1.24%</div>
              </div>
              <div className="w-20"><Sparkline data={btcData} color="#10b981" height={24} /></div>
              <div className="font-bold text-white">$65,500</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-white">ETH/USDT</div>
                <div className="text-[10px] text-red-400">-0.45%</div>
              </div>
              <div className="w-20"><Sparkline data={[3500, 3480, 3450, 3460, 3420]} color="#ef4444" height={24} /></div>
              <div className="font-bold text-white">$3,420</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-white">SOL/USDT</div>
                <div className="text-[10px] text-emerald-400">+4.12%</div>
              </div>
              <div className="w-20"><Sparkline data={[140, 142, 145, 148, 150]} color="#10b981" height={24} /></div>
              <div className="font-bold text-white">$150.25</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


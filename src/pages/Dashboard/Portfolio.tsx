import React from 'react';
import { PieChart, Activity, Wallet, TrendingUp } from 'lucide-react';

export default function Portfolio() {
  // Simulated portfolio data
  const holdings = [
    { asset: 'Ethereum', symbol: 'ETH', balance: '1.245', value: 4260.50, color: '#10b981', percent: 45 },
    { asset: 'Bitcoin', symbol: 'BTC', balance: '0.042', value: 2750.20, color: '#f97316', percent: 30 },
    { asset: 'Tether', symbol: 'USDT', balance: '2439.30', value: 2439.30, color: '#06b6d4', percent: 25 }
  ];

  const totalValue = holdings.reduce((acc, curr) => acc + curr.value, 0);

  // SVG Donut Math
  let currentOffset = 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Portfolio Ledger</h1>
        <p className="text-sm text-slate-400 mt-1">Cross-asset valuation and categorical distribution metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* DONUT CHART METRICS */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-2xl">
              {holdings.map((item, index) => {
                const dashArray = `${item.percent} ${100 - item.percent}`;
                const offset = currentOffset;
                currentOffset -= item.percent;
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="4"
                    strokeDasharray={dashArray}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000 ease-out"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-500 font-bold uppercase">Net Value</span>
              <span className="text-lg font-black text-white">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            {holdings.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.symbol}</span>
                </div>
                <span className="text-white font-bold">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* HOLDINGS TABLE */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Wallet size={16} className="text-cyan-400" />
            Active Ledger Holdings
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase">
                  <th className="pb-3 font-bold">Asset</th>
                  <th className="pb-3 font-bold text-right">Balance</th>
                  <th className="pb-3 font-bold text-right">Value (USD)</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {holdings.map((item, i) => (
                  <tr key={i} className="group hover:bg-slate-950/50 transition-colors">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-xs" style={{ color: item.color }}>
                        {item.symbol[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white">{item.asset}</div>
                        <div className="text-[10px] text-slate-500">{item.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 text-right font-mono text-slate-300">{item.balance}</td>
                    <td className="py-4 text-right font-mono text-white">${item.value.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className="py-4 text-right">
                      <button className="text-[10px] uppercase font-bold bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded transition-colors">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { History, Download, Filter, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export default function Transactions() {
  // Simulated historical data
  const transactions = [
    { id: 'TX-9942', date: '2026-05-21 09:14', type: 'Withdrawal', asset: 'USDT', amount: '-500.00', status: 'Pending', hash: '0x8f...3a1' },
    { id: 'TX-9941', date: '2026-05-20 14:22', type: 'Strategy Profit', asset: 'USDT', amount: '+42.50', status: 'Completed', hash: 'Internal' },
    { id: 'TX-9940', date: '2026-05-19 11:05', type: 'Manual Trade', asset: 'ETH', amount: '+0.45', status: 'Completed', hash: '0x2a...9c4' },
    { id: 'TX-9939', date: '2026-05-18 16:45', type: 'Deposit', asset: 'USDT', amount: '+4000.00', status: 'Completed', hash: '0x4d...1f8' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Global Audit Trail</h1>
          <p className="text-sm text-slate-400 mt-1">Cryptographic ledger of all inbound, outbound, and execution routing.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg">
            <Filter size={14} /> Filter
          </button>
          <button className="bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-600/40 text-cyan-400 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950/50 border-b border-slate-800">
              <tr className="text-xs text-slate-500 uppercase tracking-wider">
                <th className="p-4 font-bold">Date / Time</th>
                <th className="p-4 font-bold">Type</th>
                <th className="p-4 font-bold">Asset</th>
                <th className="p-4 font-bold text-right">Amount</th>
                <th className="p-4 font-bold text-center">Status</th>
                <th className="p-4 font-bold text-right">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {transactions.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-950/30 transition-colors">
                  <td className="p-4 text-slate-400 text-xs">{tx.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      {tx.type === 'Deposit' && <ArrowDownRight size={14} className="text-emerald-400" />}
                      {tx.type === 'Withdrawal' && <ArrowUpRight size={14} className="text-amber-400" />}
                      {tx.type.includes('Trade') || tx.type.includes('Profit') ? <RefreshCw size={14} className="text-cyan-400" /> : null}
                      {tx.type}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-white">{tx.asset}</td>
                  <td className={`p-4 text-right font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {tx.amount}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                      tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <a href="#" className="text-cyan-500 hover:text-cyan-400 text-xs font-mono transition-colors">{tx.hash}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Showing 1 to 4 of 4 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-800 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}


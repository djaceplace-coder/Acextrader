import React, { useState } from 'react';
import { Landmark, ArrowDownToLine, ArrowUpFromLine, AlertCircle, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function Banking() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'loan'>('deposit');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  
  // Simulated terminal state
  const currentBalance = 3450.00;
  const targetThreshold = 5000.00;
  const isWithdrawUnlocked = currentBalance >= targetThreshold;

  // Placeholder addresses for frontend simulation
  const MOCK_BTC_ADDRESS = "1M4CxHqAhCeWQnoF3HgmzhS4sxKgDWwF1g"; // Standard Genesis placeholder
  const MOCK_USDT_ADDRESS = "0x6420440fe3052422134229ff5ac904ec1aadf882"; // Standard burn/placeholder

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Banking & Settlement</h1>
        <p className="text-sm text-slate-400 mt-1">Manage inbound liquidity, collateralized margins, and outbound settlements.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${activeTab === 'deposit' ? 'bg-slate-800/50 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}
          >
            <ArrowDownToLine size={16} /> Deposit Funds
          </button>
          <button 
            onClick={() => setActiveTab('loan')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${activeTab === 'loan' ? 'bg-slate-800/50 text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}
          >
            <Landmark size={16} /> Margin / Loans
          </button>
          <button 
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${activeTab === 'withdraw' ? 'bg-slate-800/50 text-white border-b-2 border-white' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}
          >
            <ArrowUpFromLine size={16} /> Withdraw
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* DEPOSIT TAB */}
          {activeTab === 'deposit' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Inbound Liquidity Routing</h3>
                  <p className="text-sm text-slate-400">Select the network protocol to generate your designated smart contract vault address. Terminal balance updates require 2 block confirmations.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Landmark size={48} /></div>
                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">Bitcoin Network (BTC)</div>
                    <div className="font-mono text-sm text-white break-all">{MOCK_BTC_ADDRESS}</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Landmark size={48} /></div>
                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">Ethereum Network (ERC-20 USDT)</div>
                    <div className="font-mono text-sm text-white break-all">{MOCK_USDT_ADDRESS}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-xl p-8 text-center">
                <div className="w-48 h-48 bg-white rounded-lg p-2 mb-6 flex items-center justify-center">
                  <div className="w-full h-full border-4 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold text-xs text-center">
                    [QR SIMULATION UI]
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20">
                  <ShieldCheck size={14} /> Vault Addresses Active
                </div>
              </div>
            </div>
          )}

          {/* LOAN / MARGIN TAB */}
          {activeTab === 'loan' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-blue-950/20 border border-blue-900/50 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-blue-400 mt-0.5 shrink-0" size={18} />
                <div className="text-sm text-blue-200">
                  <span className="font-bold block mb-1">Collateralized Credit Line</span>
                  Institutional credit lines require a standard 15% upfront collateral deposit to active smart contract auditing vaults prior to disbursement.
                </div>
              </div>

              <form className="space-y-4 bg-slate-950 border border-slate-800 rounded-xl p-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Requested Credit Amount (USDT)</label>
                  <input type="number" placeholder="e.g. 10000" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none" />
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-sm mb-2 text-slate-400">
                    <span>Required Collateral (15%):</span>
                    <span className="text-white font-bold">1,500.00 USDT</span>
                  </div>
                  <div className="text-xs text-slate-500">Must be deposited to your dedicated ERC-20 routing address prior to auditing.</div>
                </div>
                <button type="button" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors">
                  Submit Auditing Request
                </button>
              </form>
            </div>
          )}

          {/* WITHDRAW TAB */}
          {activeTab === 'withdraw' && (
            <div className="max-w-2xl mx-auto">
              {!isWithdrawUnlocked ? (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-700">
                    <Lock size={24} className="text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Settlement Gateway Locked</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                    To protect execution integrity, outbound settlements are locked until your combined ledger balance and algorithmic profits reach the <span className="text-white font-bold">${targetThreshold.toFixed(2)}</span> threshold.
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-slate-800 text-left">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-400">Current Progress</span>
                      <span className="text-cyan-400">{((currentBalance / targetThreshold) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: `${(currentBalance / targetThreshold) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-2 font-mono">
                      <span className="text-slate-500">${currentBalance.toFixed(2)}</span>
                      <span className="text-slate-500">${targetThreshold.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="space-y-6">
                  <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-sm font-bold">
                    <CheckCircle2 size={18} /> Gateway Unlocked. Available: ${currentBalance.toFixed(2)}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Settlement Network</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none">
                      <option>ERC-20 (Ethereum)</option>
                      <option>TRC-20 (Tron)</option>
                      <option>Bitcoin Network</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Destination Address</label>
                    <input type="text" placeholder="0x..." className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Amount</label>
                    <div className="relative">
                      <input type="number" placeholder="0.00" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none" />
                      <button type="button" onClick={() => setWithdrawAmount(currentBalance.toString())} className="absolute right-3 top-2.5 text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded font-bold">MAX</button>
                    </div>
                  </div>

                  <button type="button" className="w-full py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-xl font-black uppercase tracking-wide transition-colors">
                    Request Settlement
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


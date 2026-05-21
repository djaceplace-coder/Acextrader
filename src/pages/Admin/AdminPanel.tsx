import React, { useState, useEffect } from 'react';
import { Lock, Search, AlertCircle } from 'lucide-react';

const ADMIN_PASSKEY = "ACEX-2026-ADMIN";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');

  useEffect(() => {
    const storedKey = localStorage.getItem('admin_key');
    if (storedKey === ADMIN_PASSKEY) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === ADMIN_PASSKEY) {
      localStorage.setItem('admin_key', ADMIN_PASSKEY);
      setIsAuthenticated(true);
    } else {
      alert("Invalid Passkey. Override Denied.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-xl max-w-md w-full shadow-2xl">
          <div className="flex items-center gap-3 mb-6 text-cyan-400">
            <Lock size={24} />
            <h2 className="text-xl font-mono font-bold">Terminal Override</h2>
          </div>
          <input
            type="password"
            value={passkeyInput}
            onChange={(e) => setPasskeyInput(e.target.value)}
            placeholder="Enter Admin Passkey"
            className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white mb-4 font-mono focus:border-cyan-500 focus:outline-none"
          />
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded transition-colors">
            Access Controls
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-mono">
      <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-2xl text-white font-bold tracking-tight">ACEX Admin Console</h1>
        <button 
          onClick={() => { localStorage.removeItem('admin_key'); setIsAuthenticated(false); }}
          className="text-slate-400 hover:text-red-400 transition-colors text-sm"
        >
          Terminate Session
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Editor Widget */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl col-span-1">
          <h3 className="text-lg font-bold text-white mb-4">Balance Editor (Client Override)</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Target User Email</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-slate-500" />
                <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded p-2 pl-9" placeholder="user@domain.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Environment</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200">
                  <option>Demo</option>
                  <option>Live</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Asset</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200">
                  <option>USDT</option>
                  <option>ETH</option>
                  <option>BTC</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Amount</label>
              <input type="number" className="w-full bg-slate-950 border border-slate-700 rounded p-2" placeholder="0.00" />
            </div>
            <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded mt-2 transition-colors">
              Commit Ledger Update
            </button>
          </form>
        </div>

        {/* Dashboard Stats */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
               <div className="text-sm text-slate-400">Total Users</div>
               <div className="text-2xl text-white font-bold">1,248</div>
             </div>
             <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
               <div className="text-sm text-slate-400">Active Bots</div>
               <div className="text-2xl text-white font-bold">342</div>
             </div>
          </div>
          
          {/* Pending Withdrawals */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-4">Pending Withdrawals Queue</h3>
            <div className="flex items-center gap-3 text-slate-400 p-4 border border-slate-800 rounded bg-slate-950/50">
              <AlertCircle size={18} className="text-amber-500" />
              <span>No pending withdrawals at this time.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


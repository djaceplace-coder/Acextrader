import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Key, ShieldCheck, Wallet, ArrowRight, Activity } from 'lucide-react';

export default function AuthHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'email' | 'web3'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleBypassLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary bypass to allow UI building without a backend
    window.location.hash = '#/dashboard';
  };

  const handleWalletConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      window.location.hash = '#/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center gap-3 mb-8">
          <img src="./acextrader.png" alt="AceX Logo" className="h-12 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <h2 className="text-3xl font-black text-white font-mono tracking-tighter">ACEX TRADER</h2>
        </div>
        <h2 className="text-center text-xl font-bold tracking-tight text-slate-300">
          Terminal Access Gateway
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] sm:rounded-2xl sm:px-10">
          
          {/* Auth Toggle Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-xl mb-8 border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'email' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Mail size={16} /> Email Hub
            </button>
            <button
              onClick={() => setActiveTab('web3')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'web3' ? 'bg-cyan-600/20 text-cyan-400 shadow-md' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Wallet size={16} /> Web3 Wallet
            </button>
          </div>

          {activeTab === 'email' ? (
            <form onSubmit={handleBypassLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-600" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm font-mono transition-colors"
                    placeholder="trader@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Secure Passkey</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-slate-600" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm font-mono transition-colors"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  <ShieldCheck size={14} /> Tier 0 — SSL Encrypted
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400 transition-colors">Forgot passkey?</a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900 transition-all active:scale-[0.99]"
              >
                Authenticate & Enter
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Web3 Injection Ready</h3>
                  <p className="text-xs text-slate-400">Connect a non-custodial wallet to instantly sign in via EIP-4361 standard.</p>
                </div>
              </div>
              
              <button
                onClick={handleWalletConnect}
                disabled={isConnecting}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-cyan-500/30 rounded-xl shadow-lg text-sm font-bold text-cyan-400 bg-cyan-950/20 hover:bg-cyan-900/40 focus:outline-none transition-all disabled:opacity-50"
              >
                {isConnecting ? (
                  <><Activity size={18} className="animate-spin" /> Negotiating Handshake...</>
                ) : (
                  <><Wallet size={18} /> Link MetaMask <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          )}
        </div>
        
        <p className="mt-6 text-center text-xs text-slate-500 max-w-sm mx-auto">
          By connecting, you agree to our Terms of Service. IP addresses are masked during active terminal sessions.
        </p>
      </div>
    </div>
  );
}


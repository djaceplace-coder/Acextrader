import React, { useState } from 'react';
import { Shield, HelpCircle, Activity, TrendingUp, DollarSign, Lock } from 'lucide-react';

interface StrategyModel {
  id: string;
  name: string;
  description: string;
  risk: 'Low' | 'Med' | 'High';
  apr: string;
  minCapital: number;
}

export default function StrategyCenter() {
  // Hardcoded USDT receiving wallet address parameter
  const DEPOSIT_VAULT_ADDRESS = "0x71C461625C13306d64C3d1ef9A066dB67A203f9b";
  
  // Simulated available balance for validation structures
  const [availableBalance, setAvailableBalance] = useState<number>(3450.00);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('grid');
  const [allocationAmount, setAllocationAmount] = useState<string>('');
  const [duration, setDuration] = useState<string>('14');
  const [autoCompound, setAutoCompound] = useState<boolean>(true);
  const [riskChecked, setRiskChecked] = useState<boolean>(false);
  const [isActiveSession, setIsActiveSession] = useState<boolean>(false);

  const strategies: StrategyModel[] = [
    { id: 'grid', name: 'Volatility Grid Engine', description: 'Captures high frequency price volatility within optimized horizontal channels. Engineered primarily for consolidating side-trend distributions.', risk: 'Low', apr: '18.4% - 24.1%', minCapital: 250 },
    { id: 'momentum', name: 'Momentum Breakout Tracker', description: 'Tracks macro trend-line break structures utilizing progressive dynamic trailing stop limits. Tailored for heavy parabolic volatility sweeps.', risk: 'Med', apr: '32.8% - 45.2%', minCapital: 500 },
    { id: 'arbitrage', name: 'Cross-DEX Arbitrage Scan', description: 'Executes rapid low-latency flash atomic loops detecting inefficiencies across alternative liquidity pairs.', risk: 'High', apr: '52.1% - 78.4%', minCapital: 1000 }
  ];

  const currentStrategy = strategies.find(s => s.id === selectedStrategy);
  const projectedReturn = allocationAmount 
    ? (parseFloat(allocationAmount) * (parseFloat(currentStrategy?.apr.split('%')[0] || '0') / 100) * (parseInt(duration) / 365)).toFixed(2)
    : '0.00';

  // Core programmatic threshold verification rule
  const systemRequiresSecurityHold = (parseFloat(allocationAmount) + availableBalance) >= 5000;

  const handleActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocationAmount || parseFloat(allocationAmount) < (currentStrategy?.minCapital || 0)) return;
    if (parseFloat(allocationAmount) > availableBalance) return;
    if (!riskChecked) return;

    setIsActiveSession(true);
    setAvailableBalance(prev => prev - parseFloat(allocationAmount));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-mono">
      <div>
        <h1 className="text-2xl font-bold font-mono tracking-tight text-white">Execution Models</h1>
        <p className="text-sm text-slate-400 mt-1">Deploy automated quantitative routing rules directly against decentralized liquidity frameworks.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* CONFIGURATION & ALLOCATION FORM PANEL */}
        <div className="xl:col-span-2 space-y-6">
          {!isActiveSession ? (
            <form onSubmit={handleActivation} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Activity size={18} className="text-cyan-400" />
                Initialize Bot Parameters
              </h2>

              {/* 1. SELECT ALGORITHMIC METHOD */}
              <div className="space-y-3">
                <label className="text-xs text-slate-400 font-bold tracking-wider uppercase">1. Select Strategy Template</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {strategies.map((strat) => (
                    <div 
                      key={strat.id}
                      onClick={() => { setSelectedStrategy(strat.id); setRiskChecked(false); }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedStrategy === 'strat.id' || selectedStrategy === strat.id
                          ? 'bg-slate-950 border-cyan-500 shadow-lg shadow-cyan-950/30' 
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-white">{strat.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            strat.risk === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                            strat.risk === 'Med' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                          }`}>{strat.risk} Risk</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{strat.description}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-900/60 flex justify-between items-center text-xs">
                        <span className="text-slate-500">Est. APR</span>
                        <span className="text-cyan-400 font-bold">{strat.apr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. SPECIFY FINANCIAL ALLOCATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <label className="text-slate-400">2. Capital Allocation</label>
                    <span className="text-slate-500">Available: ${availableBalance.toFixed(2)} USDT</span>
                  </div>
                  <div className="relative">
                    <input 
                      type="number"
                      value={allocationAmount}
                      onChange={(e) => setAllocationAmount(e.target.value)}
                      placeholder={`Min. $${currentStrategy?.minCapital}`}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors pl-8 font-mono text-sm"
                    />
                    <DollarSign size={14} className="absolute left-3 top-4 text-slate-500" />
                    <button 
                      type="button"
                      onClick={() => setAllocationAmount(availableBalance.toString())}
                      className="absolute right-3 top-2.5 text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-slate-400 font-bold tracking-wider uppercase">3. Lock Commitment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['14', '21', '28'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                          duration === d 
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' 
                            : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* AUTOMATIC COMPOUND TOGGLE */}
              <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl">
                <div>
                  <span className="text-sm font-bold text-white block">Auto-Compound Yield Pools</span>
                  <span className="text-xs text-slate-500 font-sans">Automatically reinvest realized cycle profits back into execution lot sizes.</span>
                </div>
                <input 
                  type="checkbox"
                  checked={autoCompound}
                  onChange={(e) => setAutoCompound(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* CRITICAL HISTORICAL NO-GUARANTEE CLAUSE */}
              <div className="p-3 bg-slate-950 border border-dashed border-slate-800 rounded-xl flex items-start gap-3 text-[11px] text-slate-400 font-sans leading-relaxed">
                <HelpCircle size={16} className="text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-xs font-bold text-slate-300 block mb-1">Algorithmic Performance Matrix Notice</span>
                  Projections are hypothetical. Past performance does not guarantee future results. Estimated metrics do not account for unmitigated directional slippage or cross-pool liquidity drainages.
                </div>
              </div>

              {/* SYSTEM CONDITIONAL POLICY HIGHLIGHT */}
              {systemRequiresSecurityHold && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-xs text-amber-400">
                  <Lock size={16} className="shrink-0" />
                  <span>Security Notice: Dynamic operations hitting values over $5,000 generate systematic validation reviews upon payout matching compliance infrastructure standards.</span>
                </div>
              )}

              {/* RISK CONFIRMATION CHECKBOX */}
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox"
                  id="risk-check"
                  checked={riskChecked}
                  onChange={(e) => setRiskChecked(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-cyan-500 cursor-pointer shrink-0"
                />
                <label htmlFor="risk-check" className="text-xs text-slate-400 cursor-pointer font-sans leading-relaxed">
                  I understand that trading involves substantial risk of loss and is not suitable for all investors.
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={!riskChecked || !allocationAmount || parseFloat(allocationAmount) > availableBalance || parseFloat(allocationAmount) < (currentStrategy?.minCapital || 0)}
                className="w-full py-4 rounded-xl font-bold tracking-wide transition-all uppercase text-sm disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:from-cyan-500 hover:to-blue-500 active:scale-[0.99]"
              >
                Activate Strategy
              </button>
            </form>
          ) : (
            /* ACTIVE RUNNING BOT TERMINAL VIEWS */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <h3 className="font-bold text-white text-base">{currentStrategy?.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">DEMO ENGINE</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsActiveSession(false);
                    setAvailableBalance(prev => prev + parseFloat(allocationAmount));
                  }}
                  className="text-xs border border-red-500/30 hover:border-red-500 text-red-400 bg-red-950/10 px-4 py-2 rounded-xl transition-colors font-bold"
                >
                  Terminate Execution Session
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Allocated Capital</span>
                  <span className="text-xl font-bold font-mono text-white">${parseFloat(allocationAmount).toFixed(2)} USDT</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Current Cycle Profit</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">+$12.42 USDT</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Active Life Tracking</span>
                  <span className="text-xl font-bold font-mono text-slate-300">0d 0h 04m 12s</span>
                </div>
              </div>

              {/* LIVE JOURNAL SIMULATED LOG DATA */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-bold tracking-wider uppercase block">Real-Time Operational Journal</span>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto text-slate-300">
                  <div className="flex gap-4"><span className="text-slate-500">[12:44:01]</span><span className="text-amber-400 font-bold">[SIMULATED]</span><span className="text-slate-400">Scanning cross-dex liquidity distribution tables...</span></div>
                  <div className="flex gap-4"><span className="text-slate-500">[12:44:03]</span><span className="text-amber-400 font-bold">[SIMULATED]</span><span className="text-emerald-400">Buy Execution filled: 0.045 ETH at $3,421.10</span></div>
                  <div className="flex gap-4"><span className="text-slate-500">[12:44:15]</span><span className="text-amber-400 font-bold">[SIMULATED]</span><span className="text-cyan-400">Rebalancing order metrics. Target spread tracking active.</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SIDE BAR SYSTEM DATA METRICS */}
        <div className="space-y-6 col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Shield size={16} className="text-cyan-400" />
              Secure Inbound Gateway
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">Direct Contract Deposit Vault (USDT/USDC)</span>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl font-mono text-xs select-all text-cyan-400 border-dashed break-all text-center">
                  {DEPOSIT_VAULT_ADDRESS}
                </div>
              </div>

              <div className="text-[11px] font-sans text-slate-400 leading-relaxed space-y-2">
                <p>• Inbound transfers sent to this multi-sig cold pool map directly to your system tracking logs within 2 network confirmations.</p>
                <p>• Supported settlement chains: Ethereum Mainnet, Arbitrum One, and BSC Network.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


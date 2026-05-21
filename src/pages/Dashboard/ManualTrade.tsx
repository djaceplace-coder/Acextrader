import React, { useState } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown, Info, Wallet, Activity } from 'lucide-react';

export default function ManualTrade() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [asset, setAsset] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('3420.50');
  const [slippage, setSlippage] = useState('0.5');
  
  const availableBalance = 8450.00;
  const estTotal = parseFloat(amount || '0') * parseFloat(price);
  const estFee = estTotal * 0.002; // 0.2% fee

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Manual Execution Desk</h1>
        <p className="text-sm text-slate-400 mt-1">Direct algorithmic order routing to aggregated decentralized liquidity pools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ORDER ENTRY CARD */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => setOrderType('market')}
                className={`px-4 py-1.5 text-xs font-bold rounded transition-all ${orderType === 'market' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Market
              </button>
              <button 
                onClick={() => setOrderType('limit')}
                className={`px-4 py-1.5 text-xs font-bold rounded transition-all ${orderType === 'limit' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Limit
              </button>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Wallet size={14} className="text-cyan-400" /> Avail: ${availableBalance.toFixed(2)}
            </div>
          </div>

          <form className="space-y-6">
            {/* Asset & Direction */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Asset Pair</label>
                <select 
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="BTC">BTC / USDT</option>
                  <option value="ETH">ETH / USDT</option>
                  <option value="SOL">SOL / USDT</option>
                  <option value="LINK">LINK / USDT</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Direction</label>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setDirection('long')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border ${
                      direction === 'long' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <TrendingUp size={14} /> Long
                  </button>
                  <button 
                    type="button"
                    onClick={() => setDirection('short')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border ${
                      direction === 'short' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <TrendingDown size={14} /> Short
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              {orderType === 'limit' && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Limit Price (USDT)</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              )}
              
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                  <label>Amount ({asset})</label>
                </div>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none pl-4"
                  />
                  <button 
                    type="button"
                    onClick={() => setAmount((availableBalance / parseFloat(price)).toFixed(4))}
                    className="absolute right-3 top-2.5 text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 transition-colors font-bold"
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>

            {/* Slippage & Summary */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold uppercase">Slippage Tolerance</span>
                <div className="flex gap-2">
                  {['0.5', '1.0', '2.0'].map(val => (
                    <button 
                      key={val}
                      type="button"
                      onClick={() => setSlippage(val)}
                      className={`text-[10px] px-2 py-1 rounded border font-bold ${
                        slippage === val ? 'bg-slate-800 border-slate-600 text-white' : 'border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Est. Execution Total:</span>
                  <span className="text-white">${estTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Routing Fee (0.2%):</span>
                  <span className="text-white">${estFee.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`w-full py-4 rounded-xl font-black tracking-widest uppercase text-sm transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 ${
                direction === 'long' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-emerald-900/50' 
                  : 'bg-gradient-to-r from-rose-600 to-rose-500 text-white hover:from-rose-500 hover:to-rose-400 shadow-rose-900/50'
              }`}
            >
              <ArrowRightLeft size={16} /> 
              {direction === 'long' ? 'Execute Long' : 'Execute Short'} Position
            </button>
          </form>
        </div>

        {/* MARKET INFO BAR */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
             <div className="text-center mb-6">
                <div className="text-3xl font-black text-white">${price}</div>
                <div className="text-xs text-emerald-400 mt-1">+1.24% (24h)</div>
             </div>
             
             <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>24h High</span>
                  <span className="text-slate-200">$3,480.20</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>24h Low</span>
                  <span className="text-slate-200">$3,310.50</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>24h Vol</span>
                  <span className="text-slate-200">14.2B</span>
                </div>
             </div>
          </div>

          <div className="p-4 bg-blue-950/20 border border-blue-900/50 rounded-xl flex items-start gap-3 text-xs text-blue-300 font-sans leading-relaxed">
            <Info size={16} className="shrink-0 mt-0.5 text-blue-400" />
            <div>
              <span className="font-bold text-blue-200 block mb-1">Execution Notice</span>
              Manual trades bypass algorithmic grid configurations. Ensure sufficient margin before initiating high-leverage positions to avoid automated liquidation sweeps.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


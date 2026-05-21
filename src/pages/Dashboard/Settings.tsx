import React from 'react';
import { User, Shield, Bell, MonitorSmartphone, LogOut } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Terminal Preferences</h1>
        <p className="text-sm text-slate-400 mt-1">Manage security parameters, notifications, and active sessions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-900 border border-slate-700 text-cyan-400 rounded-xl font-bold text-sm shadow-lg">
            <User size={16} /> Profile Details
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 rounded-xl font-bold text-sm transition-colors">
            <Shield size={16} /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 rounded-xl font-bold text-sm transition-colors">
            <Bell size={16} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 rounded-xl font-bold text-sm transition-colors">
            <MonitorSmartphone size={16} /> Active Sessions
          </button>
        </div>

        {/* Main Settings Panel */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">Identity & Display</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Registered Email</label>
                <input type="email" disabled value="user@domain.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-500 cursor-not-allowed" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Linked Web3 Address</label>
                <div className="flex gap-2">
                  <input type="text" disabled value="0x7a...3f92" className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-500 font-bold font-mono cursor-not-allowed" />
                  <button type="button" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors">Unlink</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Base Currency</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none">
                    <option>USD (USDT)</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Timezone</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 focus:outline-none">
                    <option>UTC (Default)</option>
                    <option>EST (New York)</option>
                    <option>WAT (Lagos)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <button type="button" className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-cyan-900/50">
                  Save Preferences
                </button>
              </div>
            </form>
          </div>

          <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6">
             <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
               <LogOut size={16} /> Danger Zone
             </h3>
             <p className="text-xs text-slate-400 mb-4 leading-relaxed">Deactivating your account will instantly terminate any active execution strategies and trigger a mandatory 30-day collateral settlement lock.</p>
             <button className="bg-red-900/50 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-red-700/50">
               Initiate Account Closure
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}


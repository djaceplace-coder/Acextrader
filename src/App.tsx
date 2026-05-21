import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ShieldAlert, RefreshCw } from 'lucide-react';

// Layout Wrappers
import DashboardLayout from './layouts/DashboardLayout';

// Core Pages (To be built sequentially)
import StrategyCenter from './pages/Dashboard/StrategyCenter';
import AdminPanel from './pages/Admin/AdminPanel';

// --- INLINE CIRCUIT BREAKER (ERROR BOUNDARY) ---
interface GuardProps { children: React.ReactNode; }
interface GuardState { hasError: boolean; errorText: string; }

className RouteCircuitBreaker extends React.Component<GuardProps, GuardState> {
  constructor(props: GuardProps) {
    super(props);
    this.state = { hasError: false, errorText: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorText: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-slate-900 border border-red-500/30 rounded-2xl max-w-xl mx-auto my-12 font-mono">
          <div className="flex items-center gap-3 text-red-400 mb-4">
            <ShieldAlert size={24} />
            <h2 className="text-lg font-bold">Terminal Interface Isolated</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            A background data parsing execution anomaly occurred. The terminal state has been preserved to prevent asset loss.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl text-[11px] text-red-300 border border-slate-800 break-all mb-4">
            Code Trace: {this.state.errorText || "Unknown Execution Reference"}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <RefreshCw size={14} /> Reset Terminal Interface
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- TEMPORARY INTERFACE PLACEHOLDERS FOR ROUTE VALIDATION ---
const PlaceholderLanding = () => <div className="p-8 text-slate-400 font-mono">Landing Page Expansion Hub.</div>;
const PlaceholderAuth = () => <div className="p-8 text-slate-400 font-mono">Authentication & Web3 Link Desk.</div>;
const PlaceholderHome = () => <div className="p-8 text-slate-400 font-mono">Overview Dashboard Main View.</div>;
const PlaceholderTrade = () => <div className="p-8 text-slate-400 font-mono">Manual Order Entry Desk.</div>;
const PlaceholderPortfolio = () => <div className="p-8 text-slate-400 font-mono">Portfolio Analytics Ledger.</div>;
const PlaceholderTransactions = () => <div className="p-8 text-slate-400 font-mono">Global Audit Trail Logs.</div>;
const PlaceholderBanking = () => <div className="p-8 text-slate-400 font-mono">Inbound / Outbound Settlement Hub.</div>;
const PlaceholderSettings = () => <div className="p-8 text-slate-400 font-mono">Terminal Preference Parameters.</div>;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Temporarily true for layout buildout
  const [tradingMode, setTradingMode] = useState<'DEMO' | 'LIVE'>('DEMO');

  return (
    <HashRouter>
      <Routes>
        {/* Public Suite Routes */}
        <Route path="/" element={<RouteCircuitBreaker><PlaceholderLanding /></RouteCircuitBreaker>} />
        <Route path="/auth" element={<RouteCircuitBreaker><PlaceholderAuth /></RouteCircuitBreaker>} />

        {/* Protected DeFi Terminal Workspace */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <RouteCircuitBreaker>
                <DashboardLayout mode={tradingMode} setMode={setTradingMode} />
              </RouteCircuitBreaker>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        >
          <Route index element={<PlaceholderHome />} />
          <Route path="strategy" element={<StrategyCenter />} />
          <Route path="trade" element={<PlaceholderTrade />} />
          <Route path="portfolio" element={<PlaceholderPortfolio />} />
          <Route path="transactions" element={<PlaceholderTransactions />} />
          <Route path="banking" element={<PlaceholderBanking />} />
          <Route path="settings" element={<PlaceholderSettings />} />
        </Route>

        {/* Hidden Control Override Dashboard */}
        <Route path="/admin" element={<RouteCircuitBreaker><AdminPanel /></RouteCircuitBreaker>} />

        {/* Global Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}


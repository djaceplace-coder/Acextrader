import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShieldAlert, RefreshCw } from 'lucide-react';

// ==========================================
// 1. IMPORT COMPLETED COMPONENTS
// ==========================================
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import AuthHub from './pages/AuthHub';
import DashboardHome from './pages/Dashboard/DashboardHome';
import StrategyCenter from './pages/Dashboard/StrategyCenter';
import ManualTrade from './pages/Dashboard/ManualTrade';
import Banking from './pages/Dashboard/Banking';
import Portfolio from './pages/Dashboard/Portfolio';
import AdminPanel from './pages/Admin/AdminPanel';

// ==========================================
// 2. INLINE PLACEHOLDERS (FOR FINAL UNBUILT PAGES)
// ==========================================
const TransactionsPlaceholder = () => <div className="p-8 text-slate-400 font-mono">Transaction Logs Building...</div>;
const SettingsPlaceholder = () => <div className="p-8 text-slate-400 font-mono">Settings Building...</div>;

// ==========================================
// 3. CIRCUIT BREAKER (ERROR BOUNDARY)
// ==========================================
interface GuardProps { children: React.ReactNode; }
interface GuardState { hasError: boolean; errorText: string; }

class RouteCircuitBreaker extends React.Component<GuardProps, GuardState> {
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
            A background data parsing execution anomaly occurred. The terminal state has been preserved.
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

// ==========================================
// 4. MAIN ROUTER APPLICATION
// ==========================================
export default function App() {
  // Set this to true temporarily so you can view the dashboard without a backend
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); 
  const [tradingMode, setTradingMode] = useState<'DEMO' | 'LIVE'>('DEMO');

  return (
    <HashRouter>
      <Routes>
        {/* Public Suite Routes */}
        <Route path="/" element={<RouteCircuitBreaker><LandingPage /></RouteCircuitBreaker>} />
        <Route path="/auth" element={<RouteCircuitBreaker><AuthHub /></RouteCircuitBreaker>} />

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
          <Route index element={<DashboardHome />} />
          <Route path="strategy" element={<StrategyCenter />} />
          <Route path="trade" element={<ManualTrade />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="banking" element={<Banking />} />
          <Route path="transactions" element={<TransactionsPlaceholder />} />
          <Route path="settings" element={<SettingsPlaceholder />} />
        </Route>

        {/* Hidden Control Override Dashboard */}
        <Route path="/admin" element={<RouteCircuitBreaker><AdminPanel /></RouteCircuitBreaker>} />

        {/* Global Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LedgerPage from './pages/LedgerPage';
import LiveCasinoPage from './pages/LiveCasinoPage';
import StatementPage from './pages/StatementPage';

// Games
import IplPredictor from './pages/games/IplPredictor';
import BrickTower from './pages/games/BrickTower';
import Minesweeper from './pages/games/Minesweeper';
import ReactionGame from './pages/games/ReactionGame';
import WordGuess from './pages/games/WordGuess';
import MemoryMatch from './pages/games/MemoryMatch';

// Components
import Navbar from './components/Navbar';
import BottomTabBar from './components/BottomTabBar';
import LogoutModal from './components/LogoutModal';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/home') return 'home';
    if (path === '/ledger') return 'ledger';
    if (path === '/live') return 'live';
    if (path === '/statement') return 'statement';
    return 'home';
  };

  const handleLogin = (isDemo: boolean) => {
    setIsLoggedIn(true);
    setIsDemoMode(isDemo);
    navigate('/home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDemoMode(false);
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  if (!isLoggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Routes location={location}>
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} />} 
            />
            
            <Route
              path="/*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar isDemoMode={isDemoMode} />
                  <main className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/ledger" element={<LedgerPage />} />
                      <Route path="/live" element={<LiveCasinoPage />} />
                      <Route path="/statement" element={<StatementPage />} />
                      <Route path="/game/ipl" element={<IplPredictor />} />
                      <Route path="/game/tower" element={<BrickTower />} />
                      <Route path="/game/minesweeper" element={<Minesweeper />} />
                      <Route path="/game/reaction" element={<ReactionGame />} />
                      <Route path="/game/wordle" element={<WordGuess />} />
                      <Route path="/game/memory" element={<MemoryMatch />} />
                      <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                  </main>
                  <BottomTabBar 
                    activeTab={getActiveTab()} 
                    onLogoutClick={() => setIsLogoutModalOpen(true)} 
                  />
                </div>
              }
            />
          </Routes>
        </div>
      </AnimatePresence>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

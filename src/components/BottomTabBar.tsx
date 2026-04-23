import React from 'react';
import { Home, List, PlayCircle, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BottomTabBarProps {
  activeTab: string;
  onLogoutClick: () => void;
}

export default function BottomTabBar({ activeTab, onLogoutClick }: BottomTabBarProps) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'ledger', icon: List, label: 'Ledger', path: '/ledger' },
    { id: 'live', icon: PlayCircle, label: 'Live Casino', path: '/live' },
    { id: 'statement', icon: FileText, label: 'Statement', path: '/statement' },
    { id: 'logout', icon: LogOut, label: 'Logout', action: onLogoutClick },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-[430px] bg-casino-bg border-t border-white/10 flex items-center justify-around py-2 px-1 pointer-events-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => tab.action ? tab.action() : navigate(tab.path!)}
            className={`flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
              activeTab === tab.id ? 'text-casino-gold' : 'text-zinc-500'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

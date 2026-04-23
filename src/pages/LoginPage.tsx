import React, { useState } from 'react';
import { motion } from 'motion/react';
import Logo from '../components/Logo';

interface LoginPageProps {
  onLogin: (isDemo: boolean) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Invalid credentials. Please try again.');
  };

  const handleDemoLogin = () => {
    onLogin(true);
  };

  return (
    <div className="min-h-screen gold-gradient flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl" />
      <div className="absolute top-[20%] right-[-5%] w-32 h-32 bg-casino-gold/40 rounded-full blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm backdrop-blur-card p-8 rounded-[24px] shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo className="text-5xl mb-2" dark />
          <h2 className="text-2xl font-display text-black/80 uppercase tracking-tight">Welcome Back!</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-2 border-casino-pink/30 rounded-full px-6 py-3.5 text-black placeholder:text-black/40 focus:border-casino-pink focus:outline-none transition-all font-medium"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-2 border-casino-pink/30 rounded-full px-6 py-3.5 text-black placeholder:text-black/40 focus:border-casino-pink focus:outline-none transition-all font-medium"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-red-700 text-xs font-bold text-center px-4"
            >
              {error}
            </motion.div>
          )}

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="w-full bg-casino-pink text-white font-bold py-4 rounded-full shadow-lg shadow-casino-pink/30 hover:bg-casino-pink/90 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full bg-casino-pink/80 text-white font-bold py-4 rounded-full shadow-lg shadow-casino-pink/20 hover:bg-casino-pink/90 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
            >
              Demo Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-[10px] text-black/50 font-medium leading-relaxed">
          Note: This platform is for entertainment purposes only.
        </p>
      </motion.div>
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="w-full max-w-xs bg-casino-card border border-casino-gold/30 rounded-3xl p-8 pointer-events-auto shadow-[0_0_50px_rgba(245,197,24,0.1)]">
              <div className="flex justify-center mb-6">
                <Logo className="text-4xl" />
              </div>
              
              <h3 className="text-center text-lg font-display font-bold text-white mb-8 leading-tight">
                Are you sure you want to logout?
              </h3>
              
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-casino-gold text-casino-gold font-bold rounded-full text-sm uppercase tracking-wider hover:bg-casino-gold/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 bg-casino-pink text-white font-bold rounded-full text-sm uppercase tracking-wider hover:bg-casino-pink/90 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

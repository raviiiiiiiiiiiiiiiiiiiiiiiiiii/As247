import React from 'react';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export default function Logo({ className = "text-3xl", dark = false }: LogoProps) {
  return (
    <div className={`logo-text ${className} flex items-center leading-none tracking-tighter`}>
      <span className={dark ? "text-black" : "text-white"}>BETTING</span>
      <span className={dark ? "text-black ml-1.5 opacity-90" : "text-casino-gold mx-1"}>KING</span>
    </div>
  );
}

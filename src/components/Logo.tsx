import React from 'react';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export default function Logo({ className = "text-3xl", dark = false }: LogoProps) {
  return (
    <div className={`logo-text ${className} flex items-center leading-none`}>
      <span className={dark ? "text-black" : "text-white"}>2</span>
      <span className="text-casino-pink mx-0.5">▲</span>
      <span className={dark ? "text-black" : "text-white"}>7</span>
    </div>
  );
}

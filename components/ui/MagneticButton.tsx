'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  children: React.ReactNode;
  className?: string;
  cursorText?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MagneticButton({
  variant = 'primary',
  children,
  className,
  cursorText,
  disabled,
  type = 'button',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useAppStore();

  const [isHovered, setIsHovered] = useState(false);

  // Springs for 8-12px magnetic offset
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const maxDistance = 12;
    const factor = 0.28;
    const moveX = Math.max(-maxDistance, Math.min(maxDistance, distanceX * factor));
    const moveY = Math.max(-maxDistance, Math.min(maxDistance, distanceY * factor));

    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cursorText) {
      setCursor('link', cursorText);
    } else {
      setCursor('link');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    resetCursor();
  };

  // Base styles
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'bg-[#f7f4ed] text-[#12100e] hover:bg-[#ede8df] hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] border border-[#ede8df]';
  } else if (variant === 'gold') {
    variantStyles =
      'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#b89047] text-[#0c0a09] font-medium shadow-[0_4px_20px_rgba(197,160,89,0.25)] hover:shadow-[0_0_35px_rgba(197,160,89,0.5)] border border-[#dfba73]';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-transparent text-[#f7f4ed] border border-[#c5a059]/40 hover:border-[#c5a059] hover:bg-[#c5a059]/10 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)]';
  } else if (variant === 'ghost') {
    variantStyles =
      'bg-transparent text-[#ede8df] hover:text-[#c5a059] border border-transparent';
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'shimmer-button relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase rounded-full transition-all duration-300 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          variantStyles,
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    </motion.div>
  );
}

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAppStore } from '@/lib/store';

export default function CustomCursor() {
  const { cursorVariant, cursorText } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High performance spring physics
  const springConfig = { damping: 30, stiffness: 280, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const visibleRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  // Determine size and styling based on variant
  const isTextCursor = ['product', '3d', 'drag', 'add', 'discover'].includes(cursorVariant);
  const displayText =
    cursorText ||
    (cursorVariant === 'product'
      ? 'VIEW'
      : cursorVariant === '3d'
      ? 'EXPLORE 3D'
      : cursorVariant === 'drag'
      ? 'DRAG'
      : cursorVariant === 'add'
      ? 'ADD'
      : cursorVariant === 'discover'
      ? 'DISCOVER'
      : '');

  return (
    <>
      {/* Center glowing pinpoint (zero lag direct pointer) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-[#f5e4bd]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          width: isTextCursor ? 0 : isClicking ? 10 : 6,
          height: isTextCursor ? 0 : isClicking ? 10 : 6,
          opacity: isTextCursor ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Outer fluid follower ring / badge - No heavy backdrop filter for 60fps */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          width: isTextCursor ? (cursorVariant === '3d' ? 90 : 76) : cursorVariant === 'link' ? 42 : 32,
          height: isTextCursor ? (cursorVariant === '3d' ? 90 : 76) : cursorVariant === 'link' ? 42 : 32,
          scale: isClicking ? 0.92 : 1,
          backgroundColor: isTextCursor ? 'rgba(18, 16, 14, 0.94)' : 'rgba(197, 160, 89, 0.04)',
          borderColor: isTextCursor ? '#c5a059' : 'rgba(197, 160, 89, 0.4)',
          boxShadow: isTextCursor
            ? '0 0 16px rgba(197, 160, 89, 0.28)'
            : '0 0 8px rgba(197, 160, 89, 0.1)',
        }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 300,
        }}
      >
        {isTextCursor && displayText && (
          <span className="text-[10px] font-medium tracking-[0.18em] text-[#f7e8c3] text-center uppercase select-none px-2">
            {displayText}
          </span>
        )}
      </motion.div>
    </>
  );
}

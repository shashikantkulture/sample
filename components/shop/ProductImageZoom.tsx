'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Move,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface ProductImageZoomProps {
  images: string[];
  selectedIndex: number;
  onSelectIndex?: (index: number) => void;
  productName: string;
  category?: string;
}

export default function ProductImageZoom({
  images,
  selectedIndex,
  onSelectIndex,
  productName,
  category,
}: ProductImageZoomProps) {
  const { setCursor, resetCursor } = useAppStore();

  // In-place inline zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(2.4);
  const [transformOrigin, setTransformOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Fullscreen Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const activeImage = images[selectedIndex] || images[0];

  // Mouse move handler for in-place zoom panning
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setTransformOrigin({ x, y });
  };

  // Toggle in-place zoom on click
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking a control button inside, do not trigger
    if ((e.target as HTMLElement).closest('button')) return;

    if (!isZoomed) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setTransformOrigin({ x, y });
      }
      setIsZoomed(true);
      setCursor('product', 'RESET');
    } else {
      setIsZoomed(false);
      setCursor('product', 'ZOOM');
    }
  };

  const handleMouseEnter = () => {
    setCursor('product', isZoomed ? 'RESET' : 'ZOOM');
  };

  const handleMouseLeave = () => {
    resetCursor();
  };

  // Lightbox keyboard controls
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && onSelectIndex) {
        onSelectIndex((selectedIndex + 1) % images.length);
        setLightboxZoom(1);
        setLightboxPan({ x: 0, y: 0 });
      } else if (e.key === 'ArrowLeft' && onSelectIndex) {
        onSelectIndex((selectedIndex - 1 + images.length) % images.length);
        setLightboxZoom(1);
        setLightboxPan({ x: 0, y: 0 });
      } else if (e.key === '+' || e.key === '=') {
        setLightboxZoom((z) => Math.min(3.5, z + 0.5));
      } else if (e.key === '-' || e.key === '_') {
        setLightboxZoom((z) => Math.max(1, z - 0.5));
      } else if (e.key === '0') {
        setLightboxZoom(1);
        setLightboxPan({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedIndex, images.length, onSelectIndex]);

  // Lightbox Drag / Pan handlers
  const handleLightboxMouseDown = (e: React.MouseEvent) => {
    if (lightboxZoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: lightboxPan.x,
      panY: lightboxPan.y,
    };
  };

  const handleLightboxMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || lightboxZoom <= 1) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setLightboxPan({
      x: dragStartRef.current.panX + deltaX,
      y: dragStartRef.current.panY + deltaY,
    });
  };

  const handleLightboxMouseUp = () => {
    setIsDragging(false);
  };

  // Lightbox wheel zoom
  const handleLightboxWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setLightboxZoom((z) => Math.min(3.5, Number((z + 0.3).toFixed(1))));
    } else {
      setLightboxZoom((z) => {
        const next = Math.max(1, Number((z - 0.3).toFixed(1)));
        if (next === 1) setLightboxPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  return (
    <>
      {/* Main Viewport Stage */}
      <div
        ref={containerRef}
        onClick={handleStageClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full aspect-[4/4] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#12100e] border transition-all duration-300 shadow-2xl select-none ${
          isZoomed
            ? 'cursor-zoom-out border-[#c5a059] shadow-[0_0_35px_rgba(197,160,89,0.25)]'
            : 'cursor-zoom-in border-[#c5a059]/25 hover:border-[#c5a059]/60'
        }`}
      >
        {/* High Resolution Image Container with Smooth Hardware Accelerated Pan/Scale */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)',
            transformOrigin: `${transformOrigin.x}% ${transformOrigin.y}%`,
            transition: isZoomed
              ? 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.08s ease-out'
              : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Image
            src={activeImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover select-none pointer-events-none"
          />
        </div>

        {/* Ambient Dark Gradient (fades away when zoomed for clear inspection) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
            isZoomed ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Top Floating Utility Controls */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
          {/* Zoom State Indicator */}
          <div className="pointer-events-auto">
            {isZoomed ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#c5a059]/50 text-[#dfba73] text-[11px] font-medium tracking-wider shadow-lg">
                <ZoomIn className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{zoomLevel}x MACRO INSPECTION</span>
                <span className="text-[#a89b88] text-[10px] ml-1">(Click to reset)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#d6cbbe] text-[11px] font-light tracking-wider hover:border-[#c5a059]/40 transition-colors">
                <ZoomIn className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Click image to zoom</span>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {isZoomed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                  resetCursor();
                }}
                className="p-2.5 rounded-full bg-black/70 hover:bg-[#c5a059] text-[#a89b88] hover:text-black backdrop-blur-md border border-white/10 hover:border-[#c5a059] transition-all shadow-lg"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
                setLightboxZoom(1);
                setLightboxPan({ x: 0, y: 0 });
                resetCursor();
              }}
              className="p-2.5 rounded-full bg-black/70 hover:bg-[#c5a059] text-[#a89b88] hover:text-black backdrop-blur-md border border-white/10 hover:border-[#c5a059] transition-all shadow-lg"
              title="Fullscreen Gallery Lightbox"
              aria-label="Fullscreen Gallery Lightbox"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Panning Prompt (visible when zoomed) */}
        {isZoomed && (
          <div className="absolute bottom-4 inset-x-4 flex justify-center pointer-events-none z-10 animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#c5a059]/30 text-xs text-[#f7f4ed] shadow-2xl">
              <Move className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
              <span>Hover & move mouse to pan fine details</span>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col text-[#ede8df]"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md z-20">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
                <div>
                  <h3 className="font-serif-lux text-base sm:text-lg text-[#f7f4ed]">
                    {productName}
                  </h3>
                  <span className="text-[11px] text-[#a89b88] tracking-widest uppercase">
                    Plate {selectedIndex + 1} of {images.length} • {category || 'Archival Piece'}
                  </span>
                </div>
              </div>

              {/* Lightbox Zoom & Close Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Zoom Level Pill */}
                <div className="flex items-center gap-1 bg-[#161412] border border-white/10 rounded-full px-2 py-1">
                  <button
                    onClick={() => {
                      setLightboxZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))));
                      if (lightboxZoom <= 1.5) setLightboxPan({ x: 0, y: 0 });
                    }}
                    disabled={lightboxZoom <= 1}
                    className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono text-[#dfba73] min-w-[45px] text-center">
                    {lightboxZoom}x
                  </span>

                  <button
                    onClick={() => {
                      setLightboxZoom((z) => Math.min(3.5, Number((z + 0.5).toFixed(1))));
                    }}
                    disabled={lightboxZoom >= 3.5}
                    className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {lightboxZoom > 1 && (
                  <button
                    onClick={() => {
                      setLightboxZoom(1);
                      setLightboxPan({ x: 0, y: 0 });
                    }}
                    className="p-2 rounded-full bg-[#161412] hover:bg-[#c5a059] hover:text-black border border-white/10 transition-colors"
                    title="Reset to 1x"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-full bg-[#1e1a16] hover:bg-[#c5a059] hover:text-black border border-[#c5a059]/30 transition-all text-[#f7f4ed]"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Canvas Viewport */}
            <div
              className={`relative flex-1 overflow-hidden flex items-center justify-center select-none ${
                lightboxZoom > 1
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
              onMouseDown={handleLightboxMouseDown}
              onMouseMove={handleLightboxMouseMove}
              onMouseUp={handleLightboxMouseUp}
              onWheel={handleLightboxWheel}
              onClick={() => {
                if (lightboxZoom === 1) {
                  setLightboxZoom(2.2);
                }
              }}
            >
              {/* Previous Image Arrow */}
              {images.length > 1 && onSelectIndex && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectIndex((selectedIndex - 1 + images.length) % images.length);
                    setLightboxZoom(1);
                    setLightboxPan({ x: 0, y: 0 });
                  }}
                  className="absolute left-6 z-30 p-3 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-black border border-white/10 text-white backdrop-blur-md transition-all shadow-2xl"
                  title="Previous Plate (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Centered Image with Drag and Zoom transform */}
              <div
                className="relative w-[90vw] max-w-5xl h-[75vh] will-change-transform flex items-center justify-center transition-transform duration-100 ease-out"
                style={{
                  transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                }}
              >
                <Image
                  src={activeImage}
                  alt={productName}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Next Image Arrow */}
              {images.length > 1 && onSelectIndex && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectIndex((selectedIndex + 1) % images.length);
                    setLightboxZoom(1);
                    setLightboxPan({ x: 0, y: 0 });
                  }}
                  className="absolute right-6 z-30 p-3 rounded-full bg-black/60 hover:bg-[#c5a059] hover:text-black border border-white/10 text-white backdrop-blur-md transition-all shadow-2xl"
                  title="Next Plate (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Pan tip when zoomed */}
              {lightboxZoom > 1 && (
                <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none z-20">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#c5a059]/40 text-xs text-[#dfba73]">
                    <Move className="w-3.5 h-3.5" />
                    <span>Click & drag to explore surface details • Scroll mouse wheel to zoom</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Gallery Thumbnail Bar */}
            {images.length > 1 && onSelectIndex && (
              <div className="py-4 border-t border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center gap-3 z-20">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectIndex(idx);
                      setLightboxZoom(1);
                      setLightboxPan({ x: 0, y: 0 });
                    }}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border transition-all ${
                      selectedIndex === idx
                        ? 'border-[#c5a059] scale-105 shadow-[0_0_15px_rgba(197,160,89,0.5)]'
                        : 'border-white/10 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

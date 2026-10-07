'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  { id: 'section-hero', label: '01 Gallery Entrance' },
  { id: 'section-categories', label: '02 Archival Categories' },
  { id: 'interactive-3d', label: '03 3D Studio' },
  { id: 'section-collections', label: '04 Spaces with Character' },
  { id: 'section-featured', label: '05 Featured Works' },
];

export default function ShowroomNavigator() {
  const [activeSection, setActiveSection] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    setVisible(true);

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY + window.innerHeight * 0.35;
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i].id);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(i);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextSection = () => {
    const nextIdx = Math.min(sections.length - 1, activeSection + 1);
    scrollToSection(sections[nextIdx].id);
  };

  const prevSection = () => {
    const prevIdx = Math.max(0, activeSection - 1);
    scrollToSection(sections[prevIdx].id);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Showroom Navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-none"
    >
      <div className="pointer-events-auto p-2 rounded-full bg-[#12100e]/80 backdrop-blur-md border border-[#c5a059]/20 shadow-2xl flex flex-col items-center gap-2.5">
        <button
          onClick={prevSection}
          disabled={activeSection === 0}
          className="p-1.5 text-[#8c806f] hover:text-[#dfba73] disabled:opacity-20 transition-colors"
          title="Previous Room"
          aria-label="Previous Room"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col gap-2 py-0.5">
          {sections.map((sec, idx) => {
            const isActive = activeSection === idx;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center justify-end p-1"
                aria-label={`Go to ${sec.label}`}
              >
                {/* Floating tooltip on hover */}
                <span className="absolute right-7 px-2.5 py-1 rounded bg-[#171412] border border-[#c5a059]/30 text-[10px] uppercase tracking-widest text-[#e8decb] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                  {sec.label}
                </span>

                {/* Indicator Dot */}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-5 w-1.5 bg-[#dfba73] shadow-[0_0_8px_rgba(223,186,115,0.7)]'
                      : 'h-1.5 w-1.5 bg-[#c5a059]/30 hover:bg-[#c5a059]/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={nextSection}
          disabled={activeSection === sections.length - 1}
          className="p-1.5 text-[#8c806f] hover:text-[#dfba73] disabled:opacity-20 transition-colors"
          title="Next Room"
          aria-label="Next Room"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-[9px] font-mono tracking-widest text-[#8c806f] pr-1">
        0{activeSection + 1} / 05
      </div>
    </aside>
  );
}

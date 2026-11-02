import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToServices }) => {
  return (
    <section
      id="hero-section"
      className="min-h-[100svh] flex items-end px-4 sm:px-6 md:px-12 pb-6 md:pb-10 pt-24 pointer-events-none"
    >
      <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        {/* Bottom-Left: Authentic Signboard Banner Strip */}
        <div className="hero-anim-2 pointer-events-auto flex flex-col items-start gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white/80 border border-white backdrop-blur-md font-mono text-[11px] font-bold text-neutral-900 shadow-xs">
              4.2 ★ (45 Google Reviews) · Women-Owned Laundry
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#0E2AC5]/10 border border-[#0E2AC5]/25 backdrop-blur-md font-mono text-[11px] font-bold text-[#0E2AC5]">
              Laxmi Chowk Rd, Hinjawadi Phase 1
            </span>
          </div>

          <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 px-5 py-3 rounded-2xl bg-[#1d295e]/95 text-white backdrop-blur-md border border-white/40 shadow-xl">
            <span className="font-sans text-xs sm:text-sm font-bold tracking-wide text-white">
              आमच्याकडे सर्व प्रकारचे कपडे धुवून व प्रेस करुन मिळेल.
            </span>
            <span className="hidden sm:inline text-amber-300">•</span>
            <span className="font-raleway text-xs sm:text-sm font-bold italic text-amber-300">
              All Types of Clothes Washed, Ironed &amp; Dry Cleaned
            </span>
          </div>
        </div>

        {/* Bottom-Right: Interactive Scroll Cue to Erupt Bubbles from Washing Machine */}
        <div className="hero-anim-3 pointer-events-auto flex items-center gap-3 self-start lg:self-end">
          <button
            type="button"
            onClick={onScrollToServices}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/75 hover:bg-white border border-white backdrop-blur-xl shadow-lg transition-all group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E2AC5] animate-ping" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900">
              Scroll to release bubbles from machine
            </span>
            <ArrowDown className="w-4 h-4 text-[#0E2AC5] transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

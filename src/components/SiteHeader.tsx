import React from 'react';
import { StarLogoSvg } from './StarLogoSvg';
import { Phone, ChevronRight } from 'lucide-react';
import { STORE_PHONE_DISPLAY } from '../data/constants';

interface SiteHeaderProps {
  sceneStarted: boolean;
  onNavigate: (targetId: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  sceneStarted,
  onNavigate,
}) => {
  return (
    <header
      id="site-header"
      className="fixed top-0 left-0 right-0 z-30 h-20 md:h-24 px-4 sm:px-6 md:px-12 flex items-center justify-between pointer-events-none transition-all duration-800"
      style={{
        opacity: sceneStarted ? 1 : 0,
        transform: sceneStarted ? 'translateY(0)' : 'translateY(-16px)',
      }}
    >
      {/* Left: Star + Hanger Logo & Marathi text */}
      <button
        type="button"
        onClick={() => onNavigate('#hero-section')}
        className="pointer-events-auto flex items-center gap-2.5 group text-left cursor-pointer"
        aria-label="Star Laundry Home"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/45 border border-white/75 backdrop-blur-xl glass-btn-shadow transition-transform duration-300 group-hover:scale-[1.02]">
          <StarLogoSvg className="w-28 sm:w-32 h-11 sm:h-12 shrink-0" />
          <div className="hidden sm:flex flex-col border-l border-[#0E2AC5]/15 pl-2.5 leading-tight">
            <span className="font-sans font-extrabold text-[13px] signboard-marathi">
              स्टार लाँड्री
            </span>
            <span className="font-sans font-bold text-[10px] text-[#0e4da4]">
              ॲन्ड ड्रायक्लिनर्स
            </span>
          </div>
        </div>
      </button>

      {/* Center (lg+ only): Nav Links */}
      <nav className="hidden lg:flex items-center gap-7 pointer-events-auto font-raleway text-[13.5px] font-semibold text-neutral-900 bg-white/30 px-6 py-2.5 rounded-full border border-white/60 backdrop-blur-xl shadow-xs">
        <button
          type="button"
          onClick={() => onNavigate('#hero-section')}
          className="transition-opacity hover:opacity-60 cursor-pointer"
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => onNavigate('#section-drop')}
          className="transition-opacity hover:opacity-60 cursor-pointer"
        >
          Services &amp; Heavy Items
        </button>
        <button
          type="button"
          onClick={() => onNavigate('#section-shape')}
          className="transition-opacity hover:opacity-60 cursor-pointer"
        >
          ₹30/₹50 Delivery &amp; Express
        </button>
        <button
          type="button"
          onClick={() => onNavigate('#section-release')}
          className="transition-opacity hover:opacity-60 cursor-pointer"
        >
          B2B Laundry App
        </button>
        <button
          type="button"
          onClick={() => onNavigate('#site-footer')}
          className="transition-opacity hover:opacity-60 cursor-pointer"
        >
          Contact
        </button>
      </nav>

      {/* Right: Controls (ONLY "Call 088568 65639" Pill Button) */}
      <div className="flex items-center pointer-events-auto">
        <a
          href="tel:+918856865639"
          className="group flex items-center gap-2 pl-3.5 sm:pl-4 md:pl-5 pr-1.5 py-1.5 rounded-full bg-white/30 backdrop-blur-xl border border-t-white/90 border-b-white/85 border-x-white/30 glass-btn-shadow transition-all hover:bg-white/50"
        >
          <Phone className="w-3.5 h-3.5 text-[#0E2AC5] sm:hidden" />
          <span className="font-raleway text-[11px] sm:text-[13px] md:text-[14px] font-bold text-neutral-950">
            <span className="hidden sm:inline">Call </span>{STORE_PHONE_DISPLAY}
          </span>
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full blue-orb flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105">
            <ChevronRight className="w-4 h-4" />
          </span>
        </a>
      </div>
    </header>
  );
};

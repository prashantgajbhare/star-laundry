import React from 'react';
import { Sliders, X, Sparkles, RotateCcw } from 'lucide-react';
import { PALETTE_PRESETS } from '../data/constants';
import { PalettePreset } from '../types';

interface StudioDrawerProps {
  isOpen: boolean;
  selectedThemeId: string;
  onSelectPreset: (preset: PalettePreset) => void;
  onReset: () => void;
  onClose: () => void;
}

export const StudioDrawer: React.FC<StudioDrawerProps> = ({
  isOpen,
  selectedThemeId,
  onSelectPreset,
  onReset,
  onClose,
}) => {
  return (
    <>
      {/* Drawer Scrim Backdrop */}
      <div
        id="drawer-scrim"
        onClick={onClose}
        className={`fixed inset-0 bg-neutral-950/20 backdrop-blur-xs z-40 transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Panel */}
      <aside
        id="studio-drawer"
        aria-label="Bubble Palette Controls"
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white/95 backdrop-blur-xl border-l border-neutral-100 z-50 p-8 flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
            <div className="flex items-center gap-2.5 text-neutral-950">
              <Sliders className="w-4 h-4 text-[#0E2AC5]" />
              <span className="font-display font-black text-[14px] tracking-[0.2em] uppercase">
                Bubble Colors
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Controls"
              className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-5 font-mono text-[12px] italic text-neutral-400 leading-relaxed">
            Pick the hero soap bubble colour erupting from the washing machine. As you scroll, the bubbles morph to volt-lime, then rose-pink as the heart assembles.
          </p>

          {/* Section Title */}
          <div className="mt-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-neutral-900">
            <Sparkles className="w-3.5 h-3.5 text-[#0E2AC5]" />
            <span>Hero Bubble Palette</span>
          </div>

          {/* 4 Selectable Theme Cards */}
          <div className="mt-4 flex flex-col gap-3">
            {PALETTE_PRESETS.map((preset) => {
              const isSelected = preset.id === selectedThemeId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-950 text-white border-neutral-950 scale-[1.02] shadow-lg'
                      : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-raleway font-bold text-[12px]">{preset.name}</span>
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: preset.primaryColor }}
                    />
                  </div>
                  <p
                    className={`mt-1.5 font-raleway text-[10px] leading-relaxed ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    ${preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-neutral-100 mt-8">
          <div className="space-y-1.5 font-mono text-[9px] tracking-[0.16em] text-neutral-400 uppercase">
            <div className="flex justify-between">
              <span>RENDER ENGINE</span>
              <span className="text-neutral-600 font-semibold">THREE.JS WEBGL</span>
            </div>
            <div className="flex justify-between">
              <span>DYNAMICS SOLVER</span>
              <span className="text-neutral-600 font-semibold">3D COLLISION VERLET</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="mt-5 w-full py-3 px-4 rounded-xl border border-neutral-200 hover:border-neutral-900 text-neutral-800 hover:bg-neutral-950 hover:text-white transition-all flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </aside>
    </>
  );
};

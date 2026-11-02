import React from 'react';
import { SERVICES, STORE_PHONE, STORE_PHONE_DISPLAY, STORE_WHATSAPP_BASE } from '../data/constants';
import { Phone, ExternalLink, Calculator, Zap } from 'lucide-react';

interface ServicesSectionProps {
  onOpenCalculator: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenCalculator }) => {
  return (
    <section
      id="section-drop"
      className="min-h-[100svh] flex items-center pt-24 md:pt-32 pb-32 px-6 md:px-12 pointer-events-none"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column (lg:col-span-6) */}
        <div className="lg:col-span-6 pointer-events-auto">
          <div className="reveal flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#0E2AC5]/80">
              [ 02 — Services &amp; Heavy Fabric Care ]
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#e1306c]/15 border border-[#e1306c]/35 backdrop-blur-md font-sans text-xs font-extrabold text-[#c91c55] shadow-xs flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#c91c55] fill-current" />
              <span>2–3 Hr Express Available</span>
            </span>
          </div>

          <h2
            className="reveal font-raleway font-medium text-[2.6rem] leading-[1.0] sm:text-6xl md:text-[74px] md:leading-[0.94] tracking-tight text-neutral-950 mt-5"
            style={{ transitionDelay: '0.1s' }}
          >
            Wash. Iron.<br />Dry clean.
          </h2>

          <p
            className="reveal mt-6 max-w-lg font-raleway text-[16px] md:text-[18px] leading-[1.55] text-neutral-700"
            style={{ transitionDelay: '0.18s' }}
          >
            As you scroll, the bubbles erupt out of the washing machine drum and pour down like a rinse cycle. Whether you prefer <strong className="text-neutral-950 font-semibold">Per-Piece</strong> or <strong className="text-neutral-950 font-semibold">Per-Kg</strong> laundry, we handle everything from daily office shirts to heavy winter <strong className="text-neutral-950 font-semibold">Blankets, Razai (Quilts), Wedding Suits, and Silk Sarees</strong>.
          </p>

          {/* Store Home Delivery & Quick Pickup Card */}
          <div
            className="reveal mt-7 max-w-lg bg-white/55 backdrop-blur-xl p-6 rounded-3xl border border-white/85 stat-card-ring"
            style={{ transitionDelay: '0.24s' }}
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="font-sans font-extrabold text-base signboard-marathi">
                स्टार लाँड्री ॲन्ड ड्रायक्लिनर्स
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0E2AC5] text-white font-bold">
                Home Delivery
              </span>
            </div>

            <p className="font-raleway text-[14.5px] font-medium leading-[1.45] text-neutral-800">
              Washing, ironing, starching &amp; dry cleaning at <strong className="text-neutral-950">Laxmi Chowk Rd, Phase 1, Hinjawadi</strong>. Flat <strong className="text-[#0E2AC5]">₹30 (1 km)</strong> &amp; <strong className="text-[#0E2AC5]">₹50 (2 km)</strong> delivery with <strong className="text-neutral-950">no minimum clothes!</strong>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <a
                href={`tel:${STORE_PHONE}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#0E2AC5] hover:bg-[#091d8c] text-white text-xs font-bold transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {STORE_PHONE_DISPLAY}</span>
              </a>
              <a
                href={`${STORE_WHATSAPP_BASE}?text=${encodeURIComponent(
                  'Hello Star Laundry, I want to schedule a laundry pickup in Hinjawadi.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-900 transition-all"
              >
                <span>WhatsApp Pickup</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0E2AC5]" />
              </a>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-neutral-950 hover:bg-[#0E2AC5] text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Price Estimator</span>
              </button>
            </div>

            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-600 mt-4 pt-3 border-t border-neutral-900/10 flex items-center justify-between">
              <span>Open All Days · 8 AM – 10 PM</span>
              <span className="font-bold text-[#c91c55]">⚡ 2–3 Hr Express Available</span>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-6): Four Glass Service Cards */}
        <div
          className="reveal lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pointer-events-auto"
          style={{ transitionDelay: '0.25s' }}
        >
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="rounded-[1.4rem] p-[1px] bg-gradient-to-b from-white/85 via-white/35 to-white/15 stat-card-ring transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="relative h-full rounded-[1.35rem] bg-white/35 backdrop-blur-xl px-5 py-5 overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/95 to-transparent" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#0E2AC5] font-bold">
                      {srv.number}
                    </span>
                    <span className="w-2 h-2 rounded-full blue-dot-glow" />
                  </div>
                  <div className="mt-2 font-raleway text-[18px] font-bold text-neutral-950">
                    {srv.title}
                  </div>
                  <div className="text-[11px] font-sans font-bold text-[#b8184e] mt-0.5">
                    {srv.marathi}
                  </div>
                  <p className="mt-2 font-raleway text-[13px] leading-relaxed text-neutral-700">
                    {srv.description}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/50 flex items-center justify-between font-mono text-[10px] text-neutral-800">
                  <span className="text-neutral-500 uppercase">Pricing</span>
                  <span className="font-bold text-[#0E2AC5]">{srv.pricingExample}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

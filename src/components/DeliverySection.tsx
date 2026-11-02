import React from 'react';
import { STORE_PHONE, STORE_PHONE_DISPLAY } from '../data/constants';
import { Phone, MousePointerClick } from 'lucide-react';

export const DeliverySection: React.FC = () => {
  return (
    <section
      id="section-shape"
      className="min-h-[100svh] flex flex-col justify-between py-28 md:py-36 px-6 md:px-12 pointer-events-none"
    >
      {/* Top */}
      <div className="pointer-events-auto max-w-2xl">
        <div className="reveal font-mono text-[11px] tracking-[0.25em] uppercase text-[#0E2AC5]/80">
          [ 03 — Flat-Rate Pickup &amp; 2–3 Hr Express ]
        </div>
        <h2
          className="reveal mt-5 font-raleway font-medium text-[2.6rem] leading-[1.0] sm:text-6xl md:text-[78px] md:leading-[0.92] tracking-tight text-neutral-950"
          style={{ transitionDelay: '0.1s' }}
        >
          Pickup &amp; drop,<br />flat rate.
        </h2>

        {/* 3 Highlight Cards for Delivery & Express */}
        <div className="reveal mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl" style={{ transitionDelay: '0.18s' }}>
          <div className="rounded-2xl bg-white/45 backdrop-blur-xl border border-white/80 p-4 shadow-xs">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#0E2AC5] font-bold">
              Up to 1 KM
            </div>
            <div className="mt-1 font-raleway text-2xl font-black text-neutral-950">₹30 Flat</div>
            <div className="mt-0.5 font-raleway text-xs text-neutral-700">No minimum clothes required</div>
          </div>
          <div className="rounded-2xl bg-white/45 backdrop-blur-xl border border-white/80 p-4 shadow-xs">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#0E2AC5] font-bold">
              Up to 2 KM
            </div>
            <div className="mt-1 font-raleway text-2xl font-black text-neutral-950">₹50 Flat</div>
            <div className="mt-0.5 font-raleway text-xs text-neutral-700">Even 1–2 urgent pieces!</div>
          </div>
          <div className="rounded-2xl bg-[#e1306c]/15 backdrop-blur-xl border border-[#e1306c]/35 p-4 shadow-xs">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#b8184e] font-bold">
              Urgent Express
            </div>
            <div className="mt-1 font-raleway text-2xl font-black text-neutral-950">2–3 Hours</div>
            <div className="mt-0.5 font-raleway text-xs text-neutral-800">Call at 12 PM → Ready by 3 PM</div>
          </div>
        </div>
      </div>

      {/* Bottom, Right-Aligned */}
      <div className="self-end max-w-md text-left md:text-right pointer-events-auto mt-12 md:mt-0">
        <p
          className="reveal font-raleway text-[15px] md:text-[18px] leading-[1.55] text-neutral-800 bg-white/35 backdrop-blur-xl p-5 rounded-3xl border border-white/70"
          style={{ transitionDelay: '0.2s' }}
        >
          <strong className="text-neutral-950">No minimum piece condition!</strong> Whether you have a full week's load or just 1–2 emergency office outfits, we pick up and deliver across Laxmi Chowk &amp; Hinjawadi Phase 1. Need it urgently? Ask for our <strong className="text-[#c91c55]">2 to 3 Hour Express Service</strong>.
        </p>

        <div className="reveal mt-5 flex flex-wrap md:justify-end gap-2.5" style={{ transitionDelay: '0.28s' }}>
          <a
            href={`tel:${STORE_PHONE}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white hover:bg-[#0E2AC5] transition-colors font-raleway text-xs font-bold shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call for 2–3 Hr Express Pickup ({STORE_PHONE_DISPLAY})</span>
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/65 bg-white/45 backdrop-blur-md text-neutral-800">
            <MousePointerClick className="w-3.5 h-3.5 text-[#0E2AC5]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Swipe through the heart
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

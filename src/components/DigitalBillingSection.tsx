import React from 'react';
import { STORE_PHONE } from '../data/constants';
import { Phone, ExternalLink } from 'lucide-react';

export const DigitalBillingSection: React.FC = () => {
  return (
    <section
      id="section-release"
      className="min-h-[100svh] mx-auto flex flex-col items-center justify-center text-center py-28 md:py-36 px-6 md:px-12 max-w-4xl pointer-events-none"
    >
      <div className="pointer-events-auto">
        <div className="reveal font-mono text-[11px] tracking-[0.25em] uppercase text-[#0E2AC5]/80">
          [ 04 — B2B Laundry Management App ]
        </div>

        <h2
          className="reveal mt-6 font-raleway font-medium text-[2.8rem] leading-[1.0] sm:text-7xl md:text-[86px] md:leading-[0.92] tracking-tight text-neutral-950"
          style={{ transitionDelay: '0.12s' }}
        >
          Own a Laundry Business?<br />Manage it Smartly!
        </h2>

        <p
          className="reveal mt-7 mx-auto max-w-xl font-raleway text-[16px] md:text-[19px] leading-[1.55] text-neutral-700"
          style={{ transitionDelay: '0.22s' }}
        >
          Maintain customer records, track washed clothes, manage your Digital Khata (Udhari/Pending Balances), and send automated WhatsApp bills directly to your customers. We can completely customize and build this app tailored to your shop's exact requirements.
        </p>

        {/* 3 B2B Feature Badges */}
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-2.5" style={{ transitionDelay: '0.3s' }}>
          <span className="px-4 py-2 rounded-full bg-white/60 border border-white/85 backdrop-blur-md font-raleway text-xs font-bold text-neutral-900 shadow-xs">
            📊 Customer &amp; Order History
          </span>
          <span className="px-4 py-2 rounded-full bg-white/60 border border-white/85 backdrop-blur-md font-raleway text-xs font-bold text-[#0E2AC5] shadow-xs">
            📒 Digital Khata Tracking
          </span>
          <span className="px-4 py-2 rounded-full bg-white/60 border border-white/85 backdrop-blur-md font-raleway text-xs font-bold text-neutral-900 shadow-xs">
            💬 Automated WhatsApp Billing
          </span>
        </div>

        {/* Action Pills */}
        <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: '0.38s' }}>
          <a
            href={`tel:${STORE_PHONE}`}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-neutral-950 text-white font-raleway text-sm font-bold shadow-lg hover:bg-[#0E2AC5] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#5175ff]" />
            <span>Contact us for a Demo</span>
          </a>
          <a
            href="https://app.starlaundry.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/80 bg-white/55 backdrop-blur-md text-neutral-900 font-raleway text-sm font-bold hover:bg-white/85 transition-colors"
          >
            <span>Visit Web App</span>
            <ExternalLink className="w-4 h-4 text-[#0E2AC5]" />
          </a>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { StarLogoSvg } from './StarLogoSvg';
import { STORE_PHONE, STORE_PHONE_DISPLAY, STORE_MAPS_URL, STORE_WHATSAPP_BASE } from '../data/constants';
import { Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (targetId: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="site-footer"
      className="relative z-10 bg-neutral-950 text-white rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden"
    >
      {/* Two soft blurred glow blooms */}
      <div
        className="pointer-events-none absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, #2f69ff66 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 w-[32rem] h-[32rem] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, #5175ff44 0%, transparent 65%)' }}
      />

      {/* Marquee Ticker at the Top */}
      <div className="border-b border-white/10 py-5 overflow-hidden">
        <div
          className="marquee-track font-raleway font-medium text-white/90"
          style={{ fontSize: 'clamp(26px, 5.5vw, 58px)' }}
        >
          {/* Repeat 1 */}
          <div className="flex items-center">
            <span className="px-8">Star Laundry &amp; Dry Cleaners</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8 font-sans">स्टार लाँड्री ॲन्ड ड्रायक्लिनर्स</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8">₹30 (1 km) · ₹50 (2 km) Delivery</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8 text-amber-300">2–3 Hr Express Service</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8">Blanket · Razai · Suit · Saree</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
          </div>
          {/* Repeat 2 (seamless loop) */}
          <div className="flex items-center">
            <span className="px-8">Star Laundry &amp; Dry Cleaners</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8 font-sans">स्टार लाँड्री ॲन्ड ड्रायक्लिनर्स</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8">₹30 (1 km) · ₹50 (2 km) Delivery</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8 text-amber-300">2–3 Hr Express Service</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
            <span className="px-8">Blanket · Razai · Suit · Saree</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f69ff] inline-block" />
          </div>
        </div>
      </div>

      {/* Footer Body */}
      <div className="relative px-6 md:px-12 pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* CTA (lg:col-span-5) */}
          <div className="lg:col-span-5 footer-reveal">
            <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/40">
              [ Star Laundry · Hinjawadi Phase 1 ]
            </div>

            <h3 className="mt-4 font-raleway font-medium text-4xl md:text-6xl leading-[0.95] text-white">
              Have laundry<br />to pick up?
            </h3>

            <p className="mt-4 font-raleway text-sm text-white/65 max-w-md leading-relaxed">
              आमच्याकडे सर्व प्रकारचे कपडे धुवून व प्रेस करुन मिळेल · Laxmi Chowk Rd, Phase 1, Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Maharashtra 411057
            </p>

            {/* Phone & WhatsApp Pill Links */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${STORE_PHONE}`}
                className="group inline-flex items-center gap-4 pl-7 pr-2 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="font-raleway font-semibold text-[16px] md:text-[18px] text-white">
                  {STORE_PHONE_DISPLAY}
                </span>
                <span className="w-10 h-10 rounded-full blue-orb flex items-center justify-center text-white">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>

              <a
                href={`${STORE_WHATSAPP_BASE}?text=${encodeURIComponent(
                  'Hello Star Laundry, I would like to book a pickup.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 font-raleway text-sm font-medium text-white/90 transition-colors"
              >
                <span>WhatsApp Pickup</span>
                <ExternalLink className="w-4 h-4 text-[#5175ff]" />
              </a>
            </div>
          </div>

          {/* Link Columns (lg:col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Services & Heavy Items */}
            <div className="footer-reveal" style={{ transitionDelay: '0s' }}>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                Services &amp; Care
              </div>
              <ul className="space-y-3 font-raleway text-[14px] text-white/75">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('#section-drop')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Wash &amp; Iron (Per Piece / Kg)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('#section-drop')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Blanket &amp; Razai Dry Clean
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('#section-drop')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Suit, Blazer &amp; Saree Care
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('#section-shape')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    2–3 Hr Express Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Delivery & Payments */}
            <div className="footer-reveal" style={{ transitionDelay: '0.08s' }}>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                Delivery &amp; Pay
              </div>
              <ul className="space-y-3 font-raleway text-[14px] text-white/75">
                <li>₹30 Flat (Up to 1 km)</li>
                <li>₹50 Flat (Up to 2 km)</li>
                <li>No Minimum Clothes Limit</li>
                <li>GPay · PhonePe · UPI · Cash</li>
              </ul>
            </div>

            {/* Column 3: Store Location */}
            <div className="footer-reveal" style={{ transitionDelay: '0.16s' }}>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                Visit Store
              </div>
              <ul className="space-y-3 font-raleway text-[14px] text-white/75">
                <li>
                  <a
                    href={STORE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Laxmi Chowk Rd, Hinjawadi</span>
                    <ExternalLink className="w-3 h-3 text-[#5175ff]" />
                  </a>
                </li>
                <li>Open All Days: 8 AM – 10 PM</li>
                <li>4.2 ★ Google Rating (45 Reviews)</li>
                <li className="text-[#5175ff] font-medium">Women-Owned Business ♥</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Signboard Logo */}
        <div className="mt-16 md:mt-24 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/95 px-3 py-1 rounded-xl">
              <StarLogoSvg className="w-24 h-9" glow={false} />
            </div>
            <span className="w-2 h-2 rounded-full bg-[#2f69ff]" />
            <span className="font-mono text-[11px] text-white/50">
              © 2026 Star Laundry &amp; Dry Cleaners — Laxmi Chowk Rd, Hinjawadi, Pune 411057.
            </span>
          </div>

          {/* Right: 3 Round Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${STORE_PHONE}`}
              aria-label="Call Star Laundry"
              title="Call 088568 65639"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={STORE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps Location"
              title="View on Google Maps"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>
            <a
              href={`${STORE_WHATSAPP_BASE}?text=${encodeURIComponent(
                'Hello Star Laundry, please assist me with laundry service.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Star Laundry"
              title="Chat on WhatsApp"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

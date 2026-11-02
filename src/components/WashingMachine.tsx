import React, { useMemo } from 'react';

interface WashingMachineProps {
  scrollProgress: number;
  sceneStarted: boolean;
}

export const WashingMachine: React.FC<WashingMachineProps> = ({ scrollProgress, sceneStarted }) => {
  // Generate 32 DOM bubbles with deterministic variety
  const bubbles = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const size = 10 + (Math.sin(i * 99) * 0.5 + 0.5) * 28;
      const duration = 2.4 + (Math.cos(i * 47) * 0.5 + 0.5) * 3.0;
      const delay = (i * 0.14) % 4.5;
      const angle = (((i % 16) / 16) - 0.5) * Math.PI * 1.45;
      const spreadX = Math.sin(angle) * (95 + ((i * 31) % 170));
      const riseY = -(150 + ((i * 53) % 290));
      return {
        id: i,
        size: size.toFixed(1),
        duration: duration.toFixed(2),
        delay: delay.toFixed(2),
        spreadX: spreadX.toFixed(0),
        riseY: riseY.toFixed(0),
      };
    });
  }, []);

  // Compute machine scale & opacity based on scroll progress
  const mcOpacity = Math.max(0, 1 - Math.max(0, scrollProgress - 0.12) / 0.78);
  const mcScale = 1 + Math.min(0.08, scrollProgress * 0.12) - Math.max(0, scrollProgress - 0.35) * 0.25;

  return (
    <div
      id="mc"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '50%',
        top: '44%',
        height: 'min(58vh, 430px)',
        aspectRatio: '240 / 300',
        transform: `translate(-50%, -48%) scale(${mcScale.toFixed(3)})`,
        opacity: mcOpacity,
        zIndex: -5,
        pointerEvents: 'none',
        transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
      }}
    >
      <div
        className="relative w-full h-full transition-all duration-900 ease-out"
        style={{
          opacity: sceneStarted ? 1 : 0,
          transform: sceneStarted ? 'scale(1)' : 'scale(0.92)',
        }}
      >
        <div className="mi-wrapper w-full h-full">
          <svg viewBox="0 0 240 300" width="100%" height="100%" style={{ filter: 'drop-shadow(0 28px 50px rgba(14, 42, 197, 0.25))' }}>
            <defs>
              <clipPath id="drumClip">
                <circle cx="120" cy="180" r="64" />
              </clipPath>
              <linearGradient id="bodySheenGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#f5f8ff" />
                <stop offset="100%" stopColor="#e2ecff" />
              </linearGradient>
              <linearGradient id="doorRingGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5175ff" />
                <stop offset="50%" stopColor="#0e2ac5" />
                <stop offset="100%" stopColor="#141e4d" />
              </linearGradient>
              <radialGradient id="drumDepthGrad" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#d8e7ff" />
                <stop offset="65%" stopColor="#99beff" />
                <stop offset="100%" stopColor="#3a66ff" />
              </radialGradient>
            </defs>

            {/* Machine Outer Body with 3D Glossy Bevel */}
            <rect x="20" y="10" width="200" height="280" rx="30" fill="url(#bodySheenGrad)" stroke="#b5c9ff" strokeWidth="3.5" />
            <rect x="25" y="15" width="190" height="270" rx="26" fill="none" stroke="#ffffff" strokeWidth="2.5" />

            {/* Top Control Panel Divider */}
            <line x1="20" y1="68" x2="220" y2="68" stroke="#cddbff" strokeWidth="3" />

            {/* Left Detergent Drawer with STAR LAUNDRY mini label */}
            <rect x="30" y="24" width="46" height="26" rx="6" fill="#eef3ff" stroke="#b5c9ff" strokeWidth="2" />
            <line x1="41" y1="37" x2="65" y2="37" stroke="#0e2ac5" strokeWidth="2.5" strokeLinecap="round" />

            {/* Center Rotary Program Dial */}
            <circle cx="98" cy="37" r="14" fill="#eef2ff" stroke="#99b5ff" strokeWidth="2.5" />
            <circle cx="98" cy="37" r="5" fill="#0e2ac5" />
            <line x1="98" y1="37" x2="98" y2="25" stroke="#0e2ac5" strokeWidth="3" strokeLinecap="round" />

            {/* Digital LED Timer Display */}
            <rect x="122" y="24" width="66" height="26" rx="8" fill="#0a1647" stroke="#5175ff" strokeWidth="1.2" />
            <text x="155" y="38" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="9.5" fill="#7ce8ff">
              SPIN·WASH
            </text>
            <text x="155" y="47" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="6.5" fill="#a8c1ff">
              8AM - 10PM
            </text>

            {/* Pulsing Status LED */}
            <circle className="led" cx="201" cy="37" r="6" fill="#e1306c" />

            {/* Outer Porthole Housing */}
            <circle cx="120" cy="180" r="86" fill="#e6eeff" stroke="#c5d6ff" strokeWidth="2" />
            <circle cx="120" cy="180" r="78" fill="none" stroke="url(#doorRingGrad)" strokeWidth="13" />
            <circle cx="120" cy="180" r="70" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
            {/* Door Hinge & Handle Accent */}
            <rect x="190" y="164" width="11" height="32" rx="4.5" fill="#141e4d" />

            {/* Inner Drum Background */}
            <circle cx="120" cy="180" r="64" fill="url(#drumDepthGrad)" />

            {/* Inside the Spinning Drum (Clipped to R=64) */}
            <g clipPath="url(#drumClip)">
              {/* Tumbling Clothes & Colored Suds (Spinning) */}
              <g className="drum">
                {/* Stainless drum paddles */}
                <path d="M120 116 L129 138 L111 138 Z" fill="#7ca2f5" opacity="0.7" />
                <path d="M184 180 L162 189 L162 171 Z" fill="#7ca2f5" opacity="0.7" />
                <path d="M56 180 L78 171 L78 189 Z" fill="#7ca2f5" opacity="0.7" />
                {/* Tumbling garments & foam pockets */}
                <path d="M88 138 C110 122, 148 134, 158 160 C168 186, 136 218, 108 206 C82 194, 68 154, 88 138 Z" fill="#2554e8" opacity="0.55" />
                <circle cx="150" cy="156" r="15" fill="#e1306c" opacity="0.92" />
                <circle cx="92" cy="196" r="17" fill="#ffffff" opacity="0.96" />
                <circle cx="130" cy="214" r="13" fill="#0e2ac5" opacity="0.92" />
                <circle cx="90" cy="152" r="12" fill="#ffd1d5" opacity="0.94" />
                <circle cx="146" cy="194" r="11" fill="#e1fc03" opacity="0.88" />
              </g>

              {/* Sloshing Water Wave Layer */}
              <g className="wv">
                <path d="M 30 184 q 15 -15 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 V 260 H 30 Z" fill="#4f7bff" opacity="0.76" />
                <path d="M 15 194 q 15 -13 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 V 260 H 15 Z" fill="#0e2ac5" opacity="0.52" />
              </g>

              {/* Counter-rotating White Suds Foam Bubbles inside Drum */}
              <g className="drum-foam">
                <circle cx="100" cy="174" r="9.5" fill="#ffffff" opacity="0.95" />
                <circle cx="140" cy="168" r="8.5" fill="#ffffff" opacity="0.92" />
                <circle cx="120" cy="200" r="10.5" fill="#ffffff" opacity="0.95" />
                <circle cx="112" cy="158" r="7.5" fill="#ffffff" opacity="0.88" />
                <circle cx="134" cy="188" r="8" fill="#ffffff" opacity="0.92" />
                <circle cx="104" cy="192" r="6.5" fill="#d9ecff" opacity="0.9" />
                <circle cx="126" cy="174" r="7" fill="#d9ecff" opacity="0.9" />
              </g>
            </g>

            {/* Glass Porthole Specular Gloss Highlight */}
            <path d="M 76 148 A 56 56 0 0 1 116 122" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            <path d="M 154 218 A 54 54 0 0 1 126 232" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />

            {/* Bottom Filter Flap & Stabilizer Feet */}
            <rect x="166" y="256" width="32" height="18" rx="4" fill="#eef3ff" stroke="#b5c9ff" strokeWidth="1.5" />
            <rect x="44" y="286" width="28" height="8" rx="3.5" fill="#8a98c9" />
            <rect x="168" y="286" width="28" height="8" rx="3.5" fill="#8a98c9" />
          </svg>
        </div>

        {/* DOM Soap Bubbles Container */}
        <div id="bubs" className="absolute inset-0 pointer-events-none overflow-visible">
          {bubbles.map((b) => (
            <i
              key={b.id}
              className="bb"
              style={
                {
                  '--s': `${b.size}px`,
                  '--d': `${b.duration}s`,
                  '--dl': `${b.delay}s`,
                  '--x': `${b.spreadX}px`,
                  '--y': `${b.riseY}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

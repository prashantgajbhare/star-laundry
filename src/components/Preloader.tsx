import React, { useState, useEffect } from 'react';
import { StarLogoSvg } from './StarLogoSvg';

interface PreloaderProps {
  webglReady: boolean;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ webglReady, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Filling the washing drum');
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [itemsIn, setItemsIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItemsIn(true);
    }, 90);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let currentVal = 0;
    let scheduledExit = false;

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      if (!webglReady) {
        currentVal += (92 - currentVal) * 1.7 * dt;
      } else {
        currentVal += (100 - currentVal) * 6 * dt;
        if (currentVal >= 99.4) currentVal = 100;
      }

      const displayInt = Math.min(100, Math.floor(currentVal));
      setProgress(currentVal);

      if (displayInt >= 100) {
        setStatusText('Releasing fresh bubbles');
      }

      if (currentVal >= 99.9 && webglReady && !scheduledExit) {
        scheduledExit = true;
        setTimeout(() => {
          setOpacity(0);
        }, 140);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 140 + 520);
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [webglReady, onComplete]);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-[22px]"
      style={{
        background: 'radial-gradient(circle at 50% 42%, #ffffff 0%, #eef2ff 45%, #dbe4ff 100%)',
        opacity,
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        transition: 'opacity 0.55s cubic-bezier(0.65, 0, 0.35, 1)',
      }}
    >
      {/* Signboard Logo Preview */}
      <div className={`loader-item flex flex-col items-center ${itemsIn ? 'in' : ''}`}>
        <StarLogoSvg className="w-44 h-20" />
        <span className="font-sans font-extrabold text-sm tracking-wide signboard-marathi -mt-1">
          स्टार लाँड्री ॲन्ड ड्रायक्लिनर्स
        </span>
      </div>

      {/* Status line */}
      <div
        className={`loader-item font-mono text-[10px] tracking-[0.28em] uppercase text-[#6b7bb5] ${
          itemsIn ? 'in' : ''
        }`}
        style={{ transitionDelay: '0.12s' }}
      >
        {statusText}
      </div>

      {/* Progress bar */}
      <div
        className={`loader-item rounded-[99px] overflow-visible ${itemsIn ? 'in' : ''}`}
        style={{
          width: 'clamp(180px, 32vw, 280px)',
          height: '2px',
          background: 'rgba(14, 42, 197, 0.14)',
          transitionDelay: '0.24s',
        }}
      >
        <div
          className="h-full rounded-[99px]"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #5175ff 0%, #0e2ac5 100%)',
            boxShadow: '0 0 14px rgba(47, 105, 255, 0.55)',
            transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* Counter */}
      <div
        className={`loader-item font-mono text-[11px] tracking-[0.1em] text-[#0e2ac5] font-bold tabular-nums ${
          itemsIn ? 'in' : ''
        }`}
        style={{ transitionDelay: '0.36s' }}
      >
        {String(Math.min(100, Math.floor(progress))).padStart(3, '0')}%
      </div>
    </div>
  );
};

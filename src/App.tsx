import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PALETTE_PRESETS } from './data/constants';
import { PalettePreset } from './types';
import { Preloader } from './components/Preloader';
import { WashingMachine } from './components/WashingMachine';
import { ThreeCanvas } from './components/ThreeCanvas';
import { BubbleCursor } from './components/BubbleCursor';
import { SiteHeader } from './components/SiteHeader';
import { StudioDrawer } from './components/StudioDrawer';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { DeliverySection } from './components/DeliverySection';
import { DigitalBillingSection } from './components/DigitalBillingSection';
import { SiteFooter } from './components/SiteFooter';
import { RateCalculatorModal } from './components/RateCalculatorModal';

export const App: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<PalettePreset>(PALETTE_PRESETS[0]);
  const [ballColor, setBallColor] = useState<string>(PALETTE_PRESETS[0].ballColor);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [webglReady, setWebglReady] = useState<boolean>(false);
  const [sceneStarted, setSceneStarted] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [calculatorOpen, setCalculatorOpen] = useState<boolean>(false);
  const [bgStage, setBgStage] = useState<number>(0);

  // Smooth scroll driver
  const targetScrollYRef = useRef(window.scrollY);
  const currentScrollYRef = useRef(window.scrollY);
  const isSmoothScrollingRef = useRef(false);

  const updateScrollProgress = useCallback(() => {
    const vh = window.innerHeight || 1;
    const progress = window.scrollY / vh;
    setScrollProgress(progress);

    const stage = progress > 1.55 ? 2 : progress > 0.7 ? 1 : 0;
    setBgStage(stage);
  }, []);

  // Smooth Scroll Tick Loop
  useEffect(() => {
    const LERP_FACTOR = 0.09;
    const WHEEL_MULTIPLIER = 1;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (e.ctrlKey || target?.closest('#studio-drawer') || target?.closest('.overflow-y-auto')) {
        return;
      }
      e.preventDefault();
      if (!isSmoothScrollingRef.current) {
        targetScrollYRef.current = window.scrollY;
        currentScrollYRef.current = window.scrollY;
        isSmoothScrollingRef.current = true;
      }
      targetScrollYRef.current = Math.max(
        0,
        Math.min(getMaxScroll(), targetScrollYRef.current + e.deltaY * WHEEL_MULTIPLIER)
      );
    };

    const handleScroll = () => {
      if (!isSmoothScrollingRef.current) {
        targetScrollYRef.current = window.scrollY;
        currentScrollYRef.current = window.scrollY;
      }
      updateScrollProgress();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    let animId = 0;
    const tick = () => {
      if (isSmoothScrollingRef.current) {
        currentScrollYRef.current +=
          (targetScrollYRef.current - currentScrollYRef.current) * LERP_FACTOR;
        if (Math.abs(targetScrollYRef.current - currentScrollYRef.current) < 0.35) {
          currentScrollYRef.current = targetScrollYRef.current;
          isSmoothScrollingRef.current = false;
        }
        window.scrollTo(0, currentScrollYRef.current);
        updateScrollProgress();
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    updateScrollProgress();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
      cancelAnimationFrame(animId);
    };
  }, [updateScrollProgress]);

  // IntersectionObserver for .reveal and .footer-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    const elements = document.querySelectorAll('.reveal, .footer-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sceneStarted]);

  // Navigate to element
  const navigateTo = useCallback((targetSelector: string) => {
    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      const top = targetEl.getBoundingClientRect().top + window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollYRef.current = Math.max(0, Math.min(maxScroll, top));
      isSmoothScrollingRef.current = true;
    }
  }, []);

  const handleSelectPreset = (preset: PalettePreset) => {
    setSelectedTheme(preset);
    setBallColor(preset.ballColor);
  };

  const handleResetPreset = () => {
    const def = PALETTE_PRESETS[0];
    setSelectedTheme(def);
    setBallColor(def.ballColor);
  };

  return (
    <div className={`relative min-h-screen text-[#1a1a1a] ${sceneStarted ? 'scene-started' : ''}`}>
      {/* 3 Fixed Background Gradient Layers */}
      <div
        id="bg-layer-0"
        className="bg-stage-layer"
        style={{
          background: selectedTheme.heroGradient,
          opacity: bgStage === 0 ? 1 : 0,
        }}
      />
      <div
        id="bg-layer-1"
        className="bg-stage-layer"
        style={{
          background: 'radial-gradient(circle at center, #ffffff 0%, #fbffe5 38%, #e8ff9c 100%)',
          opacity: bgStage === 1 ? 1 : 0,
        }}
      />
      <div
        id="bg-layer-2"
        className="bg-stage-layer"
        style={{
          background: 'radial-gradient(circle at center, #ffffff 0%, #fff0f1 38%, #ffd1d5 100%)',
          opacity: bgStage === 2 ? 1 : 0,
        }}
      />

      {/* Pre-roll Loader */}
      <Preloader
        webglReady={webglReady}
        onComplete={() => {
          setSceneStarted(true);
          document.body.classList.add('scene-started');
        }}
      />

      {/* Center Washing Machine with spinning drum & 32 erupting DOM bubbles */}
      <WashingMachine scrollProgress={scrollProgress} sceneStarted={sceneStarted} />

      {/* Fixed Three.js WebGL Simulation Canvas */}
      <ThreeCanvas
        ballColor={ballColor}
        scrollProgress={scrollProgress}
        sceneStarted={sceneStarted}
        onReady={() => setWebglReady(true)}
      />

      {/* Custom Gol Soap Bubble Mouse Cursor + Trail */}
      <BubbleCursor />

      {/* Fixed Site Header */}
      <SiteHeader
        sceneStarted={sceneStarted}
        onNavigate={navigateTo}
      />

      {/* Studio Controls Drawer (Palette Switcher) */}
      <StudioDrawer
        isOpen={drawerOpen}
        selectedThemeId={selectedTheme.id}
        onSelectPreset={handleSelectPreset}
        onReset={handleResetPreset}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Interactive Laundry Bill & Pickup Estimator Modal */}
      <RateCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />

      {/* Main Scrollable Content */}
      <main className="relative z-10">
        <HeroSection onScrollToServices={() => navigateTo('#section-drop')} />
        <ServicesSection onOpenCalculator={() => setCalculatorOpen(true)} />
        <DeliverySection />
        <DigitalBillingSection />
      </main>

      {/* Site Footer */}
      <SiteFooter onNavigate={navigateTo} />
    </div>
  );
};

export default App;

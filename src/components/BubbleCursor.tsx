import React, { useEffect, useRef } from 'react';

export const BubbleCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let lastTrailTime = 0;
    let animId = 0;

    const spawnTrailBubble = (x: number, y: number) => {
      const trailLayer = trailContainerRef.current;
      if (!trailLayer) return;
      const tb = document.createElement('div');
      tb.className = 'trail-bubble';
      const sz = 7 + Math.random() * 12;
      const dx = (Math.random() - 0.5) * 44;
      const dy = -(24 + Math.random() * 48);
      tb.style.width = `${sz}px`;
      tb.style.height = `${sz}px`;
      tb.style.setProperty('--tx0', `${x - sz / 2}px`);
      tb.style.setProperty('--ty0', `${y - sz / 2}px`);
      tb.style.setProperty('--tx1', `${x - sz / 2 + dx}px`);
      tb.style.setProperty('--ty1', `${y - sz / 2 + dy}px`);
      trailLayer.appendChild(tb);
      setTimeout(() => tb.remove(), 720);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (currentX < 0) {
        currentX = e.clientX;
        currentY = e.clientY;
      }
      targetX = e.clientX;
      targetY = e.clientY;
      if (cursorRef.current) cursorRef.current.style.opacity = '1';

      const now = performance.now();
      if (now - lastTrailTime > 42) {
        lastTrailTime = now;
        spawnTrailBubble(e.clientX, e.clientY);
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, select, textarea');
      if (cursorRef.current) {
        cursorRef.current.classList.toggle('is-hovering', !!interactive);
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add('is-down');
    };
    const handleMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('is-down');
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      currentX += (targetX - currentX) * 0.28;
      currentY += (targetY - currentY) * 0.28;
      if (cursorRef.current && currentX >= 0) {
        cursorRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={trailContainerRef} id="bubble-trail-layer" aria-hidden="true" />
      <div ref={cursorRef} id="bubble-cursor" aria-hidden="true" />
    </>
  );
};

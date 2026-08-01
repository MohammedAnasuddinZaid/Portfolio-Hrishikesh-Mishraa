import React, { useEffect, useState } from 'react';

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);

  let trailId = 0;

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTrails(prev => {
        const newTrail = { id: trailId++, x: e.clientX, y: e.clientY, opacity: 0.5 };
        return [...prev.slice(-5), newTrail];
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .soft-card, .glow-card, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId: number;
    const updateFollower = () => {
      setFollower((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      setTrails(prev => prev.map(t => ({ ...t, opacity: t.opacity - 0.02 })).filter(t => t.opacity > 0));
      animationFrameId = requestAnimationFrame(updateFollower);
    };

    animationFrameId = requestAnimationFrame(updateFollower);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {trails.map(t => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(176, 52, 46, 0.3)',
            transform: `translate3d(${t.x - 2}px, ${t.y - 2}px, 0)`,
            opacity: t.opacity,
          }}
        />
      ))}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-75 ease-out"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: '#b0342e',
          boxShadow: '0 0 12px rgba(176, 52, 46, 0.4)',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0) scale(${isClicking ? 0.6 : isHovered ? 1.5 : 1})`,
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998] rounded-full transition-all duration-200 ease-out"
        style={{
          width: isHovered ? '64px' : '28px',
          height: isHovered ? '64px' : '28px',
          borderColor: isHovered ? 'rgba(176, 52, 46, 0.5)' : 'rgba(50, 48, 47, 0.18)',
          backgroundColor: isHovered ? 'rgba(176, 52, 46, 0.06)' : 'transparent',
          border: '1px solid',
          transform: `translate3d(${follower.x - (isHovered ? 32 : 14)}px, ${follower.y - (isHovered ? 32 : 14)}px, 0) scale(${isClicking ? 0.85 : 1})`,
        }}
      />
    </>
  );
};

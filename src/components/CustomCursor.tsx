import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Track interactive elements
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .glass-card, [role="button"]');
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

  // Smooth lerp for outer follower ring
  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId: number;
    const updateFollower = () => {
      setFollower((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateFollower);
    };

    animationFrameId = requestAnimationFrame(updateFollower);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-75 ease-out"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#b4c5ff',
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isClicking ? 0.6 : isHovered ? 1.5 : 1})`,
        }}
      />

      {/* Outer Follower Ring */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full transition-all duration-300 ease-out border mix-blend-difference"
        style={{
          width: isHovered ? '72px' : '36px',
          height: isHovered ? '72px' : '36px',
          borderColor: isHovered ? 'rgba(180, 197, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovered ? 'rgba(180, 197, 255, 0.1)' : 'transparent',
          transform: `translate3d(${follower.x - (isHovered ? 36 : 18)}px, ${follower.y - (isHovered ? 36 : 18)}px, 0) scale(${isClicking ? 0.9 : 1})`,
        }}
      />
    </>
  );
};

// components/SwipeNavigator.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface SwipeNavigatorProps {
  nextPage?: string;
  prevPage?: string;
}

const SwipeNavigator = ({ nextPage, prevPage }: SwipeNavigatorProps) => {
  const router = useRouter();
  let touchStartX = 0;
  let touchEndX = 0;

  const minSwipeDistance = 100; 
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && nextPage) {
      router.push(nextPage);
    } else if (isRightSwipe && prevPage) {
      router.push(prevPage);
    }

    // Reset values
    touchStartX = 0;
    touchEndX = 0;
  };

  useEffect(() => {
    // Add event listeners
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextPage, prevPage]); // Re-run effect when pages change

  return (
    // This div provides a visual cue for the swipe area (optional)
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      pointerEvents: 'none',
      background: 'transparent'
    }} />
  );
};

export default SwipeNavigator;
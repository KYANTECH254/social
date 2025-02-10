"use client"
import { useState, useRef } from 'react';
import BottomPopupModal from '../PopUps/BottomPopupModal/BottomPopupModal';
import ThreeDashesIcon from '../Icons/TripleDashIcon';
import { ClipboardCopyIcon, Reply, Trash2, Forward } from 'lucide-react';

interface OutgoingMessageProps {
  id: string;
  text: string;
  time: string;
  name:string;
  onReply: (messageId: string, isReply: boolean) => void;
}

export default function OutgoingMessage({ id, text, time,name, onReply }: OutgoingMessageProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const swipeThreshold = 50;

  // Long-press (hold) logic to open the popup
  const startHoldTimer = () => {
    holdTimerRef.current = setTimeout(() => {
      setShowPopup(true);
    }, 1500);
  };

  const cancelHoldTimer = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  // Touch event handlers for left swipe detection (for outgoing messages)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
    startHoldTimer();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current !== null) {
      const deltaX = e.touches[0].clientX - touchStartXRef.current;
      if (deltaX < 0) { // swipe left: deltaX is negative
        cancelHoldTimer();
        // Calculate max swipe (90% of the screen width)
        const maxSwipe = window.innerWidth * 0.15;
        setTranslateX(Math.max(deltaX, -maxSwipe));
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    cancelHoldTimer();
    if (translateX <= -swipeThreshold) {
      // Trigger reply action if swipe left exceeds threshold
      onReply(id, true);
    }
    // Animate back to original position
    setTranslateX(0);
    touchStartXRef.current = null;
  };

  // Popup actions (triggered by long-press popup)
  const handleReply = () => {
    onReply(id, true);
    setShowPopup(false);
  };

  const handleDelete = () => {
    console.log("Deleting message with id:", id);
    setShowPopup(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => console.log("Message copied to clipboard"))
      .catch((err) => console.error("Error copying text:", err));
    setShowPopup(false);
  };

  const handleForward = () => {
    console.log("Forwarding message with id:", id);
    setShowPopup(false);
  };

  return (
    <>
      <div
        className="flex items-end justify-end"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={startHoldTimer}
        onMouseUp={cancelHoldTimer}
        onMouseLeave={cancelHoldTimer}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: translateX === 0 ? 'transform 0.3s ease-out' : 'none',
        }}
      >
        <div className="bg-[var(--main-color)] text-white p-3 rounded-lg shadow max-w-xs">
          <p>{text}</p>
          <div className="flex items-center justify-end mt-2 space-x-2">
            <span className="text-xs text-white/90">{time}</span>
            <ThreeDashesIcon className="w-4 h-4 text-white/90" />
          </div>
        </div>
      </div>

      <BottomPopupModal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className="p-4 flex flex-col gap-4">
          <p className="text-lg font-bold">Reply to Message</p>
          <div className="flex justify-around">
            <button
              onClick={handleReply}
              className="px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              <Reply size={24} />
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              <Trash2 size={24} />
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              <ClipboardCopyIcon size={24} />
            </button>
            <button
              onClick={handleForward}
              className="px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              <Forward size={24} />
            </button>
          </div>
        </div>
      </BottomPopupModal>
    </>
  );
}

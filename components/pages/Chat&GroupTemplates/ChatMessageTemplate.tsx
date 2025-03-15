"use client";
import { useState, useRef } from "react";

export default function ChatMessageTemplate({
    children,
    onReply,
    messageId,
    type
}: {
    children: any;
    onReply: (messageId: string, isReply: boolean) => void;
    messageId: string;
    type: string;
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartXRef = useRef<number | null>(null);
    const swipeThreshold = 50;

    const startHoldTimer = () => {
        holdTimerRef.current = setTimeout(() => {
            setShowPopup(true);
        }, 500);
    };

    const cancelHoldTimer = () => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartXRef.current = e.touches[0].clientX;
        startHoldTimer();
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartXRef.current !== null) {
            const deltaX = e.touches[0].clientX - touchStartXRef.current;
            if (deltaX > 0) {
                cancelHoldTimer();
                const maxSwipe = window.innerWidth * 0.15;
                setTranslateX(Math.min(deltaX, maxSwipe));
            }
        }
    };

    const handleTouchEnd = () => {
        cancelHoldTimer();
        if (translateX >= swipeThreshold) {
            onReply(messageId, true);
        }
        setTranslateX(0);
        touchStartXRef.current = null;
    };

    const handleRightTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartXRef.current !== null) {
            const deltaX = e.touches[0].clientX - touchStartXRef.current;
            if (deltaX < 0) {
                cancelHoldTimer();
                const maxSwipe = window.innerWidth * 0.15;
                setTranslateX(Math.max(deltaX, -maxSwipe));
            }
        }
    };

    const handleRightTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        cancelHoldTimer();
        if (translateX <= -swipeThreshold) {
            onReply(messageId, true);
        }
        setTranslateX(0);
        touchStartXRef.current = null;
    };

    return (
        <div
            className={type === "outgoing" ? "flex items-end justify-end" : "flex items-end"}
            onMouseDown={startHoldTimer}
            onMouseUp={cancelHoldTimer}
            onMouseLeave={cancelHoldTimer}
            onTouchStart={handleTouchStart}
            onTouchMove={type === "outgoing" ? handleRightTouchMove : handleTouchMove}
            onTouchEnd={type === "outgoing" ? handleRightTouchEnd : handleTouchEnd}
            style={{
                transform: `translateX(${translateX}px)`,
                transition: translateX === 0 ? 'transform 0.3s ease-out' : 'none',
            }}
        >
            {children}
        </div>
    );
}

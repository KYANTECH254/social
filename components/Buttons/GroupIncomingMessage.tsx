"use client"
import { useState, useRef } from 'react';
import BottomPopupModal from '../PopUps/BottomPopupModal/BottomPopupModal';
import { ClipboardCopyIcon, Reply, Trash2, Forward } from 'lucide-react';

interface ReplyMessage {
    id: string;
    text: string;
    time: string;
    name: string;
    color: string;
}

interface IncomingMessageProps {
    id: string;
    text: string;
    time: string;
    name: string;
    color: string;
    isReply: boolean;
    replyID: string | null;
    replyMessage?: ReplyMessage;
    onReply: (messageId: string, isReply: boolean) => void;
}

export default function GroupIncomingMessage({ id, text, time, name, isReply, replyID, replyMessage, onReply, color }: IncomingMessageProps) {
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

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        cancelHoldTimer();
        if (translateX >= swipeThreshold) {
            onReply(id, true);
        }
        setTranslateX(0);
        touchStartXRef.current = null;
    };

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
                className="flex items-end"
                onMouseDown={startHoldTimer}
                onMouseUp={cancelHoldTimer}
                onMouseLeave={cancelHoldTimer}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateX(${translateX}px)`,
                    transition: translateX === 0 ? 'transform 0.3s ease-out' : 'none',
                }}
            >
                <div className="flex flex-row">
                    <img src="./../assets/images/profile-bg.png" alt="Profile" className='w-8 h-8 rounded-full bg-gray-700 -ml-2 mr-1' />
                    <div className={`${isReply && replyMessage ? 'p-1' : 'p-3'} rounded-lg shadow bg-gray-800`}>
                        <div className={`font-semibold text-xs text-${color} ${isReply && replyMessage ? 'p-1' : ''}`}>EBENEZER</div>
                        {isReply && replyMessage && (
                            <div className="mb-2 p-2 bg-gray-700 rounded-md border-l-4 border-gray-500">
                                <p className="text-xs font-bold text-gray-500">{replyMessage.name}</p>
                                <p className="text-sm line-clamp-2">{replyMessage.text}</p>
                            </div>
                        )}
                        <p className={isReply ? 'ml-1' : ''}>{text}</p>
                        <div className="flex items-center justify-end space-x-2">
                            <span className="text-xs text-gray-500">{time}</span>
                        </div>
                    </div>
                </div>
            </div>

            <BottomPopupModal isOpen={showPopup} onClose={() => setShowPopup(false)} size={0.3}>
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

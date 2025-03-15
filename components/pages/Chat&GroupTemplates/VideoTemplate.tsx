"use client";

import { Download, Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { renderText } from "../Chat&GroupFunctions/Functions";

export default function VideoTemplate({ file, fileSize, text }: any) {
    const [remainingTime, setRemainingTime] = useState("0:00");
    const [isPlaying, setIsPlaying] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    let hideOverlayTimeout = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }

        setIsPlaying(!isPlaying);
        resetOverlayTimeout();
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
        setRemainingTime(formatTime(timeLeft));
    };

    const resetOverlayTimeout = () => {
        setShowOverlay(true);
        if (hideOverlayTimeout.current) clearTimeout(hideOverlayTimeout.current);
        hideOverlayTimeout.current = setTimeout(() => {
            setShowOverlay(false);
        }, 1000);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowOverlay(true);
        resetOverlayTimeout();
    };

    useEffect(() => {
        return () => {
            if (hideOverlayTimeout.current) clearTimeout(hideOverlayTimeout.current);
        };
    }, []);

    return (
        <div className="flex flex-col gap-1 relative group">
            <div className="relative w-full h-full max-h-60">
                <video
                    ref={videoRef}
                    src={`http://localhost:3000/${file}`}
                    className="w-full h-full max-h-60 object-cover rounded-md"
                    onLoadedMetadata={(e: any) => {
                        setRemainingTime(formatTime(e.target.duration));
                    }}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => {
                        setIsPlaying(true);
                        resetOverlayTimeout();
                    }}
                    onPause={() => setIsPlaying(false)}
                    onClick={handleOverlayClick} 
                />

                {showOverlay && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/40 rounded-md"
                    >
                        <div className="w-16 h-16 flex items-center justify-center bg-white/30 
                                       rounded-full transition duration-300 hover:bg-white/20">
                            {isPlaying ? (
                                <Pause className="w-10 h-10 text-[var(--main-text-color)]" fill="currentColor" />
                            ) : (
                                <Play className="w-10 h-10 text-[var(--main-text-color)]" fill="currentColor" />
                            )}
                        </div>
                    </button>
                )}

                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                    {remainingTime}
                </div>
            </div>

            <div className="flex flex-row gap-1 items-center justify-end">
                <div className="text-xs mr-2">{fileSize}</div>
                <a
                    href={`${window.location.origin}/${file}`}
                    download
                    className="text-white rounded-md text-center"
                >
                    <Download size={20} />
                </a>
            </div>

            <div className="flex flex-col">{renderText(text)}</div>
        </div>
    );
}

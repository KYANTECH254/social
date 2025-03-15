"use client"

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";

export default function AudioTemplate({ file, fileSize, filetype }: any) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState("0:00");
    const [currentTime, setCurrentTime] = useState("0:00");

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(currentProgress || 0);
        setCurrentTime(formatTime(audioRef.current.currentTime));
    };

    const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!audioRef.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const seekTime = ((event.clientX - rect.left) / rect.width) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setProgress((seekTime / audioRef.current.duration) * 100);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onloadedmetadata = () => {
                setDuration(formatTime(audioRef.current?.duration || 0));
            };
        }
    }, []);

    return (
        <div className="flex flex-col w-56 h-18 p-2 bg-black/30 rounded-lg shadow mt-1 gap-1">
            <div className="flex flex-row w-full items-center gap-2">
                <button onClick={togglePlay} className="p-2 bg-blue-500 rounded-full text-[var(main-text-color)] w-8 h-8 flex items-center justify-center">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <div className="relative w-full" onMouseDown={handleSeek}>
                    <div className="bg-gray-300 h-2 rounded-full overflow-hidden cursor-pointer">
                        <div className="bg-blue-500 h-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <audio ref={audioRef} src={file.startsWith("http") ? file : `${window.location.origin}/${file}`} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="text-xs">{filetype} · {fileSize}</div>
                <div className="flex justify-end text-xs">{currentTime} / {duration}</div>
                <a
                    href={`${window.location.origin}/${file}`}
                    download
                    className="text-white rounded-md text-center"
                >
                    <Download size={20} />
                </a>
            </div>
        </div>
    );
}

// components/CustomVideoPlayer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Volume2, VolumeX, FastForward, Rewind, Play, Pause } from 'lucide-react';

interface CustomVideoPlayerProps {
    src: string;
    className?: string;
}

const speedOptions = [0.25, 0.5, 0.75, 1, 1.5, 2, 3];

const CustomVideoPlayer = ({ src, className }: CustomVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeout = useRef<NodeJS.Timeout>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleLoadedData = () => setDuration(video.duration);
            video.addEventListener('loadeddata', handleLoadedData);
            return () => video.removeEventListener('loadeddata', handleLoadedData);
        }
    }, []);

    const toggleControls = () => {
        setShowControls(prev => !prev);
        resetControlsTimeout();
    };

    const resetControlsTimeout = () => {
        clearTimeout(controlsTimeout.current);
        controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
    };

    const togglePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) {
            isPlaying ? video.pause() : video.play();
            setIsPlaying(!isPlaying);
        }
        resetControlsTimeout();
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) setCurrentTime(video.currentTime);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.MouseEvent, seconds: number) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) {
            video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
            setCurrentTime(video.currentTime);
        }
        resetControlsTimeout();
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        resetControlsTimeout();
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted(prev => !prev);
        resetControlsTimeout();
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = src;
        link.download = `video-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resetControlsTimeout();
    };

    useEffect(() => {
        resetControlsTimeout();
        return () => clearTimeout(controlsTimeout.current);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.volume = volume;
            video.muted = isMuted;
        }
    }, [volume, isMuted]);

    return (
        <div
            className={`relative group ${className}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => {
                setShowControls(false);
                clearTimeout(controlsTimeout.current);
            }}
            onClick={(e) => e.target === e.currentTarget && toggleControls()}
        >
            <video
                ref={videoRef}
                src={src}
                className={`w-full h-full object-cover ${showControls ? 'pointer-events-none' : ''}`}
                onClick={togglePlayPause}
                onTimeUpdate={handleTimeUpdate}
            />

            {showControls && (
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent p-4 z-50">
                    {/* Top Controls */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={(e) => handleSeek(e, -5)}
                                className="text-white hover:text-blue-600 transition-colors z-50"
                            >
                                <Rewind size={24} />
                            </button>
                            <span className="text-white text-sm z-50">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 z-50">
                            <select
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                                className="bg-black/50 text-white px-2 py-1 rounded"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {speedOptions.map((speed) => (
                                    <option key={speed} value={speed}>
                                        {speed}x
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleDownload}
                                className="text-white hover:text-blue-600 transition-colors"
                            >
                                <Download size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Center Play/Pause */}
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        <button
                            onClick={togglePlayPause}
                            className="text-white hover:text-blue-600 transition-colors bg-black/50 rounded-full p-3"
                        >
                            {isPlaying ? (
                                <Pause size={48} className="opacity-75" />
                            ) : (
                                <Play size={48} className="opacity-75" />
                            )}
                        </button>
                    </div>

                    {/* Bottom Controls */}
                    <div className="flex items-center justify-between gap-4 z-50">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-blue-600 transition-colors"
                            >
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                onClick={(e) => e.stopPropagation()}
                                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-blue-600"
                            />
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <button
                                onClick={(e) => handleSeek(e, -5)}
                                className="text-white hover:text-blue-600 transition-colors"
                            >
                                <Rewind size={24} />
                            </button>
                            <span className="text-white text-sm z-50">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                            <button
                                onClick={(e) => handleSeek(e, 5)}
                                className="text-white hover:text-blue-600 transition-colors"
                            >
                                <FastForward size={24} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 z-50">
                            <select
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                                className="bg-black/50 text-white px-2 py-1 rounded"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {speedOptions.map((speed) => (
                                    <option key={speed} value={speed}>
                                        {speed}x
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleDownload}
                                className="text-white hover:text-blue-600 transition-colors"
                            >
                                <Download size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomVideoPlayer;
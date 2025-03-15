// components/CustomVideoPlayer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Volume2, VolumeX, FastForward, Rewind, Play, Pause, Volume } from 'lucide-react';
import PlayAndPause from './Play&Pause';
import VolumeAndMute from './Volume&Mute';
import Seek from './Seek';
import DownloadBtn from './Download';
import SpeedOptionsBtn from './SpeedOptions';

interface CustomVideoPlayerProps {
    src: string;
    className?: string;
}

const speedOptions = [0.25, 0.5, 0.75, 1, 1.5, 2, 3];

const CustomVideoPlayer = ({ src, className }: CustomVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeout = useRef<NodeJS.Timeout>();
    const progressBarRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [finalduration, setFinalDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isSeeking, setIsSeeking] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            if (video.duration && !isNaN(video.duration) && video.duration > 0) {
                setDuration(video.duration);
                setFinalDuration(video.duration);
                console.log("Final Duration Set:", video.duration);
            }
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        if (video.readyState >= 1) {
            handleLoadedMetadata();
        }

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [videoRef.current]);


    useEffect(() => {
        let animationFrameId: number;

        const updateProgress = () => {
            const video = videoRef.current;
            if (video && !isSeeking) {
                setCurrentTime(video.currentTime);
                animationFrameId = requestAnimationFrame(updateProgress);
            }
        };

        if (isPlaying) {
            animationFrameId = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying, isSeeking]);

    const toggleControls = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (showControls) {
            setShowControls(false);
        } else {
            setShowControls(true);
        }
    };

    const hideControlsOnLeave = () => {
        setShowControls(false);
    };

    const togglePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (video) {
            isPlaying ? video.pause() : video.play();
            setIsPlaying(!isPlaying);
        }
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

    // const handleSeek = (e: React.MouseEvent, seconds: number) => {
    //     e.stopPropagation();
    //     const video = videoRef.current;
    //     if (video) {
    //         video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
    //         setCurrentTime(video.currentTime);
    //     }
    // };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted(prev => !prev);
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = src;
        link.download = `video-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSeekStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video || !progressBarRef.current) return;

        setIsSeeking(true);
        setShowControls(true);
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = progressBarRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const percentage = Math.min(Math.max(x / rect.width, 0), 1);
            const newTime = percentage * duration;

            video.currentTime = newTime;
            setCurrentTime(newTime);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setIsSeeking(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Initial seek
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.min(Math.max(x / rect.width, 0), 1);
        const newTime = percentage * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // const handleSeekStartTouch = (e: React.TouchEvent) => {
    //     e.stopPropagation();
    //     const video = videoRef.current;
    //     if (!video || !progressBarRef.current) return;

    //     setIsSeeking(true);
    //     setShowControls(true);
    //     if (controlsTimeout.current) clearTimeout(controlsTimeout.current);

    //     const getNewTime = (touch: Touch) => {
    //         const rect = progressBarRef.current!.getBoundingClientRect();
    //         const x = touch.clientX - rect.left;
    //         const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    //         return percentage * duration;
    //     };

    //     const handleTouchMove = (e: TouchEvent) => {
    //         if (!e.touches[0]) return;
    //         const newTime = getNewTime(e.touches[0]);
    //         video.currentTime = newTime;
    //         setCurrentTime(newTime);
    //     };

    //     const handleTouchEnd = () => {
    //         document.removeEventListener('touchmove', handleTouchMove);
    //         document.removeEventListener('touchend', handleTouchEnd);
    //         setIsSeeking(false);
    //     };

    //     document.addEventListener('touchmove', handleTouchMove);
    //     document.addEventListener('touchend', handleTouchEnd);

    //     const newTime = getNewTime(e.touches[0]);
    //     video.currentTime = newTime;
    //     setCurrentTime(newTime);
    // };

    const showControlsOnMove = () => {
        if (isSeeking) return;
        setShowControls(true);
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        controlsTimeout.current = setTimeout(() => setShowControls(false), 2000);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.volume = volume;
            video.muted = isMuted;
            video.playbackRate = playbackSpeed;
        }
    }, [volume, isMuted, playbackSpeed]);

    return (
        <div
            className={`relative w-full h-full max-h-screen overflow-hidden flex items-center justify-center group ${className}`}
            onMouseMove={showControlsOnMove}
            onClick={(e) => {
                if (e.target === e.currentTarget) togglePlayPause(e);
                toggleControls(e);
            }}
        >
            <div className="flex flex-col w-full max-h-full">
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full max-h-full object-cover bg-red-500"
                    onClick={togglePlayPause}
                    onTimeUpdate={handleTimeUpdate}
                />

                {/* Controls Overlay */}
                <div
                    onMouseEnter={showControlsOnMove}
                    onMouseLeave={hideControlsOnLeave}
                    onClick={(e) => { toggleControls(e) }}
                    className={` absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/60 to-transparent p-4 z-20 
                ${showControls ? 'opacity-100' : 'opacity-0'} 
                transition-opacity`}>

                    {/* Top Controls */}
                    <div className="flex justify-between items-center">
                    </div>

                    {/* Center Play/Pause */}
                    <PlayAndPause
                        isPlaying={isPlaying}
                        togglePlayPause={togglePlayPause}
                    />
                </div>
                {/* Bottom Controls */}
                <div className="bg-black/60 flex flex-col align-top items-start justify-between gap-1 z-50 h-36 w-full p-2 bottom-0 absolute">
                    <div className="flex flex-row items-center justify-between w-full">
                        <VolumeAndMute isMuted={isMuted} toggleMute={toggleMute} volume={volume} handleVolumeChange={handleVolumeChange} />
                        {/* Progress Bar */}
                        <div className="w-full px-1">
                            <div className="w-full flex items-center gap-2">
                                <span className="text-white text-sm">
                                    {formatTime(currentTime)}
                                </span>
                                <div
                                    ref={progressBarRef}
                                    className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative ml-2 
                                               before:absolute before:top-[-8px] before:bottom-[-8px] before:left-0 before:right-0 before:content-['']"
                                    onMouseDown={handleSeekStart}
                                    // onTouchStart={handleSeekStartTouch}
                                >
                                    <div
                                        className="h-full rounded-full absolute top-0 left-0 transition-all duration-150 linear"
                                        style={{ width: `${Math.min(100, Math.max(0, (currentTime / (duration || 0.0001)) * 100))}%` }}
                                    />

                                    <div
                                        className="w-4 h-4 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2 shadow transition-all duration-150 linear"
                                        style={{ left: `${Math.min(100, Math.max(0, (currentTime / (duration || 0.0001)) * 100))}%` }}
                                    />
                                </div>

                                <span className="text-white text-sm ml-2">
                                    {formatTime(finalduration)}
                                </span>
                            </div>
                        </div>

                        <SpeedOptionsBtn
                            playbackSpeed={playbackSpeed}
                            setPlaybackSpeed={setPlaybackSpeed}
                            speedOptions={speedOptions}
                        />
                        <div className="flex items-center gap-4 z-50">
                            <DownloadBtn
                                handleDownload={handleDownload}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CustomVideoPlayer;
// components/StatusViewer.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import CustomVideoPlayer from '../CustomVideoPlayer';

interface Status {
    id: string;
    type: 'image' | 'video' | 'text';
    content: string;
}

interface StatusViewerProps {
    statuses: Status[];
}

const StatusViewer = ({ statuses }: StatusViewerProps) => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likes, setLikes] = useState<{ [key: string]: number }>({});
    const [comments, setComments] = useState<{ [key: string]: number }>({});
    const [saves, setSaves] = useState<{ [key: string]: number }>({});

    const handleLike = (statusId: string) => {
        setLikes(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) + 1 }));
    };

    const handleComment = (statusId: string) => {
        setComments(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) + 1 }));
    };

    const handleSave = (statusId: string) => {
        setSaves(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) + 1 }));
    };

    const formatCount = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    const goNext = () => {
        if (currentIndex < statuses.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (statuses.length === 0) return <div>No statuses available</div>;

    const currentStatus = statuses[currentIndex];

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Progress Bar */}
            <div className="absolute top-4 left-0 right-0 z-50 flex justify-center gap-1 px-4">
                {statuses.map((_, index) => (
                    <div
                        key={index}
                        className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden"
                    >
                        <div
                            className={`h-full ${index === currentIndex ? 'bg-white animate-progress' : ''}`}
                            style={{ width: index <= currentIndex ? '100%' : '0%' }}
                        />
                    </div>
                ))}
            </div>

            {/* Status Content */}
            <div className="relative h-full w-full flex items-center justify-center">
                {currentStatus.type === 'image' && (
                    <img
                        src={currentStatus.content}
                        alt="Status"
                        className="object-contain h-full w-full"
                    />
                )}

                {currentStatus.type === 'video' && (
                    <CustomVideoPlayer
                        src={currentStatus.content}
                        className="h-full w-full"
                    />
                )}

                {currentStatus.type === 'text' && (
                    <div className="text-white text-4xl text-center p-8">
                        {currentStatus.content}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="absolute right-4 bottom-1/4 flex flex-col gap-6 z-50">
                <button
                    onClick={() => handleLike(currentStatus.id)}
                    className="flex flex-col items-center text-white"
                >
                    <Heart className="w-8 h-8 mb-1" />
                    <span className="text-sm">{formatCount(likes[currentStatus.id] || 0)}</span>
                </button>

                <button
                    onClick={() => handleComment(currentStatus.id)}
                    className="flex flex-col items-center text-white"
                >
                    <MessageCircle className="w-8 h-8 mb-1" />
                    <span className="text-sm">{formatCount(comments[currentStatus.id] || 0)}</span>
                </button>

                <button
                    onClick={() => handleSave(currentStatus.id)}
                    className="flex flex-col items-center text-white"
                >
                    <Bookmark className="w-8 h-8 mb-1" />
                    <span className="text-sm">{formatCount(saves[currentStatus.id] || 0)}</span>
                </button>
            </div>

            {/* Navigation Buttons - Moved to bottom */}
            {statuses.length > 1 && (
                <div className="absolute bottom-10 left-0 right-0 flex justify-between px-4 z-50">
                    {currentIndex > 0 && (
                        <button
                            onClick={goBack}
                            className="text-white bg-black/50 rounded-full p-3"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                    )}

                    {currentIndex < statuses.length - 1 && (
                        <button
                            onClick={goNext}
                            className="ml-auto text-white bg-black/50 rounded-full p-3"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatusViewer;
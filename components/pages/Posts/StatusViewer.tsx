// components/StatusViewer.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Bookmark, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import CustomVideoPlayer from '../../VideoPlayer/CustomVideoPlayer';
import { Posts, StatusPost } from '@/types/types';
import BottomPopupModal from '../../PopUps/BottomPopupModal/BottomPopupModal';
import CommentSection from '../../CommentSection/CommentSection';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import Views from './Views';

interface StatusViewerProps {
    statuses: Posts[];
    initialIndex: number;
}

export default function StatusViewer({ statuses }: StatusViewerProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

    const [likes, setLikes] = useState<{ [key: string]: number }>({});
    const [liked, setLiked] = useState<boolean>(false)
    const [commented, setCommented] = useState<boolean>(false)
    const [shared, setShared] = useState<boolean>(false)
    const [viewed, setViewed] = useState<boolean>(false)
    const [views, setViews] = useState<{ [key: string]: number }>({});
    const [comments, setComments] = useState<{ [key: string]: number }>({});
    const [saves, setSaves] = useState<{ [key: string]: number }>({});

    const [showComments, setShowComments] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleLike = (statusId: string) => {
        if (!liked) {
            setLikes(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) + 1 }));
        } else {
            setLikes(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) - 1 }));
        }
        setLiked(prev => !prev)
    };

    const handleComment = (statusId: string) => {
        setComments(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) + 1 }));
        setCommented(prev => !prev)
    };

    const handleSave = (statusId: string) => {
        setSaves(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) + 1 }));
        setShared(prev => !prev)
    };

    const handleViews = (statusId: string) => {
        setViewed((prev) => !prev)
        setViews(prev => ({ ...prev, [statusId]: (prev[statusId] || 0) + 1 }));
    }

    const formatCount = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    const goNext = () => {
        const currentPost = statuses[currentIndex];

        if (currentIndex < currentPost.recentStatus.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else if (statuses[currentIndex + 1]) {
            const nextId = statuses[currentIndex + 1].link;

            router.push(`/status/${nextId}`);
            setCurrentIndex(0); // Reset sub-status index
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else if (statuses[currentIndex - 1]) {
            const prevId = statuses[currentIndex - 1].link;
            router.push(`/status/${prevId}`);
            setCurrentIndex(0); // Reset sub-status index
        }
    };

    const nextStatus = () => {
        if (currentStatusIndex < statuses.length - 1) {
            const nextUser = statuses[currentStatusIndex + 1];

            if (!nextUser) return; // Ensure next user exists

            setCurrentStatusIndex((prev) => prev + 1);
            setCurrentIndex(0); // Reset to first sub-status for the next user
            setSwipeDirection('right');

            setTimeout(() => {
                router.push(`/status/${nextUser.link}`); // Ensure we're using `id`
                console.log(`/status/${nextUser.link}`);
            }, 300);
        }
    };

    const previousStatus = () => {
        if (currentStatusIndex > 0) {
            const prevUser = statuses[currentStatusIndex - 1];

            if (!prevUser) return; // Ensure previous user exists

            setCurrentStatusIndex((prev) => prev - 1);
            setCurrentIndex(0); // Reset to first sub-status for the previous user
            setSwipeDirection('left');

            setTimeout(() => {
                router.push(`/status/${prevUser.link}`);
            }, 300);
        }
    };

    // Swipe Handlers
    const handlers = useSwipeable({
        onSwipedLeft: () => nextStatus(),
        onSwipedRight: () => previousStatus(),
        onSwiping: (eventData) => {
            if (eventData.dir === 'Left') {
                setSwipeDirection('right');
            } else if (eventData.dir === 'Right') {
                setSwipeDirection('left');
            }
        },
        onSwiped: () => setSwipeDirection(null),
        trackMouse: true,
    });

    if (!statuses || statuses.length === 0) return <div>No statuses available</div>;

    const currentPost = statuses[currentStatusIndex] ?? null;
    if (!currentPost || !currentPost.recentStatus) return <div>Loading status...</div>;

    const currentStatus = currentPost.recentStatus[currentIndex] ?? null;
    if (!currentStatus) return <div>Loading status...</div>;

    return (
        <motion.div
            {...handlers}
            className={`relative h-screen w-full flex items-center justify-center overflow-hidden
                ${currentStatus.type === 'text' ? `bg-${currentStatus.bgColor}-500` : 'bg-transparent'}`}
            initial={{ x: 0, opacity: 1 }}
            animate={{
                x: swipeDirection === 'right' ? '-100%' : swipeDirection === 'left' ? '100%' : 0,
                rotateY: swipeDirection === 'right' ? -15 : swipeDirection === 'left' ? 15 : 0,
                opacity: swipeDirection ? 0 : 1
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            {/* Progress Bar */}
            <div className="absolute top-4 left-0 right-0 z-50 flex justify-center gap-1 px-4 animate-">
                {statuses.map((_, index) => (
                    <div
                        key={index}
                        className={index === currentIndex ? "visible" : "hidden"}>
                        <div
                            className={`h-full ${index === currentIndex ? 'bg-white animate-progress' : ''}`}
                            style={{ width: index <= currentIndex ? '100%' : '0%' }}
                        />
                    </div>
                ))}
            </div>

            {/* Status Content */}
            <div className="relative h-full max-w-96 flex items-center justify-center">
                {currentStatus.type === 'image' && (
                    <img
                        src={currentStatus.path || ""}
                        alt="Status"
                        className="object-contain h-full w-full"
                    />
                )}

                {currentStatus.type === 'video' && (
                    <CustomVideoPlayer
                        src={currentStatus.path || ""}
                        className="h-full w-full"
                    />
                )}

                {currentStatus.type === 'text' && (
                    <div className={`bg-${currentStatus.bgColor}-500 text-white  text-4xl text-center p-8 word-break break-all`}>
                        {currentStatus.statusText}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="absolute right-4 bottom-1/4 flex flex-col gap-6 z-50">
                <button
                    onClick={() => handleLike(currentStatus.id)}
                    className={`flex flex-col items-center`}
                >
                    <Heart
                        className={`w-8 h-8 mb-1 transition-transform duration-300 ease-out ${liked ? 'animate-pop' : ''
                            } ${liked ? "text-[var(--main-color)]" : "text-white"}`}
                    />

                    <span className="text-sm text-white">{formatCount(likes[currentStatus.id] || 0)}</span>
                </button>

                <button
                    onClick={() => {
                        handleComment(currentStatus.id);
                        // setShowComments(prev => !prev);
                        setIsOpen(prev => !prev);
                        console.log("showing...");
                    }}
                    className="flex flex-col items-center text-white"
                >
                    <MessageCircle className={`w-8 h-8 mb-1 transition-transform duration-300 ease-out ${commented ? 'animate-pop' : ''
                        } ${commented ? 'text-[var(--main-color)]' : 'text-white'
                        }`}
                    />
                    <span className="text-sm text-white">{formatCount(comments[currentStatus.id] || 0)}</span>
                </button>

                <button
                    onClick={() => handleSave(currentStatus.id)}
                    className="flex flex-col items-center"
                >
                    <Bookmark className={`w-8 h-8 mb-1 transition-transform duration-300 ease-out ${shared ? 'animate-pop' : ''
                        } ${shared ? 'text-[var(--main-color)]' : 'text-white'
                        }`}
                    />
                    <span className="text-sm text-white">{formatCount(saves[currentStatus.id] || 0)}</span>
                </button>
                <button
                    onClick={() => handleViews(currentStatus.id)}
                    className="flex flex-col items-center"
                >
                    <Eye className={`w-8 h-8 mb-1 transition-transform duration-300 ease-out ${shared ? 'animate-pop' : ''
                        } ${shared ? 'text-[var(--main-color)]' : 'text-white'
                        }`}
                    />
                    <span className="text-sm text-white">{formatCount(views[currentStatus.id] || 0)}</span>
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

            {/* Comment Section */}
            <>
                <BottomPopupModal isOpen={isOpen} onClose={() => setIsOpen(false)} size={0.8}>
                    <CommentSection />
                </BottomPopupModal>
            </>
            <>
                <BottomPopupModal isOpen={viewed} onClose={() => setViewed(false)} size={0.4}>
                    <Views />
                </BottomPopupModal>
            </>
        </motion.div>
    );
};
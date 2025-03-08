"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomVideoPlayer from "../../VideoPlayer/CustomVideoPlayer";
import { Status } from "@/types/types";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";

interface StatusViewerProps {
    statuses: Status[];
}

const ALLOWED_TYPES = ["image", "video", "text"];

export default function MyStatusViewer({ statuses }: StatusViewerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const initialIndex = Number(searchParams.get("i")) || 0;
    const validStatuses = statuses.filter((status) => ALLOWED_TYPES.includes(status.type));
    const [currentIndex, setCurrentIndex] = useState(
        initialIndex >= 0 && initialIndex < validStatuses.length ? initialIndex : 0
    );
    const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

    useEffect(() => {
        setCurrentIndex(
            initialIndex >= 0 && initialIndex < validStatuses.length ? initialIndex : 0
        );
    }, [initialIndex, validStatuses.length]);

    const goNext = () => {
        if (currentIndex < validStatuses.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            router.push("/my-posts");
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            router.push("/my-posts");
        }
    };

    const exitStatus = () => {
        setSwipeDirection("up");
        setTimeout(() => router.push("/my-posts"), 300);
    };

    const handlers = useSwipeable({
        onSwipedLeft: goNext,
        onSwipedRight: goBack,
        onSwipedUp: exitStatus,
        onSwiped: () => setSwipeDirection(null),
        trackMouse: true,
    });

    if (!validStatuses.length) return <div>No valid statuses available</div>;

    const currentStatus = validStatuses[currentIndex];

    return (
        <motion.div
            {...handlers}
            className={`relative h-screen w-full flex items-center justify-center overflow-hidden
                ${currentStatus.type === "text" ? `bg-${currentStatus.bgColor}-500` : "bg-transparent"}`}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
                x: swipeDirection === "right" ? "-100%" : swipeDirection === "left" ? "100%" : 0,
                y: swipeDirection === "up" ? "-100%" : 0,
                rotateY: swipeDirection === "right" ? -15 : swipeDirection === "left" ? 15 : 0,
                opacity: swipeDirection ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {/* Progress Bar */}
            <div className="absolute top-4 left-0 right-0 z-50 flex justify-center gap-1 px-4">
                {validStatuses.map((_, index) => (
                    <div key={index} className="w-full h-1 bg-gray-500 rounded">
                        <div
                            className={`h-full ${index === currentIndex ? "bg-white animate-progress" : ""}`}
                            style={{ width: index <= currentIndex ? "100%" : "0%" }}
                        />
                    </div>
                ))}
            </div>

            {/* Status Content */}
            <div className="relative h-full max-w-96 flex items-center justify-center">
                {currentStatus.type === "image" && (
                    <img src={currentStatus.path || ""} alt="Status" className="object-contain h-full w-full" />
                )}

                {currentStatus.type === "video" && (
                    <CustomVideoPlayer src={currentStatus.path || ""} className="h-full w-full" />
                )}

                {currentStatus.type === "text" && (
                    <div className={`bg-${currentStatus.bgColor}-500 text-white text-4xl text-center p-8 break-words`}>
                        {currentStatus.statusText}
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-between px-4 z-50">
                {currentIndex > 0 && (
                    <button onClick={goBack} className="text-white bg-black/50 rounded-full p-3">
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                )}
                {currentIndex < validStatuses.length - 1 && (
                    <button onClick={goNext} className="ml-auto text-white bg-black/50 rounded-full p-3">
                        <ChevronRight className="w-8 h-8" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}

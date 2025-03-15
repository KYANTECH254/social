"use client"
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function LikeButton({ total }: { total: number }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState<number>(total || 0);

    const toggleLike = () => {
        setLiked(!liked);
        setLikes(prev => liked ? prev - 1 : prev + 1);
    };

    return (
        <button
            onClick={toggleLike}
            className="space-x-2 p-2 rounded-md transition flex items-center flex-row gap-1"
        >
            <ThumbsUp
                size={24}
                className={`transition-colors duration-300 ${liked ? "default-color" : "default-text-color"
                    }`}
                fill={liked ? "#2563EB " : "none"}
            />
            <span className="text-sm">{likes > 0 ? likes : ""}</span>
        </button>
    );
}

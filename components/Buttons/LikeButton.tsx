"use client"

import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function LikeButton() {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0); 

    const toggleLike = () => {
        setLiked(!liked);
        setLikes(prev => liked ? prev - 1 : prev + 1);
    };

    return (
        <button
            onClick={toggleLike}
            className="space-x-1 p-2 rounded-md transition-transform duration-200 hover:scale-105 display-center"
        >
            <ThumbsUp
                size={20}
                className={`transition-colors duration-300 ${
                    liked ? "default-color" : "default-text-color "
                }`}
                fill={liked ? "#2563EB " : "none"}
            />
            <span className="text-sm font-medium">{likes}</span>
        </button>
    );
}

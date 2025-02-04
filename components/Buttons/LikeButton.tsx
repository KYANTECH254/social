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
            className="flex items-center space-x-2 p-2 rounded-md transition-transform duration-200 hover:scale-105"
        >
            <ThumbsUp
                size={20}
                className={`transition-colors duration-300 ${
                    liked ? "text-blue-500" : "text-gray-400"
                }`}
                fill={liked ? "blue" : "none"}
            />
            <span className="text-lg font-medium">{likes}</span>
        </button>
    );
}

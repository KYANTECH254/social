"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import StatusList from "./StatusList";
import { Posts } from "@/types/types";

interface StatusPostsProps {
    posts: Posts[];
}

export default function StatusPosts({ posts }: StatusPostsProps) {
    const [recent, setRecent] = useState<Posts[]>([]);
    const [viewed, setViewed] = useState<Posts[]>([]);
    const [recentOpen, setRecentOpen] = useState(true); 
    const [viewedOpen, setViewedOpen] = useState(true);

    useEffect(() => {
        const recentPosts: Posts[] = [];
        const viewedPosts: Posts[] = [];

        posts.forEach(post => {
            if (post.notViewed > 0) {
                recentPosts.push(post);  
            }

            if (post.notViewed === 0 && post.viewed > 0) {
                viewedPosts.push(post);  
            }
        });

        setRecent(recentPosts);
        setViewed(viewedPosts);
    }, [posts]);

    return (
        <div className="space-y-4 w-full max-w-md mx-auto p-3">
            {/* Recent updates section */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setRecentOpen(prev => !prev)}>
                <h2 className="">Recent updates</h2>
                {recentOpen ? (
                    <ChevronUp
                        className="transform transition-transform duration-300"
                        size={24}
                    />
                ) : (
                    <ChevronDown
                        className="transform transition-transform duration-300"
                        size={24}
                    />
                )}
            </div>
            {recentOpen && <StatusList posts={recent} />}

            {/* Viewed updates section */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setViewedOpen(prev => !prev)}>
                <h2>Viewed updates</h2>
                {viewedOpen ? (
                    <ChevronUp
                        className="transform transition-transform duration-300"
                        size={24}
                    />
                ) : (
                    <ChevronDown
                        className="transform transition-transform duration-300"
                        size={24}
                    />
                )}
            </div>
            {viewedOpen && <StatusList posts={viewed} />}
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { Posts } from "@/types/types";
import FloatingIcons from "../../FloatingIcons";
import StatusList from "./StatusList";
import { useRouter } from "next/navigation";

interface StatusPostsProps {
    posts: Posts[];
    myposts: Posts[];
}

export default function StatusPosts({ posts, myposts }: StatusPostsProps) {
    const [recent, setRecent] = useState<Posts[]>([]);
    const [viewed, setViewed] = useState<Posts[]>([]);
    const [recentOpen, setRecentOpen] = useState(true);
    const [viewedOpen, setViewedOpen] = useState(true);
    const [addstatus, setAddStatus] = useState(false);
    const router = useRouter();

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
            {myposts.length > 0 && myposts[0]?.recentStatus?.length > 0 ? (
                <div onClick={() => router.push('my-posts')} className="flex flex-row items-center gap-2 relative">
                    <img src="assets/images/profile-bg.png" alt="Profile" className="w-12 h-12 rounded-full shadow-md bg-gray-500/50" />
                    <PlusCircle size={24} fill="#2563EB" className="text-[var(--main-white-color)] absolute bottom-0 left-6" />
                    <h3 className="text-sm font-semibold text-[var(--main-text-color)]">My status</h3>
                </div>
            ) : (
                <div onClick={() => setAddStatus((prev) => !prev)} className="flex flex-row items-center gap-2 relative">
                    <img src="assets/images/profile-bg.png" alt="Profile" className="w-12 h-12 rounded-full shadow-md bg-gray-500/50" />
                    <PlusCircle size={24} fill="#2563EB" className="text-[var(--main-white-color)] absolute bottom-0 left-6" />
                    <h3 className="text-sm font-semibold text-[var(--main-text-color)]">Add status</h3>
                </div>
            )}

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

            <FloatingIcons addstatus={addstatus} />
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { Post } from "@/types/types";
import FloatingIcons from "../../FloatingIcons";
import MyStatusList from "./MyStatusList";

interface StatusPostsProps {
    posts: Post[];
}

export default function MyStatusPosts({ posts }: StatusPostsProps) {
    const [recent, setRecent] = useState<Post[]>(posts);
    const [recentOpen, setRecentOpen] = useState(true);
    const [addstatus, setAddStatus] = useState(false);

    return (
        <div className="space-y-4 w-full max-w-md mx-auto p-3">
            <div onClick={() => setAddStatus((prev) => !prev)} className="flex flex-row items-center gap-2 relative">
                <img src="assets/images/profile-bg.png" alt="Profile" className="w-12 h-12 rounded-full shadow-md bg-gray-500/50" />
                <PlusCircle size={24} fill="#2563EB" className="text-[var(--main-white-color)] absolute bottom-0 left-6" />
                <h3 className="text-sm font-semibold text-[var(--main-text-color)]">Add status</h3>
            </div>

            {/* Recent updates section */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setRecentOpen(prev => !prev)}>
                <h2 className="">{recent[0].recentStatus.length > 0 ? recent[0].recentStatus.length : 0} {recent[0].recentStatus.length > 1 ? "updates" : "update"}</h2>
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
            {recentOpen && <MyStatusList posts={recent} />}
            <FloatingIcons addstatus={addstatus} />
        </div>
    );
}

"use client";
import { Post } from "@/types/types";
import { formatTimestampRelative } from "@/lib/Functions";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyStatusModal from "./MyStatusModal";
import { toast } from "sonner";
import MyStatusCircle from "./MyStatusCircle";
import TextStatus from "./TextStatus";

interface StatusPostsProps {
    posts: Post[];
}

export default function MyStatusList({ posts }: StatusPostsProps) {
    const [statusList, setStatusList] = useState(posts);

    function handleDelete(id: string) {
        setStatusList((prev) =>
            prev.map((post) => ({
                ...post,
                recentStatus: post.recentStatus.filter((status) => status.id !== id),
            })).filter((post) => post.recentStatus.length > 0) 
        );
        toast.success(`Status ${id} deleted`, {
            duration: 3000,
            classNames: { toast: "alert" },
        });
    }

    return (
        <div className="flex flex-col gap-4">
            {statusList.length === 0 && <p className="text-center">No status found</p>}
            {statusList.map((post) =>
                post.recentStatus.map((status, index) => (
                    <div key={status.id} className="flex flex-row items-center justify-between">
                        <Link href={`/my-status?i=${index}`} >
                            <div className="flex flex-row items-center gap-4">
                                <div className="w-[60px] h-[60px]">
                                    <MyStatusCircle
                                        viewed={post.viewed}
                                        notViewed={post.notViewed}
                                        recentStatus={[status]}
                                        name=""
                                        statusCount={0}
                                        link=""
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">{post.name}</span>
                                    <StatusTime time={status.timestamp} />
                                </div>
                            </div>
                        </Link>
                        <div className="flex flex-row items-center gap-5">
                            <div className="text-sm">{status.views} views</div>
                            <MyStatusModal onDelete={() => handleDelete(status.id)} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

function StatusTime({ time }: any) {
    const [formattedTime, setFormattedTime] = useState("...");

    useEffect(() => {
        setFormattedTime(formatTimestampRelative(time));
    }, [time]);

    return <span className="text-sm text-gray-500">{formattedTime}</span>;
}

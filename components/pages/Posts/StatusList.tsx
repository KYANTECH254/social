"use client"
import { Posts } from "@/types/types";
import StatusCircle from "./StatusCircle";
import { formatTimestampRelative } from "@/lib/Functions";
import Link from "next/link";
import { useEffect, useState } from "react";

interface StatusPostsProps {
    posts: Posts[];
}

export default function StatusList({ posts }: StatusPostsProps) {
    return (
        <div className="flex flex-col gap-4">
            {posts.map((status) => {
                const lastStatus = status.recentStatus[status.recentStatus.length - 1];

                return (
                    <Link key={status.name} href={`/status/${status.link}`}>
                        <div className="flex flex-row items-center gap-4">
                            <div className="w-[60px] h-[60px]">
                                <StatusCircle
                                    viewed={status.viewed}
                                    notViewed={status.notViewed}
                                    recentStatus={[lastStatus]}
                                    name={""}
                                    statusCount={0}
                                    link={""}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium">{status.name}</span>
                                <StatusTime time={lastStatus.timestamp}/>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

function StatusTime({ time }: any) {
    const [formattedTime, setFormattedTime] = useState("...");

    useEffect(() => {
        setFormattedTime(formatTimestampRelative(time));
    }, [time]);

    return <span className="text-sm text-gray-500">{formattedTime}</span>
}
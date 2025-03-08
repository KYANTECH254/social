"use client";
import { sampleMyPosts } from "@/types/data";
import MyStatusViewer from "@/components/pages/Posts/MyStatusViewer";

export default function StatusPage() {
    return (
        <div className="h-screen">
            {sampleMyPosts.recentStatus.length > 0 ? (
                <MyStatusViewer statuses={sampleMyPosts.recentStatus} initialIndex={0} />
            ) : (
                <div className="text-white flex justify-center items-center h-full">
                    No statuses found.
                </div>
            )}
        </div>
    );
}

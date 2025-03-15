"use client";
import { sampleMyPosts } from "@/types/data";
import MyStatusViewer from "@/components/pages/Posts/MyStatusViewer";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense>
        <div className="h-screen">
            {sampleMyPosts.recentStatus.length > 0 ? (
                <MyStatusViewer statuses={sampleMyPosts.recentStatus} />
            ) : (
                <div className="text-white flex justify-center items-center h-full">
                    No statuses found.
                </div>
            )}
        </div>
        </Suspense>
    );
}

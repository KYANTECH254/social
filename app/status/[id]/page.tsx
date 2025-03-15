"use client"; 
import { useParams } from "next/navigation";
import StatusViewer from "@/components/pages/Posts/StatusViewer";
import { samplePosts } from "@/types/data";

function fetchStatuses(id?: string) {
    if (!id) return { statuses: [], currentIndex: 0 };

    const currentUserIndex = samplePosts.findIndex((post) => post.link === id);
    if (currentUserIndex === -1) return { statuses: [], currentIndex: 0 };

    const previousStatus = samplePosts[currentUserIndex - 1] || null;
    const currentStatus = samplePosts[currentUserIndex];
    const nextStatus = samplePosts[currentUserIndex + 1] || null;

    const statuses = [previousStatus, currentStatus, nextStatus].filter(Boolean);

    return {
        statuses,
        currentIndex: statuses.findIndex((status) => status.link === currentStatus.link),
    };
}

export default function Page() {
    const params = useParams();
    const id = params?.id as string | undefined; 
    const { statuses, currentIndex } = fetchStatuses(id);
    console.log("Statuses:", statuses, "Initial Index", currentIndex);

    return (
        <div className="h-screen">
            {statuses.length > 0 ? (
                <StatusViewer statuses={statuses} initialIndex={currentIndex} />
            ) : (
                <div className="text-white flex justify-center items-center h-full">
                    No statuses found.
                </div>
            )}
        </div>
    );
}

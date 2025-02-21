"use client";
import { useParams } from 'next/navigation';
import StatusViewer from '@/components/pages/StatusViewer';
import { samplePosts } from '@/types/data';

function fetchStatuses(id: string) {
    const currentUserIndex = samplePosts.findIndex(post => post.link === id);
    if (currentUserIndex === -1) return { statuses: [], currentIndex: 0 };

    const previousStatus = samplePosts[currentUserIndex - 1] || null;
    const currentStatus = samplePosts[currentUserIndex];
    const nextStatus = samplePosts[currentUserIndex + 1] || null;

    const statuses = [previousStatus, currentStatus, nextStatus].filter(Boolean);

    return {
        statuses,
        currentIndex: statuses.findIndex(status => status.link === currentStatus.link), // Corrected calculation
    };
}

export default function StatusPage() {
    const { id } = useParams();
    const { statuses, currentIndex } = fetchStatuses(id as string);
    console.log("Statuses:",statuses, "Initial Index",currentIndex)

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



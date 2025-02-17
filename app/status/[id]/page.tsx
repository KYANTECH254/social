"use client";
import { useParams } from 'next/navigation';
import StatusViewer from '@/components/pages/StatusViewer';
import { samplePosts } from '@/types/data';

function fetchStatuses(id: string) {
    const user = samplePosts.find(post => post.link === id);
    if (!user) return [];

    return user.recentStatus.map(status => ({
        id: user.link,
        type: status.type,
        content: status.path || status.statusText,
    }));
}

export default function StatusPage() {
    const { id } = useParams();
    const sampleStatuses = fetchStatuses(id as string);

    return (
        <div className="h-screen">
            <StatusViewer statuses={sampleStatuses} />
        </div>
    );
}

"use client"
import dynamic from 'next/dynamic';

const GroupChatComponent = dynamic(() => import('@/components/pages/Groups/GroupChat'), { ssr: false });

export default function Page() {
    return <GroupChatComponent />;
}

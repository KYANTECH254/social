"use client"
import dynamic from 'next/dynamic';

const ChatComponent = dynamic(() => import('@/components/pages/Chats/Chat'), { ssr: false });

export default function ChatPage() {
    return <ChatComponent />;
}

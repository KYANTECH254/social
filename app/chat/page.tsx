import dynamic from 'next/dynamic';

const ChatComponent = dynamic(() => import('@/components/pages/Chat'), { ssr: false });

export default function ChatPage() {
    return <ChatComponent />;
}

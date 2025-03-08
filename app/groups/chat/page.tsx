import dynamic from 'next/dynamic';

const GroupChatComponent = dynamic(() => import('@/components/pages/GroupChat'), { ssr: false });

export default function Page() {
  return <GroupChatComponent />;
}

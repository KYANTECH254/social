import StatusViewer from "@/components/pages/StatusViewer";

interface Status {
    id: string;
    type: 'image' | 'video' | 'text';
    content: string;
  }

const sampleStatuses = [
  {
    id: '1',
    type: 'image',
    content: 'assets/images/pic.jpeg',
  },
  {
    id: '2',
    type: 'video',
    content: 'assets/images/video.mp4',
  },
  {
    id: '3',
    type: 'text',
    content: 'Hello World!',
  },
];

export default function StatusPage() {
  return (
    <div className="h-screen">
      <StatusViewer statuses={sampleStatuses} />
    </div>
  );
}
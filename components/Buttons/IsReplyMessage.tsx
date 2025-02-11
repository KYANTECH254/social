"use client"
import React from 'react';
import { X } from 'lucide-react';

interface Reply {
  text: string;
  name: string;
}

interface ReplyPreviewProps {
  reply: Reply | null;
  cancelReply: () => void;
}

export default function ReplyPreview({ reply, cancelReply }: ReplyPreviewProps) {
  if (!reply) return null;

  return (
    <div className="p-4">
      <div className="flex items-center bg-gray-200 p-2 rounded-md">
        <div className="flex-1 p-1 rounded-md border-l-4 border-blue-500">
          <p className="text-sm text-blue-600 font-bold">{reply.name}</p>
          <p
            className="text-xs text-gray-600"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {reply.text}
          </p>
        </div>
        <button onClick={cancelReply} className="text-gray-600 hover:text-gray-800">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

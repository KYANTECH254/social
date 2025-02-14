"use client"
import React from 'react';
import { X } from 'lucide-react';

interface Reply {
  text: string;
  name: string;
  color: string;
}

interface ReplyPreviewProps {
  reply: Reply | null;
  cancelReply: () => void;
}

export default function ReplyPreview({ reply, cancelReply }: ReplyPreviewProps) {
  if (!reply) return null;

  return (
    <div className="p-4">
      <div className="flex items-center bg-[var(--main-background-color)] p-2 rounded-md">
        <div className={`flex-1 p-1 rounded-md border-l-4 border-${reply.color}`}>
          <p className={`text-sm text-${reply.color} font-bold`}>{reply.name}</p>
          <p
            className="text-xs text-[var(--main-text-color)]"
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
        <button onClick={cancelReply} className="text-[var(--main-text-color)] hover:text-gray-800">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

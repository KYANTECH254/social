"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  ArrowLeft,
  EllipsisVertical,
  Mic,
  Smile,
  Camera,
  Paperclip,
  Send
} from 'lucide-react';
import ReplyPreview from '../Buttons/IsReplyMessage';
import MediaGallery from './MediaGallery';
const VoiceChatInput = dynamic(() => import('../Buttons/VoiceRecorder'), { ssr: false });

import { GoBack } from '@/lib/Functions';
import Emoji from '../Buttons/Emoji';
import ChatPopUpMenu from '../PopUps/ChatPopUp';
import GroupIncomingMessage from '../Buttons/GroupIncomingMessage';
import GroupOutgoingMessage from '../Buttons/GroupOutgoingMessage';

export default function GroupChatComponent() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [reply, setReply] = useState<any>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const messages = [
    {
      id: '1',
      name: "John Doe",
      replyID: null,
      isReply: false,
      text: "Hi there! How are you?",
      time: "12:45 PM",
      type: "incoming",
    },
    {
      id: '2',
      name: "You",
      replyID: null,
      isReply: false,
      text: "Hello! I'm good, thank you. And you?",
      time: "10:45 AM",
      type: "outgoing",
    },
    {
      id: '3',
      name: "John Doe",
      replyID: null,
      isReply: false,
      text: "I'm doing well too. Let's catch up soon!",
      time: "12:45 PM",
      type: "incoming",
    },
    {
      id: '4',
      name: "You",
      replyID: null,
      isReply: false,
      text: "Sure, let's plan for the weekend.",
      time: "12:45 PM",
      type: "outgoing",
    },
    {
      id: '5',
      name: "John Doe",
      replyID: null,
      isReply: false,
      text: "Hey there, I wanted to share some detailed updates regarding our project. Recently, I've been analyzing market trends, and it's fascinating to see how rapidly technology is transforming industries. We are witnessing a shift towards digital-first strategies where user experience and accessibility are paramount. The integration of artificial intelligence and machine learning into everyday processes is not only optimizing operations but also unlocking new potentials for innovation. I believe that by embracing these changes, we can create solutions that are not only efficient but also genuinely impactful in improving people's lives. Looking forward to discussing these insights further and exploring how we can leverage these trends to drive our business forward. Have a great day!",
      time: "1:00 PM",
      type: "incoming",
    },
    {
      id: '6',
      name: "John Doe",
      replyID: "5",
      isReply: true,
      text: "Really!",
      time: "1:02 PM",
      type: "outgoing",
      replyMessage: {
        id: '5',
        name: "John Doe",
        text: "Hey there, I wanted to share some detailed updates regarding our project. Recently, I've been analyzing market trends, and it's fascinating to see how rapidly technology is transforming industries. We are witnessing a shift towards digital-first strategies where user experience and accessibility are paramount. The integration of artificial intelligence and machine learning into everyday processes is not only optimizing operations but also unlocking new potentials for innovation. I believe that by embracing these changes, we can create solutions that are not only efficient but also genuinely impactful in improving people's lives. Looking forward to discussing these insights further and exploring how we can leverage these trends to drive our business forward. Have a great day!",
        time: "1:00 PM",
      },
    },
    {
      id: '7',
      name: "John Doe",
      replyID: "6",
      isReply: true,
      text: "Hey there, I wanted to share some detailed updates regarding our project. Recently, I've been analyzing market trends, and it's fascinating to see how rapidly technology is transforming industries. We are witnessing a shift towards digital-first strategies where user experience and accessibility are paramount. The integration of artificial intelligence and machine learning into everyday processes is not only optimizing operations but also unlocking new potentials for innovation. I believe that by embracing these changes, we can create solutions that are not only efficient but also genuinely impactful in improving people's lives. Looking forward to discussing these insights further and exploring how we can leverage these trends to drive our business forward. Have a great day!",
      time: "1:05 PM",
      type: "incoming",
      replyMessage: {
        id: '6',
        name: "John Doe",
        text: "Really!",
        time: "1:02 PM",
      },
    },
  ];

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      // Construct the new message object, including the reply message object if available.
      const newMessage = {
        id: Date.now().toString(),
        name: "You",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "outgoing",
        isReply: reply !== null,
        // If replying, attach the reply message object; otherwise, leave it undefined.
        reply: reply ? { ...reply } : undefined,
      };

      console.log('Sending message:', newMessage);
      // Here you might want to update your messages list or send the message to a server

      // Clear the input and cancel any reply
      setMessage('');
      setReply(null);
    } else {
      setIsRecording(true);
      console.log('Show voice recorder component');
    }
  };

  const handleReply = (messageId: string) => {
    const messageToReply = messages.find((msg) => msg.id === messageId);
    if (messageToReply) {
      setReply(messageToReply);
    }
  };

  const cancelReply = () => {
    setReply(null);
  };

  const openCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (event: any) => {
      console.log('Selected file:', event.target.files[0]);
    };
    input.click();
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
  };

  return (
    <>
      {showMenu && <ChatPopUpMenu />}

      <div className="max-w-md mx-auto flex flex-col h-[90vh]">
        {/* Chat Header */}
        <div className="flex items-center p-4 border-bottom shadow-lg">
          <button className="mr-4 text-[var(--main-text-color)]" onClick={GoBack}>
            <ArrowLeft size={20} />
          </button>
          <img
            src="../../assets/images/profile-bg.png"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 bg-gray-700"
          />
          <div>
            <p className="font-semibold text-[var(--main-text-color)]">Contact Name</p>
            <p className="text-sm text-blue-500">Online</p>
          </div>
          <div className="ml-auto flex space-x-4">
            <button className="flex items-center justify-center shadow-lg text-[var(--main-text-color)] w-10 h-10 rounded-full hover:bg-[var(--main-hover-icons-color)]"
              onClick={() => setShowMenu(prev => !prev)}
            >
              <EllipsisVertical size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white">
          {messages.map((msg) =>
            msg.type === 'incoming' ? (
              <GroupIncomingMessage
                key={msg.id}
                id={msg.id}
                text={msg.text}
                time={msg.time}
                name={msg.name}
                isReply={msg.isReply}
                replyID={msg.replyID}
                replyMessage={msg.replyMessage}
                onReply={handleReply}
              />
            ) : (
              <GroupOutgoingMessage
                key={msg.id}
                id={msg.id}
                text={msg.text}
                time={msg.time}
                name={msg.name}
                isReply={msg.isReply}
                replyID={msg.replyID}
                replyMessage={msg.replyMessage}
                onReply={handleReply}
              />
            )
          )}

        </div>

        {reply && <ReplyPreview reply={reply} cancelReply={cancelReply} />}

        {/* Chat Input Area */}
        <div className="p-4 border-top">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Message..."
                value={message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-full pl-10 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
              />
              <button
                className="absolute inset-y-0 left-0 flex items-center pl-2"
                onClick={() => console.log('Open emoji picker')}
              >
                <Smile
                  onClick={() => setShowEmojiPicker(prev => !prev)}
                  size={20}
                  className="text-gray-600 cursor-pointer"
                />
              </button>
              <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">
                {message.trim() === '' && (
                  <button className="text-gray-600" onClick={openCamera}>
                    <Camera size={20} />
                  </button>
                )}
                <button className="text-gray-600" onClick={() => setShowGallery(true)}>
                  <Paperclip size={20} />
                </button>
              </div>
            </div>

            <button
              className="w-10 h-10 flex items-center justify-center bg-[var(--main-color)] rounded-full text-white"
              onClick={handleSend}
            >
              {message.trim() === '' ? <Mic size={24} /> : <Send size={20} />}
            </button>
          </div>
        </div>

        {showEmojiPicker && <Emoji onSelect={handleEmojiSelect} />}
        {showGallery && (
          <MediaGallery
            isOpen={showGallery}
            onClose={() => setShowGallery(false)}
            onSelectFiles={(files) => {
              console.log("Selected files:", files);
            }}
          />
        )}
        {isRecording && <VoiceChatInput />}
      </div>
    </>
  );
}

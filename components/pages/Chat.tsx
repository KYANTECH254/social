"use client";
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  EllipsisVertical,
  ChevronsDown, ChevronsUp,
} from 'lucide-react';
import IncomingMessage from '../Buttons/IncomingMessage';
import OutgoingMessage from '../Buttons/OutgoingMessages';
import ReplyPreview from '../Buttons/IsReplyMessage';
import MediaGallery from './MediaGallery';
const VoiceChatInput = dynamic(() => import('../Buttons/VoiceRecorder'), { ssr: false });

import { GoBack } from '@/lib/Functions';
import Emoji from '../Buttons/Emoji';
import ChatPopUpMenu from '../PopUps/ChatPopUp';
import ChatInput from '../Inputs/ChatInput';
import ChatSearchInput from '../Inputs/ChatSearchInput';

export default function ChatComponent() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [reply, setReply] = useState<any>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false)


  useEffect(() => {
    const container = messagesContainerRef.current;

    const handleScroll = () => {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        setShowScrollTop(scrollTop > 100);
        setShowScrollBottom(scrollHeight - (scrollTop + clientHeight) > 100);
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    let scrollTimeout: NodeJS.Timeout;

    const detectScroll = () => {
      if (container) {
        setIsScrolling(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 3000);
      }
    };
    container?.addEventListener("scroll", detectScroll);
    return () => {
      container?.removeEventListener("scroll", detectScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

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
      {showMenu && <ChatPopUpMenu setShowSearch={setShowSearch} setShowMenu={setShowMenu}/>}

      <div className="max-w-md mx-auto flex flex-col h-[90vh]">

        {/* Chat Header */}
        {!showSearch && (
          <>
            <div className="flex items-center p-4 border-bottom shadow-lg">
              <button className="mr-4 text-[var(--main-text-color)]" onClick={GoBack}>
                <ArrowLeft size={20} />
              </button>
              <img
                src="assets/images/profile-bg.png"
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
          </>
        )}

        {/* Chat Search */}
        {showSearch && (
          <>
            <ChatSearchInput
              handleInputChange={handleInputChange}
              setShowSearch={setShowSearch}
              setShowMenu={setShowMenu}
              openCamera={openCamera}
              setShowGallery={setShowGallery}
            />
          </>
        )}

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white"
          ref={messagesContainerRef}
        >
          {messages.map((msg) =>
            msg.type === 'incoming' ? (
              <IncomingMessage
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
              <OutgoingMessage
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
        {!showSearch && (
          <>
            <ChatInput
              setMessage={setMessage}
              setShowEmojiPicker={setShowEmojiPicker}
              openCamera={openCamera}
              setShowGallery={setShowGallery}
              message={message}
              setReply={setReply}
              reply={reply}
              isRecording={isRecording}
              handleInputChange={handleInputChange}
            />
          </>
        )}

        {/* Add scroll buttons */}
        {isScrolling && (
          <div className="absolute right-4 bottom-24 space-y-2 z-10">
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className={`w-10 h-10 bg-[var(--main-color)] rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--main-hover-color)] 
                            transition-opacity duration-300 ${showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <ChevronsUp className="text-white" size={20} />
              </button>
            )}
            {showScrollBottom && (
              <button
                onClick={scrollToBottom}
                className={`w-10 h-10 bg-[var(--main-color)] rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--main-hover-color)] 
                            transition-opacity duration-300 ${showScrollBottom ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <ChevronsDown className="text-white" size={20} />
              </button>
            )}
          </div>

        )}

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

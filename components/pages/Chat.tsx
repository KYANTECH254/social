"use client";
// import dynamic from 'next/dynamic';
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
// const VoiceChatInput = dynamic(() => import('../Buttons/VoiceRecorder'), { ssr: false });

import { GoBack } from '@/lib/Functions';
import Emoji from '../Buttons/Emoji';
import ChatPopUpMenu from '../PopUps/ChatPopUp';
import ChatInput from '../Inputs/ChatInput';
import ChatSearchInput from '../Inputs/ChatSearchInput';
import Link from 'next/link';
import { messages } from '@/types/data';

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
      {showMenu && <ChatPopUpMenu setShowSearch={setShowSearch} setShowMenu={setShowMenu} />}

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
              <Link href="/chat/info">
                <div>
                  <p className="font-semibold text-[var(--main-text-color)]">Contact Name</p>
                  <p className="text-sm text-blue-500">Online</p>
                </div>
              </Link>
              <div className="ml-auto flex space-x-4">
                <button className="flex items-center justify-center text-[var(--main-text-color)] w-10 h-10 rounded-full hover:bg-[var(--main-hover-icons-color)]"
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
        {/* {isRecording && <VoiceChatInput />} */}
      </div>
    </>
  );
}

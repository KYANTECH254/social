"use client";
// import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
// const VoiceChatInput = dynamic(() => import('../Buttons/VoiceRecorder'), { ssr: false });
import { messages as m } from '@/types/data'; 
import Emoji from '@/components/Buttons/Emoji';
import ChatInput from '@/components/Inputs/ChatInput';
import ChatSearchInput from '@/components/Inputs/ChatSearchInput';
import ChatPopUpMenu from '@/components/PopUps/ChatPopUp';
import ReplyPreview from '../Chat&GroupTemplates/IsReplyMessage';
import MediaGallery from '../MediaGallery';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessages';
import ScrollChat from '../Chat&GroupTemplates/ScrollChat';
import ChatHeader from './ChatHeader';
;

export default function ChatComponent() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(m);
  const [isRecording, setIsRecording] = useState(false);
  const [reply, setReply] = useState<any>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
        {!showSearch && (
          <ChatHeader setShowMenu={setShowMenu} />
        )}
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white"
          ref={messagesContainerRef}
        >
          {messages.map((msg) =>
            msg.type === 'incoming' ? (
              <IncomingMessage
                key={msg.id}
                id={msg.id}
                type={msg.type}
                text={msg.text}
                time={msg.time}
                name={msg.name}
                color={msg.color}
                isReply={msg.isReply}
                replyID={msg.replyID}
                replyMessage={msg.replyMessage}
                onReply={handleReply}
                fileName={msg.fileName}
                isFile={msg.isFile}
                file={msg.file}
                filetype={msg.filetype}
                fileSize={msg.fileSize}
              />
            ) : (
              <OutgoingMessage
                key={msg.id}
                id={msg.id}
                text={msg.text}
                type={msg.type}
                time={msg.time}
                name={msg.name}
                color={msg.color}
                isReply={msg.isReply}
                replyID={msg.replyID}
                replyMessage={msg.replyMessage}
                onReply={handleReply}
                fileName={msg.fileName}
                isFile={msg.isFile}
                file={msg.file}
                filetype={msg.filetype}
                fileSize={msg.fileSize}
              />
            )
          )}
        </div>
        {reply && <ReplyPreview reply={reply} cancelReply={cancelReply} />}
        {!showSearch && (
          <>
            <ChatInput
              setMessage={setMessage}
              setMessages={setMessages}
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
        <ScrollChat ContainerRef={messagesContainerRef} />
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

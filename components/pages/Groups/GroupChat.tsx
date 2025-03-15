"use client";
// import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
// const VoiceChatInput = dynamic(() => import('../Buttons/VoiceRecorder'), { ssr: false });
import { groupmessages } from '@/types/data';
import GroupChatPopUpMenu from '@/components/PopUps/GroupChatPopUp';
import ChatSearchInput from '@/components/Inputs/ChatSearchInput';
import GroupIncomingMessage from './GroupIncomingMessage';
import GroupOutgoingMessage from './GroupOutgoingMessage';
import Emoji from '@/components/Buttons/Emoji';
import ChatInput from '@/components/Inputs/ChatInput';
import ReplyPreview from '../Chat&GroupTemplates/IsReplyMessage';
import MediaGallery from '../MediaGallery';
import ScrollChat from '../Chat&GroupTemplates/ScrollChat';
import GroupChatHeader from './GroupsHeader';


export default function GroupChatComponent() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [reply, setReply] = useState<any>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleReply = (messageId: string) => {
    const messageToReply = groupmessages.find((msg) => msg.id === messageId);
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

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {showMenu && <GroupChatPopUpMenu setShowSearch={setShowSearch} setShowMenu={setShowMenu} />}

      <div className="max-w-md mx-auto flex flex-col h-[90vh]">
        {!showSearch && (
          <GroupChatHeader setShowMenu={setShowMenu} />
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
          {groupmessages.map((msg) =>
            msg.type === 'incoming' ? (
              <GroupIncomingMessage
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
              <GroupOutgoingMessage
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
            )
          )}

        </div>
        {reply && <ReplyPreview reply={reply} cancelReply={cancelReply} />}
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
      </div >
    </>
  );
}

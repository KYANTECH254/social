"use client";
import ImageTemplate from "../Chat&GroupTemplates/ImageTemplate";
import { renderText } from "../Chat&GroupFunctions/Functions";
import AudioTemplate from "../Chat&GroupTemplates/AudioTemplate";
import DocumentTemplate from "../Chat&GroupTemplates/DocumentTemplate";
import UnsupportedTemplate from "../Chat&GroupTemplates/UnSupportedTemplate";
import VideoTemplate from "../Chat&GroupTemplates/VideoTemplate";
import ChatPopUpOptions from "../Chat&GroupTemplates/ChatPopupOptions";
import ChatMessageTemplate from "../Chat&GroupTemplates/ChatMessageTemplate";
import { MessageProps } from "@/types/types";

export default function IncomingMessage({
  id,
  type,
  text,
  time,
  name,
  isReply,
  replyID,
  replyMessage,
  fileName,
  isFile,
  file,
  filetype,
  fileSize,
  onReply,
}: MessageProps) {
  return (
    <ChatMessageTemplate messageId={id} onReply={onReply} type={type}>
      <div className="flex items-end">
        <div className={`${isReply && replyMessage ? "p-1" : "p-3"} rounded-lg shadow bg-gray-800`}>
          {isReply && replyMessage && (
            <div className="mb-2 p-2 bg-gray-700 rounded-md border-l-4 border-gray-500">
              <p className="text-xs font-bold text-gray-500">{replyMessage.name}</p>
              <p className="text-sm line-clamp-2">{replyMessage.text}</p>
            </div>
          )}
          <div className={isReply ? "ml-1" : ""}>
            {isFile && filetype ? (
              (() => {
                const cleanedFileType = filetype.trim().toUpperCase();
                if (/^(JPEG|JPG|PNG|GIF|WEBP|BMP|SVG|TIFF)$/i.test(cleanedFileType)) {
                  return <ImageTemplate file={file} fileSize={fileSize} fileName={fileName} filetype={filetype} text={text} />;
                } else if (/^(MP4|WEBM|OGG|MKV|AVI|MOV)$/i.test(cleanedFileType)) {
                  return <VideoTemplate file={file} fileSize={fileSize} text={text} />;
                } else if (/^(MP3|WAV|OGG)$/i.test(cleanedFileType)) {
                  return <AudioTemplate file={file} fileSize={fileSize} filetype={filetype} />;
                } else if (/^(PDF|ZIP|RAR|DOCX|TXT|XLSX)$/i.test(cleanedFileType)) {
                  return <DocumentTemplate file={file} fileSize={fileSize} fileName={fileName} filetype={filetype} text={text} />;
                } else {
                  return <UnsupportedTemplate file={file} fileName={fileName} filetype={filetype} fileSize={fileSize} text={text} />;
                }
              })()
            ) : (
              <span>{renderText(text)}</span>
            )}
          </div>
          <div className="flex items-center justify-end space-x-2">
            <span className="text-xs text-gray-500">{time}</span>
          </div>
        </div>
      </div>
      <ChatPopUpOptions showPopup={false} setShowPopup={() => {}} onReply={onReply} />
    </ChatMessageTemplate>
  );
}

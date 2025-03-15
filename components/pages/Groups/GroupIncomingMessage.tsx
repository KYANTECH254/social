"use client"
import { useState, useRef } from 'react';
import { renderText } from '../Chat&GroupFunctions/Functions';
import AudioTemplate from '../Chat&GroupTemplates/AudioTemplate';
import DocumentTemplate from '../Chat&GroupTemplates/DocumentTemplate';
import ImageTemplate from '../Chat&GroupTemplates/ImageTemplate';
import UnsupportedTemplate from '../Chat&GroupTemplates/UnSupportedTemplate';
import VideoTemplate from '../Chat&GroupTemplates/VideoTemplate';
import ChatPopUpOptions from '../Chat&GroupTemplates/ChatPopupOptions';
import ChatMessageTemplate from '../Chat&GroupTemplates/ChatMessageTemplate';
import { MessageProps } from '@/types/types';

export default function GroupIncomingMessage({
    id,
    type,
    text,
    time,
    name,
    isReply,
    replyID,
    fileName,
    isFile,
    file,
    filetype,
    fileSize,
    replyMessage,
    onReply,
    color
}: MessageProps) {

    const [showPopup, setShowPopup] = useState(false);

    return (
        <ChatMessageTemplate messageId={id} onReply={onReply} type={type}>
            <div className="flex flex-row">
                <img src="./../assets/images/profile-bg.png" alt="Profile" className='w-8 h-8 rounded-full bg-gray-700 -ml-2 mr-1' />
                <div className={`${isReply && replyMessage ? 'p-1' : 'p-3'} rounded-lg shadow bg-gray-800`}>
                    <div className={`font-semibold text-xs text-${color} ${isReply && replyMessage ? 'p-1' : ''}`}>{name}</div>
                    {isReply && replyMessage && (
                        <div className="mb-2 p-2 bg-gray-700 rounded-md border-l-4 border-gray-500">
                            <p className="text-xs font-bold text-gray-500">{replyMessage.name}</p>
                            <p className="text-sm line-clamp-2">{replyMessage.text}</p>
                        </div>
                    )}
                    <div className={isReply ? 'ml-1' : ''}>
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
                    <div className="flex items-center justify-end space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{time}</span>
                    </div>
                </div>
            </div>
            <ChatPopUpOptions showPopup={showPopup} setShowPopup={setShowPopup} onReply={onReply} />
        </ChatMessageTemplate>
    );
}

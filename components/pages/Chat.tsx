"use client"
import { useState } from 'react';
import {
    ArrowLeft,
    EllipsisVertical,
    Mic,
    Smile,
    Camera,
    Paperclip,
    Send,
    X
} from 'lucide-react';
import VoiceChatInput from '../Buttons/VoiceRecorder';
import { GoBack } from '@/lib/Functions';
import IncomingMessage from '../Buttons/IncomingMessage';
import OutgoingMessage from '../Buttons/OutgoingMessages';
import ReplyPreview from '../Buttons/IsReplyMessage';
import MediaGallery from './MediaGallery';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [reply, setReply] = useState<any>(null);
    const [showGallery, setShowGallery] = useState(false);

    // Example message data (in a real app, you might fetch this from a server)
    const messages = [
        { id: '1', name: "John Doe", isReply: false, text: "Hi there! How are you?", time: "12:45 PM", type: "incoming" },
        { id: '2', name: "You", isReply: false, text: "Hello! I'm good, thank you. And you?", time: "10:45 AM", type: "outgoing" },
        { id: '3', name: "John Doe", isReply: false, text: "I'm doing well too. Let's catch up soon!", time: "12:45 PM", type: "incoming" },
        { id: '4', name: "You", isReply: false, text: "Sure, let's plan for the weekend.", time: "12:45 PM", type: "outgoing" },
        {
            id: '5',
            text: "Hey there, I wanted to share some detailed updates regarding our project. Recently, I've been analyzing market trends, and it's fascinating to see how rapidly technology is transforming industries. We are witnessing a shift towards digital-first strategies where user experience and accessibility are paramount. The integration of artificial intelligence and machine learning into everyday processes is not only optimizing operations but also unlocking new potentials for innovation. I believe that by embracing these changes, we can create solutions that are not only efficient but also genuinely impactful in improving people's lives. Looking forward to discussing these insights further and exploring how we can leverage these trends to drive our business forward. Have a great day!",
            time: "1:00 PM", type: "incoming", isReply: false, name: "John Doe",
        },
    ];

    const handleInputChange = (e: any) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim()) {
            console.log('Sending message:', message);
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

    return (
        <div className="max-w-md mx-auto flex flex-col h-screen">
            {/* Chat Header */}
            <div className="flex items-center p-4 border-bottom border-top shadow-lg">
                <button className="mr-4 text-gray-600">
                    <ArrowLeft size={20} onClick={GoBack} />
                </button>
                <img
                    src="assets/images/profile-bg.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 bg-grey-300"
                />
                <div>
                    <p className="font-semibold">Contact Name</p>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
                <div className="ml-auto flex space-x-4">
                    <button className="text-gray-600">
                        <EllipsisVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white">
                {messages.map((msg) =>
                    msg.type === 'incoming' ? (
                        <IncomingMessage
                            key={msg.id}
                            id={msg.id}
                            text={msg.text}
                            time={msg.time}
                            onReply={handleReply}
                        />
                    ) : (
                        <OutgoingMessage
                            key={msg.id}
                            id={msg.id}
                            text={msg.text}
                            time={msg.time}
                            onReply={handleReply}
                        />
                    )
                )}
            </div>

            {/* Create an is reply component here */}
            {reply && (
                <ReplyPreview reply={reply} cancelReply={cancelReply} />
            )}

            {/* Chat Input Area */}
            <div className="p-4 border-top">
                <div className="flex items-center space-x-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={message}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-full pl-10 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
                        />
                        <button
                            className="absolute inset-y-0 left-0 flex items-center pl-2"
                            onClick={() => console.log('Open emoji picker')}
                        >
                            <Smile size={20} className="text-gray-600" />
                        </button>
                        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">
                            {message.trim() === '' && (
                                <button
                                    className="text-gray-600"
                                    onClick={() => setShowGallery(true)}
                                >
                                    <Camera size={20} />
                                </button>
                            )}
                            <button className="text-gray-600">
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

            {showGallery && (
                <MediaGallery
                    isOpen={showGallery}
                    onClose={() => setShowGallery(false)}
                    onSelectFiles={(files) => {
                        console.log("Selected files:", files);
                        // Here you can attach the files to your message or process them
                    }}
                />
            )}
            {isRecording && <VoiceChatInput />}
        </div>
    );
};

export default ChatComponent;

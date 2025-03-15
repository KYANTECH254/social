"use client"
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import TripleDashIcon from "@/components/Icons/TripleDashIcon";
import ProfilePicture from "@/components/PopUps/ProfilePicture";
import { chats } from "@/types/data";
import { ChatTime } from "../Chat&GroupFunctions/Functions";

export default function ChatsComponent() {
    const [viewProfile, setViewProfile] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const profilePopupRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) {
                setViewProfile(false);
                setSelectedContact(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function OpenChat() {
        router.push('/chat');
    }

    return (
        <>
            <div className="chats-container space-y-4">
                {chats.map((chat, index) => (
                    <div key={index} className="chat-item flex items-center p-2">
                        <img
                            src={chat.profilePic}
                            alt={`${chat.name}'s profile`}
                            className="w-12 h-12 rounded-full"
                            onClick={() => {
                                // setSelectedContact(chat);
                                setViewProfile(true);
                            }}
                        />

                        <div onClick={OpenChat} className="flex-1">
                            <span className="text-lg font-medium block chat-items-name">
                                {chat.name}
                            </span>
                            <div className="flex flex-row bottom-chat-message-container">
                                {/* <span className="text-xs"><SingleDashIcon /></span> */}
                                {/* <span className="text-xs"><DoubleDashIcon /></span> */}
                                <span className="text-xs"><TripleDashIcon /></span>
                                <span className="text-sm text-gray-600 truncate chat-item-message">
                                    {chat.last_message}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col display-center row-g5">
                            <ChatTime chat={chat} />
                            <span className="text-xs unread-chats-icon">4</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Profile Picture Popup */}
            {viewProfile && (
                <div ref={profilePopupRef}>
                    <ProfilePicture
                        contact={selectedContact}
                        onClose={() => {
                            setSelectedContact(null);
                            setViewProfile(false);
                        }}
                    />
                </div>
            )}
        </>
    );
}

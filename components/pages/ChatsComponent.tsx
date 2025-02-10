"use client"

import { formatTimestamp } from "@/lib/Functions";
import SingleDashIcon from "../Icons/SingleDashIcon";
import DoubleDashIcon from "../Icons/DoubleDashIcon";
import TripleDashIcon from "../Icons/TripleDashIcon";
import { useState, useRef, useEffect } from "react";
import ProfilePicture from "../PopUps/ProfilePicture";
import { useRouter } from 'next/navigation';


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
    const chats = [
        {
            name: "John Doe",
            profilePic: "/assets/images/profile-bg.png",
            last_message: "Hello",
            last_sender: true,
            last_timestamp: new Date().toISOString(),
            status: "read"
        },
        {
            name: "Jane Smith",
            profilePic: "/assets/images/profile-bg.png",
            last_message: "Hey, how are you?",
            last_sender: false,
            last_timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            status: "delivered"
        },
        {
            name: "Michael Johnson",
            profilePic: "/assets/images/profile-bg.png",
            last_message: "See you later!",
            last_sender: true,
            last_timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: "not-delivered"
        },
    ];

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
                            <span className="text-xs">{formatTimestamp(chat.last_timestamp)}</span>
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

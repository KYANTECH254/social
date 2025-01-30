"use client"

import { formatTimestamp } from "@/lib/Functions";
import { useState, useRef, useEffect } from "react";
import ProfilePicture from "../PopUps/ProfilePicture";

export default function GroupsComponent() {
    const [viewProfile, setViewProfile] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const chats = [
        {
            name: "Mabanzenga Nation",
            profilePic: "/assets/images/group-profile-3.png",
            last_message: "Hello",
            last_sender: true,
            last_timestamp: new Date().toISOString(),
            status: "read",
            last_sender_name: "Kidongo Mdogo"
        },
        {
            name: "Football Nation",
            profilePic: "/assets/images/group-profile-3.png",
            last_message: "Hey, how are you?",
            last_sender: false,
            last_timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            status: "delivered",
            last_sender_name: "Mzima mzima"
        },
        {
            name: "Uoe Nation",
            profilePic: "/assets/images/group-profile-3.png",
            last_message: "See you later!",
            last_sender: true,
            last_timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: "not-delivered",
            last_sender_name: "Wawele kiwele"
        },
    ];

    const profilePopupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) {
                setViewProfile(false);
                setSelectedContact(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                                setSelectedContact(chat);
                                setViewProfile(true);
                              }}
                        />
                        <div className="flex-1">
                            <span className="text-lg font-medium block chat-items-name">
                                {chat.name}
                            </span>
                            <div className="flex flex-row bottom-chat-message-container">
                                <span className="text-sm text-gray-600 truncate chat-item-message">
                                    {chat.last_sender_name}:
                                </span>
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

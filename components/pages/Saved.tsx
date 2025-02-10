"use client";

import { useState, useRef, useEffect } from "react";
import ProfilePicture from "../PopUps/ProfilePicture";
import { useRouter } from 'next/navigation';
export default function Saved() {
  const contacts = [
    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },
    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },
    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },
    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },
  ];

  const [viewProfile, setViewProfile] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();
  const profilePopupRef = useRef<HTMLDivElement | null>(null);

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
  function OpenChat() {
    router.push('/chat');
  }

  return (
    <>
      <div className="contacts-list-container p-4">
        {/* Contacts List */}
        <div onClick={OpenChat} className="contacts-list flex flex-col gap-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 cursor-pointer"
            >
              <img
                src={contact.profilePic}
                alt={`${contact.name}'s profile`}
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  // setSelectedContact(contact);
                  setViewProfile(true);
                }}
              />
              <span className="text-lg font-medium truncate chat-items-name">
                {contact.name}
              </span>
            </div>
          ))}
        </div>
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

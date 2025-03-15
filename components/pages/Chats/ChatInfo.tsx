"use client";
import { useState } from "react";
import { ArrowLeft, BellOff, Bell, Settings, ChevronDown, ChevronUp, EllipsisVertical, Trash2, Copy, LinkIcon, UserPlus, CircleX } from "lucide-react";
import { GoBack } from "@/lib/Functions";
import ChatInfoPopUpMenu from "@/components/PopUps/ChatInfoPopUp";

export default function ChatInfo() {
    const [members, setMembers] = useState([
        { id: 1, name: "John Doe", isAdmin: true },
        { id: 2, name: "Jane Smith", isAdmin: false },
        { id: 3, name: "Mike Johnson", isAdmin: false },
    ]);
    const [notifications, setNotifications] = useState(false);
    const [settings, setSettings] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);

    const firstName = (name: any) => {
        if (!name) return "Null";
        const first_name = name.split(" ")[0];
        return first_name;
    };

    return (
        <>
            {showMenu && <ChatInfoPopUpMenu setShowMenu={setShowMenu} />}
            <div className="max-w-md mx-auto bg-[var(--main-background-color)]">
                {/* Header Section */}
                <div className="flex items-center justify-between p-4">
                    <button className="text-[var(--main-text-color)]" onClick={GoBack}>
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg text-[var(--main-text-color)] font-semibold">Contact Info</h1>
                    <button
                        onClick={() => setShowMenu(true)}
                        className="text-[var(--main-text-color)]">
                        <EllipsisVertical size={20} />
                    </button>
                </div>

                {/* Profile Image */}
                <div className="flex flex-col items-center mt-4">
                    <img
                        src="../../assets/images/profile-bg.png"
                        alt="Group"
                        className="w-24 h-24 rounded-full border"
                    />
                    <h2 className="text-[var(--main-text-color)] mt-2 text-lg font-semibold">Contact Name</h2>
                </div>

                <div className="flex flex-row items-center justify-center gap-11 mt-5 ">

                    <div className="flex cursor-pointer">
                        {notifications ? (
                            <Bell className="text-[var(--main-text-color)]" size={36}
                                onClick={() => setNotifications(false)} />
                        ) : (
                            <BellOff className="text-[var(--main-text-color)]" size={36}
                                onClick={() => setNotifications(true)} />
                        )}
                    </div>

                </div>

                <div className="flex flex-col mt-5">
                    <div
                        onClick={() => setSettings(settings !== true ? true : false)}
                        className="flex flex-row items-center justify-between p-3 bg-gray-900">
                        <h2 className="text-lg text-[var(--main-color)] flex flex-row items-center gap-2">
                            <Settings size={20} color="var(--main-white)" /> Chat Settings
                        </h2>
                        {!settings ? (
                            <ChevronDown size={24} color="var(--main-color)"
                            />
                        ) : (
                            <ChevronUp size={24} color="var(--main-color)"
                            />
                        )}
                    </div>
                    {settings && (
                        <div className="flex flex-col">
                            <div className="w-full p-3 text-red-500 flex items-center gap-3 cursor-pointer settings-cards">
                                <CircleX size={20} />
                                <span>Block</span>
                            </div>
                            <div className="w-full p-3 text-red-500 flex items-center gap-3 cursor-pointer settings-cards">
                                <Trash2 size={20} />
                                <span>Delete Contact</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

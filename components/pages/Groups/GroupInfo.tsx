"use client";
import { useState } from "react";
import { ArrowLeft, Crown, Pen, Plus, BellOff, Bell, Settings, ChevronDown, ChevronUp, EllipsisVertical, Trash2, Copy, LinkIcon, UserPlus } from "lucide-react";
import { GoBack } from "@/lib/Functions";
import SmallPopUpModal from "@/components/PopUps/SmallCenterPopUp";

export default function GroupInfo() {
    const [members, setMembers] = useState([
        { id: 1, name: "John Doe", isAdmin: true },
        { id: 2, name: "Jane Smith", isAdmin: false },
        { id: 3, name: "Mike Johnson", isAdmin: false },
    ]);
    const [notifications, setNotifications] = useState(false);
    const [settings, setSettings] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);

    const firstName = (name: any) => {
        if (!name) return "Null";
        const first_name = name.split(" ")[0];
        return first_name;
    };

    return (
        <div className="max-w-md mx-auto bg-[var(--main-background-color)]">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4">
                <button className="text-[var(--main-text-color)]" onClick={GoBack}>
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg text-[var(--main-text-color)] font-semibold">Group Info</h1>
            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center mt-4">
                <img
                    src="../../assets/images/profile-bg.png"
                    alt="Group"
                    className="w-24 h-24 rounded-full border"
                />
                <h2 className="text-[var(--main-text-color)] mt-2 text-lg font-semibold">Group Name</h2>
                {/* <p className="text-gray-500 text-sm">3 Members</p> */}
            </div>

            <div className="flex flex-row items-center justify-center gap-11 mt-5 ">
                <div className="flex flex-col rounded-lg border border-blue-500 h-20 w-20 items-center justify-center hover:cursor-pointer hover:bg-gray-900">
                    <button className="text-[var(--main-text-color)] text-sm">Add members</button>
                    <Plus className="default-color" size={24} />
                </div>

                <div className="flex cursor-pointer">
                    {notifications ? (
                        <Bell className="text-[var(--main-text-color)]" size={36}
                            onClick={() => setNotifications(false)} />
                    ) : (
                        <BellOff className="text-[var(--main-text-color)]" size={36}
                            onClick={() => setNotifications(true)} />
                    )}
                </div>

                <div className="flex flex-col rounded-lg border border-blue-500 h-20 w-20 items-center justify-center">
                    <div className="text-sm text-[var(--main-text-color)]">Members</div>
                    <div className="default-color text-sm font-semibold">3</div>
                </div>
            </div>

            {/* Group Description */}
            <div className="mt-4 px-4">
                <p className="text-sm text-[var(--main-text-color)]">
                    This is a group description where details about the group are shown.
                </p>
            </div>


            <div className="flex flex-col mt-5">
                <div
                    onClick={() => setSettings(settings !== true ? true : false)}
                    className="flex flex-row items-center justify-between p-3 bg-gray-900">
                    <h2 className="text-lg text-[var(--main-color)] flex flex-row items-center gap-2">
                        <Settings size={20} color="var(--main-white)" /> Group Settings
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
                          <div className="w-full text-[var(--main-text-color)] p-3 flex items-center gap-3 cursor-pointer settings-cards">
                            <UserPlus size={20} />
                            <span>Add Members</span>
                        </div>
                        <div className="w-full text-[var(--main-text-color)] p-3 flex items-center gap-3 cursor-pointer settings-cards">
                            <Pen size={20} />
                            <span>Change Group Name</span>
                        </div>
                        <div className="w-full text-[var(--main-text-color)] p-3 flex items-center gap-3 cursor-pointer settings-cards">
                            <Pen size={20} />
                            <span>Change Group Description</span>
                        </div>
                        <div className="w-full p-3 text-red-500 flex items-center gap-3 cursor-pointer settings-cards">
                            <ArrowLeft size={20} />
                            <span>Exit Group</span>
                        </div>
                        <div className="w-full p-3 text-red-500 flex items-center gap-3 cursor-pointer settings-cards">
                            <Trash2 size={20} />
                            <span>Delete Group</span>
                        </div>
                    </div>
                )}

            </div>

            {/* Invite & Created By */}
            <div className="mt-4">
                <h3 className="flex flex-row items-center gap-2 p-3 bg-gray-900 text-[var(--main-color)] text-lg">
                    <LinkIcon size={20} color="var(--main-white)" />
                    Group invite link
                </h3>

                <div className="flex flex-row items-center justify-between p-3">
                    <p className="text-sm text-[var(--main-color)] rounded-lg">https://group.invite/link</p>
                    <Copy className="text-[var(--main-color)]" size={20} />
                </div>

                <div className="flex flex-col p-3">
                    <h3 className="mt-3 text-[var(--main-text-color)] font-medium">Created By</h3>
                    <p className="text-sm text-[var(--main-color)]">John Doe - 10th Jan 2025</p>
                </div>

            </div>

            {/* Members List */}
            <div className="mt-4">
                <h3 className="text-[var(--main-text-color)] font-bold text-lg p-3">Members</h3>
                <ul className="">
                    {members.map((member) => (
                        <li
                            onClick={() => {
                                setSelectedMember(member);
                                setIsOpen(true);
                            }}
                            key={member.id} className="flex items-center justify-between p-3">
                            <span className="w-full flex flex-row items-center justify-between gap-2 text-[var(--main-text-color)]">
                                <div className="flex flex-row items-center gap-2">
                                    <img
                                        src="../../assets/images/profile-bg.png"
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full bg-gray-700"
                                    />
                                    {member.name}
                                </div>
                                <div>
                                    {member.isAdmin && <Crown className="text-[var(--main-color)]" />}
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>

                <SmallPopUpModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    {selectedMember && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-sm font-semibold">Message {firstName(selectedMember.name)}</h2>
                            <h2 className="text-sm font-semibold">View {firstName(selectedMember.name)}</h2>
                            <h2 className="text-sm font-semibold">Make group admin</h2>
                            <h2 className="text-sm font-semibold">Remove {firstName(selectedMember.name)}</h2>
                        </div>
                    )}
                </SmallPopUpModal>
            </div>
        </div>
    );
}

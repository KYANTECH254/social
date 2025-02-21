"use client";

import { useState } from "react";
import { ArrowLeft, Ellipsis, Crown, Pen, Plus, BellOff, Bell, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { GoBack } from "@/lib/Functions";

export default function GroupInfo() {
    const [members, setMembers] = useState([
        { id: 1, name: "John Doe", isAdmin: true },
        { id: 2, name: "Jane Smith", isAdmin: false },
        { id: 3, name: "Mike Johnson", isAdmin: false },
    ]);
    const [notifications, setNotifications] = useState(false);

    return (
        <div className="max-w-md mx-auto p-4 bg-[var(--main-background-color)]">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <button className="text-gray-600" onClick={GoBack}>
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-semibold">Group Info</h1>
                <button className="text-gray-600">
                    <Ellipsis size={20} />
                </button>
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

            <div className="flex flex-row items-center justify-center gap-11 mt-5">
                <div className="flex flex-col rounded-lg border border-blue-500 h-20 w-20 items-center justify-center">
                    <button className="text-[var(--main-text-color)] text-sm">Add members</button>
                    <Plus className="default-color" size={24} />
                </div>

                <div className="flex">
                    {notifications ? (
                        <Bell className="text-[var(--main-text-color)]" size={36}
                            onClick={() => setNotifications(false)} />
                    ) : (
                        <BellOff className="text-[var(--main-text-color)]" size={36}
                            onClick={() => setNotifications(true)} />
                    )}

                    {/* <BellOff /> */}
                </div>

                <div className="flex flex-col rounded-lg border border-blue-500 h-20 w-20 items-center justify-center">
                    <div className="text-sm text-[var(--main-text-color)]">Members</div>
                    <div className="default-color text-sm">3</div>
                </div>
            </div>

            {/* Group Description */}
            <div className="mt-4 px-4">
                <h3 className="text-[var(--main-text-color)] font-medium">Description</h3>
                <p className="text-sm text-[var(--main-text-color)]">
                    This is a group description where details about the group are shown.
                </p>
            </div>


            <div className="flex flex-col mt-5">
                <div className="flex flex-row">
                    <h2 className="text-lg p-2 text-[var(--main-color)] flex flex-row text-center gap-2">
                        <Settings size={20} /> Group Settings
                    </h2>
                    <ChevronUp size={20} />
                </div>

                {/* <ChevronDown size={20} /> */}
            </div>

            {/* Options */}
            <div className="mt-4 space-y-2 border-t pt-3">
                <button className="w-full text-left py-2 px-4 bg-gray-100 rounded-lg">Change Group Name</button>
                <button className="w-full text-left py-2 px-4 text-red-500">Exit Group</button>
                <button className="w-full text-left py-2 px-4 text-red-600">Delete Group</button>
            </div>

            {/* Invite & Created By */}
            <div className="mt-4 px-4">
                <h3 className="text-gray-700 font-medium">Invite Link</h3>
                <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">https://group.invite/link</p>

                <h3 className="mt-3 text-gray-700 font-medium">Created By</h3>
                <p className="text-sm text-gray-600">John Doe - 10th Jan 2025</p>
            </div>

            {/* Members List */}
            <div className="mt-4 px-4">
                <h3 className="text-gray-700 font-medium">Members</h3>
                <ul className="mt-2">
                    {members.map((member) => (
                        <li key={member.id} className="flex items-center justify-between py-2 border-b">
                            <span className="flex items-center gap-2">
                                {member.name}
                                {member.isAdmin && <Crown className="text-yellow-500" />}
                            </span>
                            <span className="text-sm text-gray-500">Member</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

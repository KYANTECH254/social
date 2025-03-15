"use client";
import Back from "@/components/Buttons/Back";
import RoundCheckbox from "@/components/Buttons/RoundCheckbox";
import { useState } from "react";

export default function CreateGroup() {
    const [groupName, setGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    const contacts = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Johnson" },
        { id: 4, name: "Emily Davis" },
        { id: 5, name: "Chris Brown" },
        { id: 6, name: "Sophia Lee" },
        { id: 7, name: "Daniel White" },
        { id: 8, name: "Olivia Green" },
    ];

    const handleMemberSelection = (id: number) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
        );
    };

    const isCreateDisabled = groupName.trim() === "" || selectedMembers.length < 1;

    return (
        <div className="first-container">
            <Back title="Create Group" />

            <div className="flex flex-col p-4 gap-2">
                <label htmlFor="Group Name" className="text-lg font-semibold">
                    Enter Group Name
                </label>
                <input
                    type="text"
                    value={groupName}
                    maxLength={30}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="outline-blue-500 bg-[var(--main-background-text)] text-[var(--main-text-color)] border-2 border-blue-500 w-full h-12 rounded-md p-2"
                />
                {groupName.trim() !== "" && (
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Select members to add</h3>
                        <div className="overflow-y-auto">
                            {contacts.map((contact) => (
                                <label
                                    key={contact.id}
                                    className="flex items-center justify-between mt-2 mb-2 last:border-none cursor-pointer"
                                >
                                    <div className="flex flex-row items-center">
                                        <img
                                            src="../../assets/images/profile-bg.png"
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full mr-3 bg-gray-700"
                                        />
                                        <span>{contact.name}</span>
                                    </div>
                                    <RoundCheckbox
                                        name={`group-member-${contact.id}`}
                                        value={contact.id.toString()}
                                        checked={selectedMembers.includes(contact.id)}
                                        color="blue-500"
                                        onChange={() => handleMemberSelection(contact.id)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                )}
                <button
                    className={`p-2 mt-3 font-semibold h-12 text-[var(--main-text-color)] outline-none rounded-md text-center ${isCreateDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                        }`}
                    disabled={isCreateDisabled}
                >
                    Create Group
                </button>
            </div>
        </div>
    );
}

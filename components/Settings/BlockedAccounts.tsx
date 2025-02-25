"use client";
import { Lock, LockOpen } from "lucide-react";
import Back from "../Buttons/Back";
import { useState } from "react";

export default function BlockedAccounts() {
    const [contacts, setContacts] = useState([
        { id: 1, name: "John Doe", blocked: true },
        { id: 2, name: "Jane Smith", blocked: true },
        { id: 3, name: "Michael Johnson", blocked: true },
    ]);

    function handleBlock(id: number) {
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact.id === id ? { ...contact, blocked: !contact.blocked } : contact
            )
        );
    }

    return (
        <div className="first-container">
            <Back title="Blocked Accounts" />
            <div className="flex flex-col p-2">
                    <div className="overflow-y-auto">
                        {contacts.map((contact) => (
                            <label
                                key={contact.id}
                                className="flex items-center justify-between p-2 last:border-none cursor-pointer"
                                onClick={() => handleBlock(contact.id)}
                            >
                                <div className="flex flex-row items-center">
                                    <img
                                        src="../../assets/images/profile-bg.png"
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full mr-3 bg-gray-700"
                                    />
                                    <span>{contact.name}</span>
                                </div>
                                {contact.blocked ? <Lock size={30} className="text-[var(--main-color)]"/> : <LockOpen size={30} className="text-[var(--main-color)]"/>}
                            </label>
                        ))}
                    </div>
            
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import Back from "../Buttons/Back";
import RoundCheckbox from "../Buttons/RoundCheckbox";

const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "John Doe" },
    { id: 6, name: "Jane Smith" },
    { id: 7, name: "Michael Johnson" },
    { id: 8, name: "Emily Davis" },
];

export default function StatusContacts() {
    const [selectedOption, setSelectedOption] = useState("Everybody");
    const [excludedContacts, setExcludedContacts] = useState<number[]>([]);

    const handleRadioChange = (option: string) => {
        setSelectedOption(option);
        if (option !== "My Contacts Except") {
            setExcludedContacts([]);
        }
    };

    const toggleContactSelection = (id: number) => {
        setExcludedContacts((prev) =>
            prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]
        );
    };

    return (
        <div className="first-container">
            <Back title="Status Privacy" />
            <div className="mx-auto bg-[var(--main-background-color)] text-[var(--main-text-color)]">
                <h2 className="text-xl font-semibold mb-4">Who can see my status updates?</h2>

                <div className="space-y-2">
                    {["Everybody", "Nobody", "My Contacts Except"].map((option) => (
                        <label
                            key={option}
                            className="flex items-center justify-between p-3 border cursor-pointer"
                        >
                            <span className="text-lg">{option}</span>
                            <input
                                type="radio"
                                name="status-privacy"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleRadioChange(option)}
                                className="appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-500"
                            />
                        </label>
                    ))}
                </div>

                {selectedOption === "My Contacts Except" && (
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Select contacts to exclude</h3>
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
                                        name="excluded-contacts"
                                        value={contact.id.toString()}
                                        checked={excludedContacts.includes(contact.id)}
                                        color="blue-500"
                                        onChange={() => toggleContactSelection(contact.id)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

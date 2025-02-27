"use client";

import Back from "@/components/Buttons/Back";
import { MessageSquareDiffIcon } from "lucide-react";
import { useState } from "react";

export default function ContactSupport() {
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    return (
        <>
            <Back title="Contact Support" />

            <div className="flex flex-col gap-3 p-3">
                <label htmlFor="subject" className="font-bold text-lg">
                    Write something for support
                </label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    maxLength={64}
                    placeholder="Enter subject"
                    className="text-lg tracking-widest p-2 py-2 border rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)]"
                />

                <label htmlFor="message" className="font-bold text-lg">
                    Your Message
                </label>
                <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Enter your message"
                    className="text-lg tracking-widest py-2 border rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)] p-2"
                />

                <button
                    className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-[var(--main-text-color)] rounded-md shadow-lg hover:bg-blue-700 transition-all"
                >
                    <MessageSquareDiffIcon size={20} />
                    Send
                </button>
            </div>
        </>
    );
}

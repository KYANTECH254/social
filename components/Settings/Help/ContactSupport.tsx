"use client";

import Back from "@/components/Buttons/Back";
import Input from "@/components/Inputs/Input";
import Textarea from "@/components/Inputs/Textarea";
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
                <label htmlFor="subject" className="text-lg">
                    Write something for support
                </label>
                <Input value={subject} maxLength={64} onChange={handleSubjectChange} placeholder="Enter subject" />
                <label htmlFor="message" className="text-lg">
                    Your Message
                </label>
                <Textarea value={message} onChange={handleMessageChange} placeholder="Enter your message" />
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

import { formatTimestamp } from "@/lib/Functions";
import Link from "next/link";
import { useState, useEffect } from "react";


export const renderText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
        urlRegex.test(part) ? (
            <Link
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                {part}
            </Link>
        ) : (
            part
        )
    );
};

export function ChatTime({ chat }: { chat: { last_timestamp: string } }) {
    const [formattedTime, setFormattedTime] = useState("...");

    useEffect(() => {
        setFormattedTime(formatTimestamp(chat.last_timestamp));
    }, [chat.last_timestamp]);

    return <span className="text-xs">{formattedTime}</span>;
}
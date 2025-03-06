"use client";

import { useState, useEffect, useRef } from "react";

interface ReplyContentProps {
    username: string;
    text: string;
    maxLines?: number;
}

export default function ReplyContent({ username, text, maxLines = 3 }: ReplyContentProps) {
    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const lineHeight = parseInt(getComputedStyle(contentRef.current).lineHeight, 10);
            const maxHeight = lineHeight * maxLines;
            setIsTruncated(contentRef.current.scrollHeight > maxHeight);
        }
    }, [text, maxLines]);

    return (
        <div>
            <div
                ref={contentRef}
                className={`reply-content ${expanded ? "expanded" : ""}`}
                style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: expanded ? "unset" : maxLines,
                    marginTop:'5px',
                    maxHeight: '200px'
                }}
            >
                <span className="reply-content-user">@{username}</span> {text}
            </div>
            {isTruncated && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-500 text-sm font-semibold ml-2 cursor-pointer mt-1"
                >
                    {expanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
}

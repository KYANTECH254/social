"use client";

import { useState, useEffect, useRef } from "react";

interface CommentContentProps {
    text: string;
    maxLines?: number;
}

export default function CommentContent({ text, maxLines = 5 }: CommentContentProps) {
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
                className={`comment-box-content ${expanded ? "expanded" : ""}`}
                style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: expanded ? "unset" : maxLines,
                    marginTop: '5px',
                    maxHeight: '200px'
                }}
            >
                {text}
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

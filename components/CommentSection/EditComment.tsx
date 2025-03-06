"use client";

import { useRef, useEffect } from "react";

interface EditCommentProps {
    comment: { id: number };
    editedText: { [key: number]: string };
    setEditedText: (text: { [key: number]: string }) => void;
    handleBlur: () => void;
    handleChange: (id: number, text: string) => void;
}

export default function EditComment({ comment, editedText, handleBlur, handleChange }: EditCommentProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [editedText[comment.id]]);


    return (
        <div>
            <textarea
                ref={textareaRef}
                className="w-full fs-15 pt-2 pl-3 outline-none bg-[var(--main-background-color)] text-[var(--main-text-color)] resize-none overflow-hidden"
                value={editedText[comment.id] || ""}
                onChange={(e) => handleChange(comment.id, e.target.value)}
                onBlur={handleBlur}
                onInput={() => {
                    if (textareaRef.current) {
                        textareaRef.current.style.height = "auto";
                        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                    }
                }}
                autoFocus
            />
            <div className="pr-3 flex justify-end">
                <button
                    disabled={!editedText[comment.id]}
                    className="font-semibold text-sm text-center w-20 h-8 bg-blue-500 disabled:bg-gray-500/50 disabled:cursor-not-allowed disabled:text-gray-500 outline-none rounded-md">
                    Save
                </button>
            </div>
        </div>
    );
}

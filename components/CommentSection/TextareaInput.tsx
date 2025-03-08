"use client";
import { useEffect, useRef } from "react";

export default function TextareaInput({ setComment, comment, placeholder }: any) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
            // textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        }
    }, [comment]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length
            );
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={comment}
            onInput={handleChange}
            onChange={handleChange}
            className="pt-8 pl-3 w-full flex-grow outline-none bg-[var(--main-background-color)] text-[var(--main-text-color)] resize-none"
        />
    );
}

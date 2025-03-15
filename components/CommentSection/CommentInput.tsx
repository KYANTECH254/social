"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import { toast } from "sonner";
import Emoji from "../Buttons/Emoji";
import TextareaInput from "./TextareaInput";

export default function CommentInput({ onSubmit }: { onSubmit: (text: string) => void }) {
    const [comment, setComment] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleComment = () => {
        if (comment.trim()) {
            onSubmit(comment.trim());
            setComment("");
            setShowEmojiPicker(false);
            toast.success('Comment added', {
                duration: 3000,
                classNames: {
                    toast: 'alert',
                }
            });
        } else {
            toast.error('Comment cannot be empty', {
                duration: 3000,
                classNames: {
                    toast: 'alert',
                }
            });
        }
    };

    const handleEmojiSelect = (emoji: any) => {
        setComment((prev) => prev + emoji.native);
    };

    return (
        <>
            <div
            onClick={() => showEmojiPicker ? setShowEmojiPicker(false) : null}
            className="comments-input">
                <Smile
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    size={24}
                    className="ml-3 mr-3 w-10 h-8 text-[var(--main-text-color)] cursor-pointer flex items-center justify-center"
                />
                <TextareaInput setComment={setComment} comment={comment} placeholder="Add a comment..." />
                <button
                    onClick={handleComment}
                    className="flex items-center p-3 rounded-md transition font-bold"
                    disabled={!comment.trim()}
                >
                    <Send size={24} className={comment.trim() ? "text-blue-500" : "text-gray-600"} />
                </button>
            </div>
            {showEmojiPicker && <Emoji onSelect={handleEmojiSelect} />}
        </>
    );
}

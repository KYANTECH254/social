"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import { toast } from "sonner";
import Emoji from "../Buttons/Emoji";
import TextareaInput from "./TextareaInput";

export default function ReplyInput({ comment, setReplyInput, replyinput, onSubmit }: { onSubmit: (text: string) => void, setReplyInput: any, replyinput: any, comment: any; }) {
    const [reply, setReply] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleReply = () => {
        if (reply.trim()) {
            onSubmit(reply.trim());
            setReply("");
            setShowEmojiPicker(false);
            replyinput ? setReplyInput(null) : setReplyInput(comment.id);
            toast.success('Reply added', {
                duration: 3000,
                classNames: {
                    toast: 'alert',
                }
            });
        } else {
            toast.error('Reply cannot be empty', {
                duration: 3000,
                classNames: {
                    toast: 'alert',
                }
            });
        }
    };

    const handleEmojiSelect = (emoji: any) => {
        setReply((prev) => prev + emoji.native);
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
                <TextareaInput setComment={setReply} comment={reply} placeholder="Add a reply..." />
                <button
                    onClick={handleReply}
                    className="flex items-center p-2 rounded-md transition"
                    disabled={!reply.trim()}
                >
                    <Send size={24} className={reply.trim() ? "text-blue-500" : "text-gray-600"} />
                </button>
            </div>
            {showEmojiPicker && <Emoji onSelect={handleEmojiSelect} />}
        </>
    );
}

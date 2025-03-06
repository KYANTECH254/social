"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import { toast } from "sonner";
import Emoji from "../Buttons/Emoji";

export default function CommentInput() {
    const [comment, setComment] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
        requestAnimationFrame(adjustHeight); 
    };

    const handleComment = () => {
        toast.error('Comment not added', {
            duration: 3000,
            classNames: {
                toast: 'alert',
            }
        })
    }

    const handleEmojiSelect = (emoji: any) => {
        setComment((prev) => prev + emoji.native);
        requestAnimationFrame(adjustHeight); 
    };

    useEffect(() => {
        adjustHeight();
    }, [comment]);

    return (
        <>
            <div
            onClick={() => {setShowEmojiPicker(showEmojiPicker ? false : true)}}
             className="comments-input">
                <Smile
                    onClick={() => setShowEmojiPicker((prev: any) => !prev)}
                    size={24}
                    className="ml-3 mr-3 w-10 h-8 text-[var(--main-text-color)] cursor-pointer flex items-center justify-center"
                />
                <textarea
                    ref={textareaRef}
                    name="comment"
                    id="comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleChange}
                    className="pt-4 pb-4 pl-3 w-full flex-grow outline-none bg-transparent text-[var(--main-text-color)] "
                />
                <button
                    onClick={handleComment}
                    className="flex items-center p-2 rounded-md transition"
                    disabled={!comment.trim()}
                >
                    <Send size={24} className={comment.trim() ? "text-blue-500" : "text-gray-600"} />
                </button>
            </div>
            {showEmojiPicker && <Emoji onSelect={handleEmojiSelect} />}
        </>
    );
}

"use client";
import { useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import TextareaInput from "./TextareaInput";

interface EditCommentProps {
    comment: { id: string; text: string };
    onSubmit: (newText: string) => void; 
}

export default function EditComment({ comment, onSubmit }: EditCommentProps) {
    const [editedText, setEditedText] = useState(comment.text);

    const handleEdit = () => {
        if (editedText.trim()) {
            onSubmit(editedText.trim());
            toast.success("Comment edited", {
                duration: 3000,
                classNames: { toast: "alert" },
            });
        } else {
            toast.error("Comment cannot be empty", {
                duration: 3000,
                classNames: { toast: "alert" },
            });
        }
    };

    return (
        <div className="flex flex-col">
            <TextareaInput setComment={setEditedText} comment={editedText} placeholder="" />
            <div className="p-3 flex justify-end">
                <button
                    disabled={!editedText.trim()}
                    onClick={handleEdit}
                    className="font-semibold text-sm text-center w-20 h-8 bg-blue-500 disabled:bg-gray-500/50 disabled:cursor-not-allowed disabled:text-gray-500 outline-none rounded-md"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

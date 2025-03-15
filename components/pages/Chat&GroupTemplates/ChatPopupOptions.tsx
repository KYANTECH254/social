"use client";
import { useState } from "react";
import BottomPopupModal from "@/components/PopUps/BottomPopupModal/BottomPopupModal";
import { Reply, Trash2, ClipboardCopyIcon, Forward } from "lucide-react";

export default function ChatPopUpOptions({ onReply,showPopup, setShowPopup }: any) {
    const handleReply = (id: string) => {
        onReply(id, true);
        setShowPopup(false);
    };

    const handleDelete = (id: string) => {
        console.log("Deleting message with id:", id);
        setShowPopup(false);
    };

    const handleCopy = (text: any) => {
        navigator.clipboard.writeText(text)
            .then(() => console.log("Message copied to clipboard"))
            .catch((err) => console.error("Error copying text:", err));
        setShowPopup(false);
    };

    const handleForward = (id: string) => {
        console.log("Forwarding message with id:", id);
        setShowPopup(false);
    };
    return (
        <>
            <BottomPopupModal isOpen={showPopup} onClose={() => setShowPopup(false)} size={0.3}>
                <div className="p-4 flex flex-col gap-4">
                    <p className="text-lg font-bold text-center flex justify-center">Reply to Message</p>
                    <div className="flex justify-around">
                        <button
                            // onClick={handleReply}
                            className="px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            <Reply size={24} />
                        </button>
                        <button
                            // onClick={handleDelete}
                            className="px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            <Trash2 size={24} />
                        </button>
                        <button
                            // onClick={handleCopy}
                            className="px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            <ClipboardCopyIcon size={24} />
                        </button>
                        <button
                            // onClick={handleForward}
                            className="px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            <Forward size={24} />
                        </button>
                    </div>
                </div>
            </BottomPopupModal>
        </>
    )
}
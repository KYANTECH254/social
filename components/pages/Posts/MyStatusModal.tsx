"use client";
import { EllipsisVerticalIcon, Trash } from "lucide-react";
import { useState } from "react";

interface MyStatusModalProps {
    onDelete: () => void;
}

export default function MyStatusModal({ onDelete }: MyStatusModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex relative">
            <div onClick={() => setIsModalOpen((prev) => !prev)} className="flex">
                <EllipsisVerticalIcon size={20} />
            </div>

            {isModalOpen && (
                <div className="absolute right-2 top-5 w-32 border border-gray-600/70 rounded-md shadow-lg flex flex-col space-y-2 p-2 comment-modal-menu z-10 bg-white dark:bg-gray-800">
                    <button
                        className="flex items-center space-x-2 p-2 rounded-md transition hover:bg-gray-600"
                        onClick={() => {
                            onDelete();
                            setIsModalOpen(false);
                        }}
                    >
                        <Trash size={16} className="default-color" />
                        <span className="text-sm">Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}

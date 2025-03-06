"use client";

import { MoreVertical, Edit, Trash } from "lucide-react";
import { useState } from "react";

interface VerticalMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function VerticalMenu({ onEdit, onDelete }: VerticalMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleMenu}
                className={`p-2 transition duration-200 w-8 h-8 rounded-full ${isOpen ? 'hover:bg-gray-600/30' : ''} flex items-center justify-center shadow-lg`}
            >
                <MoreVertical size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 w-32 border border-gray-600/70 rounded-md shadow-lg flex flex-col space-y-2 p-2 comment-modal-menu z-10">
                    <button
                        className="flex items-center space-x-2 p-2 rounded-md transition hover:bg-gray-600"
                        onClick={() => {
                            onEdit();
                            setIsOpen(false);
                        }}
                    >
                        <Edit size={16} className="default-color" />
                        <span className="text-sm">Edit</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 p-2 rounded-md transition hover:bg-gray-600"
                        onClick={() => {
                            onDelete();
                            setIsOpen(false);
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

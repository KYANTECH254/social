"use client"

import { MoreVertical, Edit, Trash, Share } from "lucide-react";
import { useState } from "react";

export default function VerticalMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleMenu}
                className="p-2 rounded-md transition duration-200"
            >
                <MoreVertical size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 w-36 border rounded-md shadow-lg flex flex-col space-y-2 p-2 comment-modal-menu">
                    <button className="flex items-center space-x-2 p-2 rounded-md transition">
                        <Edit size={20} />
                        <span>Edit</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 rounded-md transition">
                        <Trash size={20} />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}

"use client";

import { MoreVertical, Edit, Trash, Flag } from "lucide-react";
import { useState } from "react";

interface VerticalMenuProps {
    username: string;
    session: any;
    id: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onReport: (id: string) => void;
}

export default function VerticalMenu({ username, session, id, onEdit, onDelete, onReport }: VerticalMenuProps) {
    const [isOpen, setIsOpen] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => (prev === id ? null : id));
    };

    return (
        <div className="relative inline-block text-left ">
            <button
                onClick={toggleMenu}
                className={`p-2 transition duration-200 w-8 h-8 rounded-full ${isOpen === id ? 'hover:bg-gray-600/30' : ''} flex items-center justify-center shadow-lg`}
            >
                <MoreVertical size={20} />
            </button>

            {isOpen === id && (
                <div className="absolute right-0 w-32 border border-gray-600/70 rounded-md shadow-lg flex flex-col space-y-2 p-2 comment-modal-menu z-10 bg-white dark:bg-gray-800">
                    {session && session.username === username ? (
                        <>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-md transition hover:bg-gray-600"
                                onClick={() => {
                                    onEdit(id);
                                    setIsOpen(null);
                                }}
                            >
                                <Edit size={16} className="default-color" />
                                <span className="text-sm">Edit</span>
                            </button>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-md transition hover:bg-gray-600"
                                onClick={() => {
                                    onDelete(id);
                                    setIsOpen(null);
                                }}
                            >
                                <Trash size={16} className="default-color" />
                                <span className="text-sm">Delete</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-md transition hover:bg-gray-600"
                                onClick={() => {
                                    onReport(id);
                                    setIsOpen(null);
                                }}
                            >
                                <Flag size={16} className="default-color" />
                                <span className="text-sm">Report</span>
                            </button>
                        </>
                    )}


                </div>
            )}
        </div>
    );
}

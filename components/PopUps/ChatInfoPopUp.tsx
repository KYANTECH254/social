"use client";

import { useState, useRef, useEffect } from "react";
import { Share, Edit } from "lucide-react";

export default function ChatInfoPopUpMenu({ setShowMenu }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <div className="absolute py-1 top-16 right-0 mt-2 w-52 text-[var(--main-text-color)] bg-[var(--main-background-color)] rounded-md shadow-lg z-10">
                <ul className="py-1">
                    <li>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setShowMenu(false);
                            }}

                            className="flex items-center w-full px-4 py-2 text-xm hover:bg-[var(--main-hover-icons-color)]"
                        >
                            <Share size={20} className="mr-2" />
                            Share
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-xm hover:bg-[var(--main-hover-icons-color)]"
                        >
                            <Edit size={20} className="mr-2" />
                            Edit
                        </button>
                    </li>
                   
                    
                </ul>
            </div>
        </div>
    );
}

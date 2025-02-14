"use client";

import { useState, useRef, useEffect, SetStateAction } from "react";
import { Flag, Trash2, ArrowLeft, Search, BellOff } from "lucide-react";

export default function GroupChatPopUpMenu({ setShowSearch, setShowMenu }: any) {
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
                                setShowSearch((prev: any) => !prev)
                            }}
                         
                            className="flex items-center w-full px-4 py-2 text-xm hover:bg-[var(--main-hover-icons-color)]"
                        >
                            <Search size={20} className="mr-2" />
                            Search
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                console.log("Block");
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-xm hover:bg-[var(--main-hover-icons-color)]"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Exit group
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                console.log("Block");
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-xm hover:bg-[var(--main-hover-icons-color)]"
                        >
                            <BellOff size={20} className="mr-2" />
                            Mute notification
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                console.log("Report");
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-xm hover:bg-[var(--main-hover-icons-color)]"
                        >
                            <Flag size={20} className="mr-2" />
                            Report
                        </button>
                    </li>

                    <li>
                        <button
                            onClick={() => {
                                console.log("Clear Chat");
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-xm hover:bg-[var(--main-hover-icons-color)]"
                        >
                            <Trash2 size={20} className="mr-2" />
                            Clear Chat
                        </button>
                    </li>
                </ul>
            </div>
        </div>

    );
}

"use client";
import { GoBack } from "@/lib/Functions";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import Link from "next/link";

export default function GroupChatHeader({ setShowMenu }: any) {
    return (
        <>
            <div className="flex items-center p-4 border-b border-gray-500/30 shadow-lg">
                <button className="mr-4 text-[var(--main-text-color)]" onClick={GoBack}>
                    <ArrowLeft size={20} />
                </button>
                <img
                    src="assets/images/profile-bg.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 bg-gray-700"
                />
                <Link href="/chat/info">
                    <div>
                        <p className="font-semibold text-[var(--main-text-color)]">Contact Name</p>
                        <p className="text-sm text-blue-500">Online</p>
                    </div>
                </Link>
                <div className="ml-auto flex space-x-4">
                    <button className="flex items-center justify-center text-[var(--main-text-color)] w-10 h-10 rounded-full hover:bg-[var(--main-hover-icons-color)]"
                        onClick={() => setShowMenu((prev: any) => !prev)}
                    >
                        <EllipsisVertical size={20} />
                    </button>
                </div>
            </div>
        </>
    )
}
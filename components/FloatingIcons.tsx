"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Camera, Pen, UserPlus } from "lucide-react";
import { FloatingIcon } from "@/types/types";

export default function FloatingIcons({ addstatus }: any) {
    const pathname = usePathname();

    const defaultIcons: FloatingIcon[] = [
        { text: "Public", icon: "🌍", border: false, link: "/public" },
        { text: "Settings", icon: "⚙️", border: false, link: "/settings" },
        { text: "Profile", icon: "👤", border: true, link: "/profile" },
    ];

    const groupIcon: FloatingIcon[] = [
        {
            text: "Create Group",
            icon: <UserPlus className="w-6 h-6 animate-pulse text-[var(--main-color)] font-bold" />,
            border: true,
            link: "/create-group",
        },
    ];

    const statusIcons: FloatingIcon[] = [
        { text: "Text", icon: <Pen size={24} className="text-[var(--main-color)] font-bold" />, border: true, link: "/text-status" },
        { text: "Video / Image", icon: <Camera size={24} className="text-green-500 font-bold" />, border: true, link: "/file-status" },
    ];

    const floatingIcons =
        pathname === "/groups" ? groupIcon : pathname === "/posts" || pathname === "/my-posts" ? statusIcons : defaultIcons;

    return (
        <div className="floating-icons w-full floating-icons-container flex items-center">
            {floatingIcons.map((item) => (
                (pathname === "/posts" || pathname === "/my-posts" && !addstatus) ? null : (
                    <Link href={item.link} key={item.link}>
                        <div className="flex flex-col items-center w-full gap-2 p-3 transition floating-icons-item">
                            <div className={`floating-icon ${item.border ? "floating-icon-border" : ""}`}>
                                {item.icon}
                            </div>
                            <div className="text-sm mt-1 truncate text-center floating-icon-text">
                                {item.text}
                            </div>
                        </div>
                    </Link>
                )
            ))}
        </div>
    );
}

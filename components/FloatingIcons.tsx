"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { FloatingIcon } from "@/types/types";

export default function FloatingIcons() {
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

    const floatingIcons = pathname === "/groups" ? groupIcon : defaultIcons;

    return (
        <div className="floating-icons w-full floating-icons-container flex items-center">
            {floatingIcons.map((item) => (
                <Link href={item.link} key={item.link}>
                    <div className="flex flex-col items-center w-full gap-2 p-3 transition floating-icons-item">
                        <div className={`floating-icon ${item.border ? "floating-icon-border" : ""}`}>
                            {item.icon}
                        </div>
                        <span className="text-sm mt-1 truncate text-center floating-icon-text">
                            {item.text}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

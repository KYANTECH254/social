"use client"

import { User, PaintBucket, Shield, Lock, LogOut } from "lucide-react";
import ItemsNav from "@/components/ItemsNav/ItemsNav";
import TopNav from "@/components/TopNav/TopNav";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
// Import components for each setting
import ThemeOptions from "@/components/Settings/ThemeOptions";
// import ProfileSettings from "@/components/Settings/ProfileSettings";
// import PrivacySettings from "@/components/Settings/PrivacySettings";
// import SecuritySettings from "@/components/Settings/SecuritySettings";

export default function Page() {
    const settingsItems = [
        { name: "Profile", icon: <User size={20} />, link: "/profile" },
        { name: "Theme", icon: <PaintBucket size={20} />, link: "/settings/theme" },
        { name: "Privacy", icon: <Shield size={20} />, link: "/settings/privacy" },
        { name: "Security", icon: <Lock size={20} />, link: "/settings/security" },
        { name: "Logout", icon: <LogOut size={20} />, link: "/logout" },
    ];
    useTheme();
    return (
        <main>
            <TopNav />
            <ItemsNav />

            <div className="settings-container">
                <h4 className="p-4 container-sub-headings">Manage your theme, privacy, and security options.</h4>
                <div className="flex flex-col">
                    {settingsItems.map((item) => (
                        <Link key={item.name} href={item.link}>
                            <div className="w-full p-4 flex items-center gap-3 cursor-pointer settings-cards">
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

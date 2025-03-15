"use client";
import { useTheme } from "@/hooks/useTheme";
import { User, PaintBucket, Shield, HelpCircle, Download, LogOut, Settings, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SettingsContainer() {
    const settingsItems = [
        { name: "Profile", icon: <User size={20} />, link: "/profile" },
        { name: "Theme", icon: <PaintBucket size={20} />, link: "/settings/theme" },
        { name: "Privacy", icon: <Shield size={20} />, link: "/settings/privacy" },
        { name: "Security", icon: <ShieldCheck size={20} />, link: "/settings/security" },
        { name: "Account Management", icon: <Settings size={20} />, link: "/settings/account-management" },
        { name: "Help", icon: <HelpCircle size={20} />, link: "/help" },
        { name: "Invite a Friend", icon: <Users size={20} />, link: "/settings/invite" },
        { name: "Download App", icon: <Download size={20} />, link: "/download/app" },
        { name: "Logout", icon: <LogOut size={20} />, link: "/logout" },
    ];

    useTheme();
    return (
        <>
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
        </>
    )
}
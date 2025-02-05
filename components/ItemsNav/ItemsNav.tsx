"use client";

import { useState, useEffect } from "react";
import { Save, MessageCircle, FileText, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemsNav() {
  const menuItems = [
    { name: "Saved", icon: Save, link: "/" },
    { name: "Chats", icon: MessageCircle, link: "/chats" },
    { name: "Posts", icon: FileText, link: "/posts" },
    { name: "Groups", icon: Users, link: "/groups" },
  ];

  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Set the active item based on the current pathname or default to the home ("/") link
    const active = menuItems.find((item) => item.link === pathname);
    setActiveItem(active ? active.name : "Saved"); // Default to "Saved" or "/" if no match
  }, [pathname]);

  return (
    <div className="items-topnav flex justify-between items-center p-2 w-full">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.name;

        return (
          <Link href={item.link} key={item.name}>
            <div
              className={`flex flex-col items-center items-topnav-item ${isActive ? "active text-blue-500" : ""}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm mt-1 items-topnav-list">{item.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

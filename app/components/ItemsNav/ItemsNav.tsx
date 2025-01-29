"use client";

import { useState } from "react";
import { Save, MessageCircle, FileText, Users } from "lucide-react";
import Link from "next/link";

export default function ItemsNav() {
  const menuItems = [
    { name: "Saved", icon: Save, link: "/" },
    { name: "Chats", icon: MessageCircle, link: "/chats" },
    { name: "Posts", icon: FileText, link: "/posts" },
    { name: "Groups", icon: Users, link: "/groups" },
  ];

  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <div className="items-topnav flex justify-between items-center bg-gray-100 p-2 w-full">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.name;

        return (
          <Link href={item.link} key={item.name}>
            <div
              className={`flex flex-col items-center items-topnav-item ${isActive ? "active text-blue-500" : ""
                }`}
              onClick={() => handleItemClick(item.name)}
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

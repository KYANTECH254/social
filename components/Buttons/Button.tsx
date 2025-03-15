"use client";

import { cn } from "@/lib/utils";
export default function Button({ text, icon: Icon, onClick, className }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-medium shadow-md",
                className
            )}
        >
            {Icon && <Icon size={24} />}
            <span>{text}</span>
        </button>
    );
}

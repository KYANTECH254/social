"use client"

import ItemsNav from "@/components/ItemsNav/ItemsNav";
import ThemeOptions from "@/components/Settings/ThemeOptions";
import TopNav from "@/components/TopNav/TopNav";
import { useTheme } from "@/hooks/useTheme";

export default function Page() {
    useTheme();
    return (
        <main>
            <TopNav />
            <ItemsNav />
            <ThemeOptions />
        </main>
    );
}

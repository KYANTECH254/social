"use client"

import ItemsNav from "@/components/ItemsNav/ItemsNav";
import ThemeOptions from "@/components/Settings/ThemeOptions";
import TopNav from "@/components/TopNav/TopNav";

export default function Page() {
    return (
        <main>
            <TopNav />
            <ItemsNav />
            <ThemeOptions />
        </main>
    );
}

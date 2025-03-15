"use client";

import Logo from "./auth/Logo";

export default function SpinLoader() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--main-background-color)]">
            <Logo />
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
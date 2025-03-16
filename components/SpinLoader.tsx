"use client";

import Logo from "./auth/Logo";

export default function SpinLoader({ type, color = "blue" }: any) {
    if (type === "fullpage") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--main-background-color)]">
                <Logo />
                <div className={`w-12 h-12 border-4 border-${color}-500 border-t-transparent rounded-full animate-spin`}></div>
            </div>
        );
    } else if (type === "loader") {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className={`w-8 h-8 border-4 border-${color}-500/50 border-t-transparent rounded-full animate-spin`}></div>
            </div>
        );
    } else if (type === "fullpage-no-logo") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--main-background-color)]">
                <div className={`w-12 h-12 border-4 border-${color}-500 border-t-transparent rounded-full animate-spin`}></div>
            </div>
        );
    }
}
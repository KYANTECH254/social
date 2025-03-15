"use client";

import Logo from "./Logo";

export default function ErrorComponent({ error }: any) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--main-background-color)]">
            <Logo />
            <h1 className="text-red-500 text-center mt-10 font-bold">{error}</h1>
        </div>
    );
}
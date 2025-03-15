"use client";
import Back from "../Buttons/Back";
import { Download, Apple, Smartphone } from "lucide-react";
import Link from "next/link";
import Button from "../Buttons/Button";

export default function DownloadApp() {
    return (
        <div className="flex flex-col bg-[var(--main-background-color)] text-[var(--main-text-color)]">
            <Back title="Download App" />

            <div className="text-center mt-8 p-6">
                <h1 className="text-2xl font-semibold">Get Our App</h1>
                <p className="text-gray-400 mt-2">
                    Download the app for the best experience on your device.
                </p>
            </div>

            <div className="flex items-center justify-center font-bold">
                <Download size={44} className="text-3xl animate-bounce text-[var(--main-color)]" />
            </div>

            <div className="mt-6 flex flex-col p-6 sm:flex-row gap-4">
                <Link
                    href="https://play.google.com/store/apps/details?id=your.app.id"
                    target="_blank"
                >
                    <Button text="Download for Android" icon={Smartphone} onClick={() => { }} />
                </Link>
                <Link
                    href="https://apps.apple.com/us/app/your-app-id"
                    target="_blank"
                >
                    <Button text="Download for iOS" icon={Apple} onClick={() => { }} />
                </Link>
            </div>
        </div>
    );
}

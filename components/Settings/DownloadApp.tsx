"use client";
import Back from "../Buttons/Back";
import { Download, Apple, Smartphone } from "lucide-react";
import Link from "next/link";

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
                <Download size={44} className="text-3xl animate-bounce text-[var(--main-color)]"/>
            </div>

            <div className="mt-6 flex flex-col p-6 sm:flex-row gap-4">
                {/* Android Download */}
                <Link
                    href="https://play.google.com/store/apps/details?id=your.app.id"
                    target="_blank"
                    className="flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-medium shadow-md"
                >
                    <Smartphone size={24} />
                    <span>Download for Android</span>
                </Link>

                {/* iOS Download */}
                <Link
                    href="https://apps.apple.com/us/app/your-app-id"
                    target="_blank"
                    className="flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-medium shadow-md"
                >
                    <Apple size={24} />
                    <span>Download for iPhone</span>
                </Link>
            </div>

            {/* <div className="mt-6 text-gray-400 text-sm">
                <Download size={16} className="inline-block mr-1" />
                Available on the App Store & Google Play
            </div> */}
        </div>
    );
}

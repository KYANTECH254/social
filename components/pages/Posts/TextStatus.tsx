"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function TextStatus() {
    const colors = [
        { bg: "#ff5733", text: "#ffffff" },
        { bg: "#33ff57", text: "#000000" },
        { bg: "#5733ff", text: "#f8f8ff" },
        { bg: "#ff33a1", text: "#2e2e2e" },
        { bg: "#33a1ff", text: "#ffebcd" },
        { bg: "#ffd700", text: "#8b0000" },
        { bg: "#1a1a1a", text: "#ffcc00" },
        { bg: "#ffcc00", text: "#006400" },
        { bg: "#9900cc", text: "#f0e68c" },
        { bg: "#ff4500", text: "#4682b4" },
        { bg: "#00ced1", text: "#800080" },
        { bg: "#8b4513", text: "#7fffd4" },
        { bg: "#ff69b4", text: "#2f4f4f" },
        { bg: "#4682b4", text: "#ffe4c4" },
        { bg: "#228b22", text: "#dc143c" },
    ];

    const MAX_CHARACTERS = 200;
    const [text, setText] = useState("");
    const [bgIndex, setBgIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const changeBackground = () => setBgIndex((prev) => (prev + 1) % colors.length);
    const changeTextColor = () => setTextIndex((prev) => (prev + 1) % colors.length);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= MAX_CHARACTERS) {
            setText(inputText);
        }
    };

    // Dynamic font size calculation
    const calculateFontSize = () => {
        const baseSize = 3; 
        const minSize = 1.5; 
        const shrinkFactor = 0.05; 

        return `${Math.max(baseSize - text.length * shrinkFactor, minSize)}rem`;
    };

    if (!isVisible) return null;

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center p-6 relative transition-all duration-300"
            style={{
                backgroundColor: colors[bgIndex].bg,
                color: colors[textIndex].text,
            }}
        >
            {/* Close Button (X) */}
            <button
                className="absolute top-4 left-4 text-white text-xl bg-gray-800/50 p-2 rounded-full hover:bg-gray-900 transition"
                onClick={() => setIsVisible(false)}
            >
                <X  size={24}/>
            </button>

            {/* Controls (B & T) */}
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    className="px-4 py-2 rounded-lg text-white bg-black/30 hover:bg-black/60 transition"
                    onClick={changeBackground}
                >
                    B
                </button>
                <button
                    className="px-4 py-2 rounded-lg text-white bg-black/30 hover:bg-black/60 transition"
                    onClick={changeTextColor}
                >
                    T
                </button>   
            </div>

            {/* Expandable Textarea */}
            <textarea
                value={text}
                onChange={handleTextChange}
                className="flex items-center justify-center w-full h-full resize-none bg-transparent outline-none text-center font-semibold overflow-hidden"
                style={{
                    color: colors[textIndex].text,
                    fontSize: calculateFontSize(),
                }}
                placeholder="Type your status..."
            />

            {/* Character Counter */}
            <div className="absolute bottom-4 text-white/70 text-sm">
                {text.length}/{MAX_CHARACTERS}
            </div>
        </div>
    );
}

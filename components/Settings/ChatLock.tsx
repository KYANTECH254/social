"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Trash } from "lucide-react";
import Back from "../Buttons/Back";

export default function ChatLock() {
    const [pin, setPin] = useState("");
    const [savedPin, setSavedPin] = useState<string | null>(null);
    const [isPinVisible, setIsPinVisible] = useState(false);

    useEffect(() => {
        const storedPin = localStorage.getItem("chatLockPin");
        if (storedPin) setSavedPin(storedPin);
    }, []);

    const isValidPin = pin.length === 4 && /^\d+$/.test(pin);

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPin = e.target.value.slice(0, 4); // Limit to 4 digits
        if (/^\d*$/.test(newPin)) setPin(newPin);
    };

    const handleConfirm = () => {
        localStorage.setItem("chatLockPin", pin);
        setSavedPin(pin);
        setPin("");
    };

    const handleDeletePin = () => {
        localStorage.removeItem("chatLockPin");
        setSavedPin(null);
    };

    return (
        <div className="first-container">
            <Back title="Chat Lock" />
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-[var(--main-background-color)] text-[var(--main-text-color)] p-6 rounded-2xl max-w-sm mx-auto">
                <h2 className="text-xl font-semibold mb-4">Set Chat Lock PIN</h2>
                <p className="text-sm text-center p-2">Secure your chats using a 4-digit PIN. You will be asked to enter this PIN each time you open the app.</p>
                
                <input
                    type="password"
                    value={pin}
                    onChange={handlePinChange}
                    maxLength={4}
                    placeholder="Enter 4-digit PIN"
                    className="text-center text-lg tracking-widest py-2 border rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)]"
                />
                <button
                    className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                    onClick={handleConfirm}
                    disabled={!isValidPin}
                >
                    Confirm PIN
                </button>

                {/* Current PIN Section */}
                <div className="mt-6 w-full text-center">
                    <h2 className="ttext-xl font-semibold mb-4">Current PIN</h2>
                    {savedPin ? (
                        <div className="flex items-center justify-between bg-[var(--main-background-color)] text-[var(--main-text-color)] p-3 rounded-md mt-2 border">
                            <span className="text-lg tracking-widest">{isPinVisible ? savedPin : "••••"}</span>
                            <div className="flex gap-3">
                                <button onClick={() => setIsPinVisible(!isPinVisible)} className="text-gray-600">
                                    {isPinVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                <button onClick={handleDeletePin} className="text-red-500">
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No PIN set</p>
                    )}
                </div>
            </div>
        </div>
    );
}

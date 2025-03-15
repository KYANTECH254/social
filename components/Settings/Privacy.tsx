"use client";

import { useState, useEffect } from "react";
import Back from "../Buttons/Back";
import Toggle from "../Buttons/Toggle";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Privacy() {
    const [hideLastSeen, setHideLastSeen] = useState(false);

    // Load preference from localStorage on mount
    useEffect(() => {
        const storedPreference = localStorage.getItem("hideLastSeen");
        if (storedPreference !== null) {
            setHideLastSeen(JSON.parse(storedPreference));
        }
    }, []);

    // Update localStorage when the toggle changes
    const handleToggleChange = () => {
        setHideLastSeen((prev) => {
            const newState = !prev;
            localStorage.setItem("hideLastSeen", JSON.stringify(newState));
            return newState;
        });
    };

    return (
        <>
            <div className="first-container">
                <Back title="Privacy" />

                <div className="privacy-settings flex flex-col">
                    <Link href="/settings/privacy/blocked-accounts">
                        <div className="flex flex-row justify-between items-center p-4 settings-cards">
                            <h2 className="text-lg">Blocked Accounts</h2>
                            <span className="flex items-center justify-center text-center font-bold w-8 h-8 rounded-full bg-blue-500 text-[var(--main-text-color)]">4</span>
                        </div>
                    </Link>
                    <Link href="/settings/privacy/profile-picture">
                        <div className="flex flex-row justify-between items-center p-4 settings-cards">
                            <h2 className="text-lg">Choose who to see your Profile picture </h2>
                            <ArrowRight size={24} />
                        </div>
                    </Link>
                    <Link href="/settings/privacy/status-contacts">
                        <div className="flex flex-row justify-between items-center p-4 settings-cards">
                            <h2 className="text-lg">Choose who to view your Status</h2>
                            <ArrowRight size={24} />
                        </div>
                    </Link>
                    <div className="flex flex-row justify-between items-center p-4 settings-cards">
                        <h2 className="text-lg">Hide last seen</h2>
                        <Toggle isChecked={hideLastSeen} handleOnchange={handleToggleChange} isDisabled={false} />
                    </div>
                    <Link href="/settings/privacy/chat-lock">
                        <div className="flex flex-row justify-between items-center p-4 settings-cards">
                            <h2 className="text-lg">Chat lock</h2>
                            <ArrowRight size={24} />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

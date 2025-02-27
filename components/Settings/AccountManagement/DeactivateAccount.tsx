"use client"
import { CircleOffIcon } from "lucide-react";
import { useState } from "react";

export default function DeactivateAccount({ isDeactivated, setIsDeactivated }: any) {
    const [password, setPassword] = useState<string>();

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleDeactivate = () => {
        setIsDeactivated(false);
    }

    return (
        <>
            <div className="flex flex-col p-3">
                <h2 className="text-xl font-bold">Confirm your account deactivation!</h2>
                <p>
                    By deactivating your account you will be unable to access it.
                    You profile will be invisible to your contacts and others.
                    But you can always reactivate your account. Are you sure you want to deactivate your account?
                </p>

                <div className="flex flex-col gap-3 pt-3">
                    <label htmlFor="password" className="pt-3 font-bold text-lg">Enter you account password to continue</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        maxLength={64}
                        placeholder="Enter password"
                        className="text-center text-lg tracking-widest py-2 border rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)]"
                    />
                    <button
                        onClick={handleDeactivate}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-red-600 text-[var(--main-text-color)] rounded-md shadow-lg hover:bg-red-700 transition-all"
                    >
                        <CircleOffIcon size={20} />
                        Confirm Account Deactivation
                    </button>
                </div>

            </div>
        </>
    )
}
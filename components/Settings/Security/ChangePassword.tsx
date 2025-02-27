"use client";

import Back from "@/components/Buttons/Back";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [showpassword, setShowPassword] = useState(false)

    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleDeactivate = () => {
        return null;
    };

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <>
            <Back title="Change Password" />

            <div className="flex flex-col p-3">
                <h2 className="text-xl font-bold">Change your account password!</h2>

                <div className="flex flex-col gap-3 pt-3">
                    <label htmlFor="currentpassword" className="pt-3 font-semibold text-lg">
                        Enter your current account password
                    </label>
                    <div className="flex flex-row items-center justify-between relative">
                        <input
                            type={showpassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            maxLength={64}
                            placeholder="Enter current password"
                            className="text-center text-lg tracking-widest py-2 border rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)]"
                        />
                        {showpassword ? <Eye className="absolute right-5" size={24} onClick={handleShowPassword}/> : <EyeClosed className="absolute right-5" size={24} onClick={handleShowPassword}/>}
                    </div>


                    <label htmlFor="password" className="pt-3 font-semibold text-lg">
                        Enter your new account password
                    </label>
                    <input
                        type={showpassword ? "text" : "password"}
                        value={password}
                        onChange={handleNewPasswordChange}
                        maxLength={64}
                        placeholder="Enter new password"
                        className="text-center text-lg tracking-widest py-2 border rounded-md w-full bg-[var(--main-background-color)] text-[var(--main-text-color)]"
                    />

                    <button
                        onClick={handleDeactivate}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-[var(--main-text-color)] rounded-md shadow-lg hover:bg-blue-700 transition-all"
                    >
                        Confirm Password Change
                    </button>
                </div>
            </div>
        </>
    );
}

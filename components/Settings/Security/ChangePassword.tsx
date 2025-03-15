"use client";

import Back from "@/components/Buttons/Back";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
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
                <div className="flex flex-col gap-3">
                    <label htmlFor="currentpassword" className="pt-3 text-lg">
                        Enter your current account password
                    </label>
                    <div className="flex flex-row items-center justify-between relative">
                        <Input placeholder="Enter current password" maxLength={64} type={showpassword ? "text" : "password"} value={currentPassword} onChange={handleCurrentPasswordChange} />.
                        {showpassword ? <Eye className="absolute right-5" size={24} onClick={handleShowPassword} /> : <EyeClosed className="absolute right-5" size={24} onClick={handleShowPassword} />}
                    </div>
                    <label htmlFor="password" className="pt-3 text-lg">
                        Enter your new account password
                    </label>
                    <Input placeholder="Enter new password" maxLength={64} type={showpassword ? "text" : "password"} value={password} onChange={handleNewPasswordChange} />
                    <Button text=" Confirm Password Change" icon={null} onClick={handleDeactivate} />
                </div>
            </div>
        </>
    );
}

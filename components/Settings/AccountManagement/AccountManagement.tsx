"use client";

import { useState } from "react";
import Back from "../../Buttons/Back";
import { Power, Trash2 } from "lucide-react";
import DeleteAccount from "./DeleteAccount";
import DeactivateAccount from "./DeactivateAccount";
import Button from "@/components/Buttons/Button";

export default function AccountManagement() {
    const [isDeactivated, setIsDeactivated] = useState(false);
    const [isDeleteAccount, setDeleteAccount] = useState(false);

    const handleDeactivate = () => {
        setIsDeactivated(true);
    };

    const handleDelete = () => {
        setDeleteAccount(true);
    };

    return (
        <div className="first-container">
            <Back title="Account Management" />

            {!isDeactivated && !isDeleteAccount && (
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-[var(--main-background-color)] text-[var(--main-text-color)] p-6 rounded-2xl max-w-sm mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Manage Your Account</h2>
                    <p className="text-sm text-center mb-4">
                        You can choose to temporarily deactivate your account or permanently delete it.
                    </p>
                    <div className="flex flex-col w-full gap-2">
                        <Button text={isDeactivated ? "Account Deactivated" : "Deactivate Account"} icon={Power} onClick={handleDeactivate} />
                    <Button text="Delete Account" icon={Trash2} onClick={handleDelete} />
                    </div>
                    
                </div>
            )}
            {isDeactivated && (<DeactivateAccount isDeactivated={isDeactivated} setIsDeactivated={setIsDeactivated} />)}
            {isDeleteAccount && (<DeleteAccount isDeactivated={isDeactivated} setIsDeactivated={setIsDeactivated} />)}
        </div>
    );
}

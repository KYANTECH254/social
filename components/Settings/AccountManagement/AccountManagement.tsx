"use client";

import { useState } from "react";
import Back from "../../Buttons/Back";
import { Power, Trash2 } from "lucide-react";
import DeleteAccount from "./DeleteAccount";
import DeactivateAccount from "./DeactivateAccount";

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
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-[var(--main-background-color)] text-[var(--main-text-color)] shadow-lg p-6 rounded-2xl max-w-sm mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Manage Your Account</h2>
                    <p className="text-sm text-center mb-4">
                        You can choose to temporarily deactivate your account or permanently delete it.
                    </p>

                    <button
                        onClick={handleDeactivate}
                        className={`flex items-center justify-center gap-2 w-full py-2 ${isDeactivated ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                            } text-[var(--main-text-color)] rounded-md shadow-lg transition-all mb-3`}
                    >
                        <Power size={20} />
                        {isDeactivated ? "Account Deactivated" : "Deactivate Account"}
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-red-600 text-[var(--main-text-color)] rounded-md shadow-lg hover:bg-red-700 transition-all"
                    >
                        <Trash2 size={20} />
                        Delete Account
                    </button>
                </div>
            )}


            {isDeactivated && (<DeactivateAccount isDeactivated={isDeactivated}/>)}
            {isDeleteAccount && (<DeleteAccount />)}

        </div>
    );
}

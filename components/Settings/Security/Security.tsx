"use client"
import Back from "@/components/Buttons/Back";
import Toggle from "@/components/Buttons/Toggle";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ChangePassword from "./ChangePassword";

export default function Security() {
    const [twofaauth, setTwoFaAuth] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const handleOnchange = () => {
        setTwoFaAuth((prev) => !prev)
    }

    return (
        <>
            <div className="first-container">
                {!isChangePassword && (
                    <>
                        <Back title="Security" />
                        <div className="privacy-settings flex flex-col">

                            <div
                                onClick={() => setIsChangePassword(true)}
                                className="flex flex-row justify-between items-center p-4 settings-cards">
                                <h2 className="text-lg">Change Account Password </h2>
                                <ArrowRight size={24} />
                            </div>
                            <div className="flex flex-row justify-between items-center p-4 settings-cards">
                                <h2 className="text-lg">Enable Two Factor Authentication</h2>
                                <Toggle isChecked={twofaauth} handleOnchange={handleOnchange} isDisabled={false} />
                            </div>
                        </div>
                    </>
                )}
                {isChangePassword && (<ChangePassword />)}

            </div>
        </>
    )
}
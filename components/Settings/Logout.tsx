"use client";

import { useSession } from "@/contexts/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { ArrowLeft } from "lucide-react";
import Back from "../Buttons/Back";

export default function LogOut() {
    const { logOut } = useSession();
    const router = useRouter();

    const [error, setError] = useState(false);
    const handleLogout = () => {
        logOut();
        router.push('/auth')
    }

    if (error) {
        setError(true)
    }

    return (
        <>
            <Back title="Logout" />
            <div className="p-3">
                <h1 className="text-lg">Are you sure you want to logout? By logging out, all sessions for this device will be deleted!</h1>
                <Button icon={ArrowLeft} text="Logout" onClick={() => handleLogout()} className="mt-4 justify-center" />
            </div>
        </>

    )
}
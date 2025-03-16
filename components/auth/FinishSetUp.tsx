"use client";
import { cache, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import { toast } from "sonner";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Logo from "./Logo";
import SpinLoader from "../SpinLoader";
import { useSession } from "@/contexts/SessionProvider";
import { isValidDOB } from "@/lib/Functions";

export default function FinishSetup() {
    const router = useRouter();
    const { setSession } = useSession();

    const [user, setUser] = useState<any>(null);
    const [dob, setDob] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("settingupaccountdata");

        if (!storedUser) {
            toast.error("Missing user details");
            router.push("/auth");
            return;
        }

        try {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } catch {
            toast.error("Invalid user data");
            router.push("/auth");
        }
    }, [router]);

    useEffect(() => {
        setIsDisabled(!user || !username.trim() || !dob || usernameAvailable === false);
    }, [user, dob, username, usernameAvailable]);

    const checkUsername = cache(async (inputUsername: string) => {
        if (!inputUsername.trim()) {
            setUsernameAvailable(null);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/check/username`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: inputUsername }),
            });

            const data = await response.json();
            setUsernameAvailable(data.success);
        } catch {
            setUsernameAvailable(null);
        }
    })

    const handleFinish = cache(async () => {
        if (!isValidDOB(dob)) {
            toast.error("You must be at least 13 years old.");
            return;
        }
        if (!username.trim()) {
            toast.error("Username cannot be empty.");
            return;
        }
        if (usernameAvailable === false) {
            toast.error("Username is already taken.");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/account`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...user, dob, username }),
            });

            const data = await response.json();

            if (data.success) {
                sessionStorage.removeItem("settingupaccountdata");
                setSession({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: data.user,
                });

                toast.success(data.message);
                router.push("/");
            } else {
                toast.error(data.message || "Failed to update");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    })

    if (loading) {
        return <SpinLoader type="fullpage-no-logo" />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-5">
            <Logo />
            <h1 className="text-xl font-semibold text-[var(--main-text-color)] text-center">
                Complete Your Setup, {user?.name}!
            </h1>
            <div className="mt-6 w-full max-w-sm">
                <div className="mb-3 flex flex-col gap-2 relative">
                    <label className="text-[var(--main-color)] font-semibold">Username</label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value);
                            checkUsername(e.target.value);
                        }}
                        placeholder="Choose username"
                    />
                    {username && (
                        <div className="absolute right-3 top-11">
                            {usernameAvailable === true ? (
                                <CheckCircle className="text-green-500" size={20} />
                            ) : usernameAvailable === false ? (
                                <XCircle className="text-red-500" size={20} />
                            ) : null}
                        </div>
                    )}
                </div>

                <div className="mb-3 flex flex-col gap-2">
                    <label className="text-[var(--main-color)] font-semibold">Date of Birth</label>
                    <Input
                        type="date"
                        value={dob}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
                    />
                </div>

                <Button
                    disabled={isDisabled}
                    text="Finish"
                    icon={ArrowRight}
                    onClick={handleFinish}
                    className="justify-center"
                />
            </div>
        </div>
    );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import { toast } from "sonner";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Logo from "./Logo";
import SpinLoader from "../SpinLoader";

export default function FinishSetup() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [dob, setDob] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(null);

    useEffect(() => {
        const userParam = searchParams.get("user");

        if (!userParam) {
            toast.error("Missing user details");
            router.push("/auth");
            return;
        }

        try {
            const parsedUser = JSON.parse(decodeURIComponent(userParam));
            setUser(parsedUser);
            setLoading(false);
        } catch {
            toast.error("Invalid user data");
            router.push("/auth");
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (!user || !username.trim() || !dob || usernameAvailable === false) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [user, dob, username, usernameAvailable]);

    const checkUsername = async (inputUsername: string) => {
        if (!inputUsername.trim()) {
            setUsernameAvailable(null);
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3001/api/check/username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: inputUsername }),
            });
    
            const data = await response.json();
            setUsernameAvailable(data.success);
        } catch {
            setUsernameAvailable(null);
        }
    };
    
    const isValidDOB = () => {
        if (!dob) return false;
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
        return age > 13 || (age === 13 && isBirthdayPassed);
    };

    const handleFinish = async () => {
        if (!isValidDOB()) {
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
            const response = await fetch("http://localhost:3001/api/auth/updateUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...user, dob, username }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Setup completed successfully!");
                router.push("/dashboard");
            } else {
                toast.error(data.message || "Failed to update");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (loading) {
        return <SpinLoader />;
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

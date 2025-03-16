"use client";
import { cache, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { toast } from "sonner";
import ErrorComponent from "./Error";
import { useSession } from "@/contexts/SessionProvider";
import SpinLoader from "../SpinLoader";

export default function GoogleCallback() {
    const searchParams = useSearchParams();
    const { setSession } = useSession();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const code = searchParams.get("code");
        const storedUser = sessionStorage.getItem("settingupaccountdata");

        if (!code && !storedUser) {
            setError("No authorization code found or session expired.");
            setLoading(false);
            return;
        }

        if (!code && storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
            return;
        }

        if (code) {
            const fetchGoogleUser = cache(async () => {
                try {
                    const response = await fetch("http://localhost:3001/api/auth/google", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code }),
                    });
                    const data = await response.json();
                    if (!data.success) {
                        setError(data.message || "Failed to authenticate user");
                    } else if (data.loggedin) {
                        setSession({
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                            user: data.user,
                        });
                        toast.success(data.message);
                        router.push("/");
                    } else if (data.loggedin === false) {
                        sessionStorage.setItem("settingupaccountdata", JSON.stringify(data.user));
                        setUser(data.user);
                        const newUrl = new URL(window.location.href);
                        newUrl.searchParams.delete("code");
                        router.replace(newUrl.toString(), { scroll: false });
                    }
                } catch {
                    setError("Failed to authenticate user");
                } finally {
                    setLoading(false);
                }
            })
            fetchGoogleUser();
        }
    }, [searchParams]);
    if (loading) return <SpinLoader type="fullpage-no-logo" />;
    if (error) return <ErrorComponent error={error} />;
    if (!user) return null;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-5">
            <Logo />
            {user.verifiedEmail === false ? (
                <h1 className="text-red-500 mt-2 font-bold text-center">
                    Your email is not verified. Please verify your Google email to continue.
                </h1>
            ) : (
                <>
                    <h1 className="text-xl font-semibold text-[var(--main-text-color)] text-center">
                        Welcome, {user.name}!
                    </h1>
                    <img
                        src={user.avatar}
                        alt={user.name}
                        title={user.name}
                        className="w-24 h-24 rounded-full mt-4 border-2 border-[var(--main-text-color)]"
                    />
                    <div className="mt-6 w-full max-w-sm">
                        <div className="mb-3 flex flex-col gap-2">
                            <label className="text-[var(--main-color)] font-semibold">Full Name</label>
                            <Input type="text" value={user.name} readOnly />
                        </div>

                        <div className="mb-3 flex flex-col gap-2">
                            <label className="text-[var(--main-color)] font-semibold">Email</label>
                            <Input type="text" value={user.email} readOnly />
                        </div>

                        <Button
                            text="Next"
                            icon={ArrowRight}
                            onClick={() => router.push("/auth/finish-setup")}
                            className="justify-center"
                        />
                    </div>
                </>
            )}
        </div>
    );
}

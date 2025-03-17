"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode, cache } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    googleId: string;
    username: string;
    dob: string;
    verifiedEmail: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Session {
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface SessionContextType {
    session: Session | null;
    setSession: (session: Session | null) => Promise<void>;
    logOut: () => void;
}

const SessionContext = createContext<SessionContextType>({
    session: null,
    setSession: async () => { },
    logOut: async () => { }
});

interface Props {
    children: ReactNode;
}

export const SessionProvider: React.FC<Props> = ({ children }) => {
    const [session, setSessionState] = useState<Session | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadSession = cache(async () => {
            try {
                const res = await fetch("/api/session");
                const data = await res.json();
                setSessionState(data.session);
            } catch (err) {
                console.error("Failed to load session:", err);
            }
        })
        loadSession();
    }, []);

    const setSession = cache(async (newSession: Session | null) => {
        const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSession),
        });
        setSessionState(newSession);
        const result = await res.json();
        if (result.success) {
            setSessionState(newSession);
            router.push("/");
        } else {
            console.error("Failed to set session");
        }
    });

    const logOut = cache(async () => {
        const res = await fetch("/api/session");
        const result = await res.json();
        if (result.success) {
            const data = {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const response = await res.json();
            if (response) {
                if (response.success) {
                    const logoutres = await fetch("/api/logout", {
                        method: "POST",
                    })
                    const logoutresponse = await logoutres.json();
                    if (!logoutresponse.success) {
                        return toast.error(logoutresponse.message);
                    }
                    toast.success(response.message);
                } else if (!response.success) {
                    toast.error(response.message);
                }
            }
            setSession(null);
            router.push("/");
        } else {
            toast.success("Failed to logout");
        }
    })

    return (
        <SessionContext.Provider value={{ session, setSession, logOut }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

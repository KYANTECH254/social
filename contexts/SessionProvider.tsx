"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode, cache } from "react";
import { useRouter } from "next/navigation";

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
}

const SessionContext = createContext<SessionContextType>({
    session: null,
    setSession: async () => { },
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

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

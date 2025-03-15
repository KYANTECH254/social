"use client";
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import Cookies from "js-cookie";

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
    setSession: Dispatch<SetStateAction<Session | null>>;
}

const SessionContext = createContext<SessionContextType>({
    session: null,
    setSession: () => null,
});

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    // Load session from cookies on initial mount
    useEffect(() => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");
        const user = Cookies.get("user");

        if (accessToken && refreshToken && user) {
            try {
                const parsedUser: User = JSON.parse(user);
                console.log(parsedUser);
                
                setSession({ accessToken, refreshToken, user: parsedUser });
            } catch (error) {
                console.error("Error parsing user data from cookies:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (session) {
            Cookies.set("accessToken", session.accessToken, { expires: 1 });
            Cookies.set("refreshToken", session.refreshToken, { expires: 7 });
            Cookies.set("user", JSON.stringify(session.user), { expires: 7 });
        }
    }, [session]);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

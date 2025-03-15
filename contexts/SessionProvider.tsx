"use client";
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import Cookies from "js-cookie";

interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
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

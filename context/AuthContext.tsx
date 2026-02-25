"use client";

import { getUserFromLocalstorage, removeToken, removeUserFromLocalstorage, setToken, setUserInLocalstorage } from "@/helper/localStorage";
import { get } from "http";
import {
    createContext,
    useContext,

    useState,
    ReactNode,
    useEffect,
} from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
    [key: string]: unknown;
}

interface AuthContextType {
    user: User | null;
    saveUserToContext: (user: User) => void;
    removeUserFromContext: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const storedUser = getUserFromLocalstorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    function saveUserToContext(user: User) {
        setUser(user);
        setToken(user.token);
        setUserInLocalstorage(user)

    }
    function removeUserFromContext() {
        console.log('Removing user from context');
        setUser(null);
        removeUserFromLocalstorage();
        removeToken();

    }




    return (
        <AuthContext.Provider value={{ user, saveUserToContext, removeUserFromContext } as AuthContextType}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
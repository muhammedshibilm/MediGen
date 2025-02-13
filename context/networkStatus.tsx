"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface NetworkType {
    isOnline: boolean;
}

const NetworkContext = createContext<NetworkType | undefined>(undefined);

export const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    const updateNetworkStatus = () => {
        const status = navigator.onLine;
        setIsOnline(status);

        toast.info(status ? "You're back online!" : "You're offline now", {
            duration: 3000,
        });
    };

    useEffect(() => {
        window.addEventListener("offline", updateNetworkStatus);
        window.addEventListener("online", updateNetworkStatus);

        return () => {
            window.removeEventListener("offline", updateNetworkStatus);
            window.removeEventListener("online", updateNetworkStatus);
        };
    }, []);

    return (
        <NetworkContext.Provider value={{ isOnline }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetworkStatus = () => {
    const context = useContext(NetworkContext);

    if (!context) {
        throw new Error("useNetworkStatus must be used within a NetworkStatusProvider");
    }

    return context;
};
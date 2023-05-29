import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { authToken, getUserLocalData } from "../controllers/user.controller";
import { IKeys, IUser, IUserResponse } from "../interfaces";
import { Users } from "../interfaces/user.interface";
import { decryptData } from "../services/subtle/rsa.service";
import apiClient, { clearAuthToken, setAuthToken } from "../services/apiClient.service";
import { useNavigate } from "react-router";

export const UserContext = React.createContext<IUserResponse.Context>({ user: null, setUser: null });

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser.User | null>(null);
    const [showContent, setShowContent] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const { token, fingerprint, keys } = getUserLocalData();
        if (token == null || keys == null) {
            setShowContent(true);
            return;
        }

        authToken(token).then((res) => {
            setUser({ ...res.data, token, keys, fingerprint, immediate: true });
        }).catch((err) => {
            console.error(`Your previous session has been expired!`);
        })
    }, [])

    const navigateVerify = () => {
        // navigate(`/elections`)
    }

    useEffect(() => {
        if (showContent) navigateVerify();
    }, [showContent]);

    useEffect(() => {
        if (!user || !user?.token || !user?.keys || !user?.keys?.publicKey || !user?.keys?.privateKey) {
            clearAuthToken();
            localStorage.removeItem(`token`)
            localStorage.removeItem(`fingerprint`)
            localStorage.removeItem(`keys`)
            // setShowContent(true);
            return;
        }
        const { token: encryptedToken, keys, immediate, fingerprint } = user;

        if (immediate) {
            localStorage.setItem(`token`, encryptedToken);
            setAuthToken(encryptedToken);
            if (fingerprint) localStorage.setItem(`fingerprint`, fingerprint);
            localStorage.setItem(`keys`, JSON.stringify(keys));
            setShowContent(true);
            if (user != null) navigateVerify();
            return;
        }
        decryptData(encryptedToken, keys.privateKey).then((res) => {
            localStorage.setItem(`token`, res);
            setAuthToken(res);
            if (keys) localStorage.setItem(`keys`, JSON.stringify(keys));
            if (fingerprint) localStorage.setItem(`fingerprint`, fingerprint);
            setShowContent(true);
            if (user != null) navigateVerify();
        }).catch((err: any) => {
            setShowContent(true);
            if (user != null) navigateVerify();
            setUser(null)
        })
        if (user != null) navigateVerify();
    }, [user])

    return <UserContext.Provider value={{ user, setUser }}>
        {showContent && children}
    </UserContext.Provider>
}

export default UserProvider;
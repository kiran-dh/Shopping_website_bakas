import { createContext, useContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(
            auth,
            (currentUser)=>{
                setUser(currentUser)
            }
        )
        return ()=>unsubscribe();
    },[])

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        
        try {
            const result = await signInWithPopup(
                auth,
                provider
            );

            setUser(result.user);

            const idToken = await result.user.getIdToken();
            
            const response = await fetch("http://localhost:5000/api/orders/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            console.log(await response.json());

        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        await signOut(auth);

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loginWithGoogle,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from '../lib/firebase'
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
} from 'firebase/auth'

export const AuthContext = createContext({} as AuthContextProps)

type AuthContextProps = {
    user: User | null,
    signInWithGoogle: () => void,
    signOut: () => void,
}

type User = {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
}

type AuthProviderProps = {
    children: ReactNode,
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                })
                return
            }
    
            setUser(null)
        })

        return () => unsubscribe()
    }, [])

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            
        } catch (err) {
            console.error('Error on Google Auth: ', err)
        }
    }

    async function signOut() {
        try {
            await firebaseSignOut(auth)
        } catch (err) {
            console.error('Error signing out: ', err)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signInWithGoogle,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
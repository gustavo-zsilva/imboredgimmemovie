import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from '../lib/firebase'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export const AuthContext = createContext({} as AuthContextProps)

type AuthContextProps = {
    user: User | null,
    signInWithGoogle: () => void,
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
            console.log('TRIGGERED')
            if (user) {
                setUser({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                })
                console.log('Yessir')
                return
            }
    
            setUser(null)
        })

        return () => unsubscribe()
    }, [])

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            console.log('Google user: ', result.user)
            
        } catch (err) {
            console.error('Error on Google Auth: ', err)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signInWithGoogle,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
import { useState, useEffect, createContext } from 'react'
import { auth } from '../../firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()


export function AuthProvider({ children }) {

    const [user, setUser] = useState(undefined)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)  //quando a resposta chega, o loading acaba
        })

        return () => unsubscribe()
    }, [])

  return (
    <AuthContext.Provider value={{ user, loading}}>
        {children}
    </AuthContext.Provider>
  )

}



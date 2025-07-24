//Hook utilizado para criar usuário, funcionalidade de login e funcionalidade de logout.

import { useRef } from "react"
import { db } from "../firebase/firestore"
import { auth } from "../firebase/auth"

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // Cleanup - deal with memory leak
    const isCancelled = useRef(false)

    useEffect(() => {
        isCancelled.current = false   //reseta a flag toda vez que o componente é montado

        return () => {
            console.log("Hook desmontado")
            isCancelled.current = true
        }
    }, [])

    // Função de REGISTRO de usuário
    const createUser = async (data) => {
        if (isCancelled.current) {
            console.log("Função cancelada!")
            return
        }
        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, { displayName: data.displayName })

            //Checagem se o componente não foi desmontado antes de atualizar os states (se repete várias vezes ao longo do código, em cada atualização de state)
            if (!isCancelled.current) {  
                setLoading(false)
            }

            return user
            
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."

            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."

            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            if (!isCancelled.current) {
                setError(systemErrorMessage)
            }

        } finally {
            if (!isCancelled.current) {
                setLoading(false)
            }
        }
    }

    //Função de LOGOUT - Sign Out
    const logout = () => {
        signOut(auth)
    }

    //Função de LOGIN - Sign in
    const login = async (data) => {
        if (isCancelled.current) {
            console.log("Função cancelada!")
            return
        }
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            if (!isCancelled.current) {
                setLoading(false)
            }
            
        } catch (error) {
            let systemErrorMessage
            console.log(error)

            if (error.message.includes("invalid-credential")) {
                systemErrorMessage = "Usuário ou senha incorretos"
            } else {
                systemErrorMessage =
                    "Ocorreu um erro, por favor tente mais tarde"
            }

            if (!isCancelled.current) {
                setError(systemErrorMessage)
            }

        } finally {
            if (!isCancelled.current) {
                setLoading(false)
            }
        }
    }

    return {
        auth,
        createUser,
        error,
        logout,
        login,
        loading,
    }
}

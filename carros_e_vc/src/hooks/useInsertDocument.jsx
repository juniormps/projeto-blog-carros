//Hook utilizado para a inserção de um post no db

import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/firestore"
import { collection, addDoc, Timestamp } from "firebase/firestore"


export const useInsertDocument = (docCollection) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // deal with memory leak
    const isCancelled = useRef(false)

    useEffect(() => {
        isCancelled.current = false   //reseta a flag toda vez que o componente é montado

        return () => {
            console.log("Hook desmontado")
            isCancelled.current = true
        }
    }, [])
    

    const insertDocument = async (document) => {
        if (isCancelled.current) {
            console.log("Função cancelada!")
            return
        }
        setLoading(true)
        setError(null)

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() }

            await addDoc (collection (db, docCollection), newDocument)

        } catch (error) {
            if (!isCancelled.current) {
                setError(error.message)
            }

        } finally {
            if (!isCancelled.current) {
                setLoading(false)
            }
        }

    }

    return { insertDocument, loading, error }
}
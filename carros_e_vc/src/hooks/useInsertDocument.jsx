import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/firestore"
import { collection, addDoc, Timestamp } from "firebase/firestore"


export const useInsertDocument = (docCollection) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // deal with memory leak
    const isCancelled = useRef(false)

    useEffect(() => {
        return () => {
            isCancelled.current = true
        }
    }, [])
    

    const insertDocument = async (document) => {
        setLoading(true)
        setError(null)

        try {

            const newDocument = { ...document, createdAt: Timestamp.now() }

            await addDoc (collection (db, docCollection), newDocument)

            if (!isCancelled.current) {
                setLoading(false)
            }

        } catch (error) {

            if (!isCancelled.current) {
                setError(error.message)
                setLoading(false)
            }
            
        }
    }

    return { insertDocument, loading, error }
}
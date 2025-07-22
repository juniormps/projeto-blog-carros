//Hook utilizado para buscar e fornecer um post em específico para a página Post (que mostra cada post individualmente)

import { useState, useEffect } from "react"
import { db } from "../firebase/firestore"
import { doc, getDoc } from "firebase/firestore"


export const useFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)


    useEffect(() => {

        const loadDocument = async () => {
            if (cancelled) return

            setLoading(true)

            try {
                const docRef = doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())

            } catch (error) {
                console.log(error)
                setError(error.message)
           
            } finally {
                setLoading(false)
            }

        }

        loadDocument()

    }, [docCollection, id])


    useEffect(() => {

        return () => setCancelled(true)

    }, [])


    return { document, loading, error }

}
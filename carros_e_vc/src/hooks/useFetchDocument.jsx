//Hook utilizado para buscar e fornecer um post em específico para a página Post (que mostra cada post individualmente)

import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/firestore"
import { doc, getDoc } from "firebase/firestore"


export const useFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState(null)
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

    useEffect(() => {

        const loadDocument = async () => {
            if (isCancelled.current) {
                console.log("Função cancelada!")
                return
            }

            setLoading(true)
            setError(null)

            try {
                const docRef = doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                if (!isCancelled.current) {  
                    setDocument(docSnap.data())
                }

            } catch (error) {
                console.log(error)
                if (!isCancelled.current) {  
                    setError(error.message)
                }
    
            } finally {
                if (!isCancelled.current) {  
                    setLoading(false)
                }
            }

        }

        loadDocument()

    }, [docCollection, id])

    return { document, loading, error }
}
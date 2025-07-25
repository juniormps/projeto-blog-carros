//Hook utilizado para deletar um post

import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/firestore"
import { doc, deleteDoc } from "firebase/firestore"


export const useDeleteDocument = (docCollection) => {
    
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const isCancelled = useRef(false)

    useEffect(() => {
        isCancelled.current = false   //reseta a flag toda vez que o componente é montado

        return () => {
            console.log("Hook desmontado")
            isCancelled.current = true
        }
    }, [])
    

    const deleteDocument = async (id) => {
        if (isCancelled.current) {
            console.log("Função cancelada!")
            return
        }

        setLoading(true)
    
        try {
            await deleteDoc(doc(db, docCollection, id))
            console.log(`Post com ID ${id} foi deletado com sucesso!`)

        } catch (error) {
            console.log("Erro ao deletar:", error.message)
            throw new Error(error.message)

        } finally {
            if (!isCancelled.current) {
                setLoading(false)
            }
        }

    }

    return { deleteDocument, loading }
}
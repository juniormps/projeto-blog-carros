import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/firestore"
import { doc, deleteDoc } from "firebase/firestore"


export const useDeleteDocument = (docCollection) => {
    
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const isCancelled = useRef(false)

    /*
    Trecho comentado pelo seguinte motivo: o componente Dashboard está sendo montado e desmontado imediatamente após o carregamento por conta do StrictMode no main.jsx. Isso faz com que a flag "isCancelled.current" receba o valor "true" logo no início da execução de deleteDocument, fazendo com que a exclusão de post seja cancelada antes mesmo de tentar executar.
    Obs.: em produção, o trecho deve ser descomentado.

    useEffect(() => {
        return () => {
            console.log("Hook desmontado")
            isCancelled.current = true
        }
    }, [])
    */

    const deleteDocument = async (id) => {
        if (isCancelled.current) {
            console.log("Função cancelada!")
            return
        }

        setLoading(true)
        setError(null)
    
        try {
            await deleteDoc(doc(db, docCollection, id))
            console.log(`Post com ID ${id} foi deletado com sucesso!`)

        } catch (error) {
            console.log("Erro ao deletar:", error.message)
            if (!isCancelled.current) {
                setError(error.message)
            }

        } finally {
            if (!isCancelled.current) {
                setLoading(false)
            }
        }

    }

    return { deleteDocument, loading, error }
}
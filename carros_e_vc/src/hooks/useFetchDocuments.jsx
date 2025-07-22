//Hook utilizado para a listagem dos posts na Home, para a funcionalidade de busca e para a funcionalidade de dashboard.git 

import { useState, useEffect } from "react"
import { db } from "../firebase/firestore"
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore"


export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)


    useEffect(() => {

        const loadData = async () => {
            if (cancelled) return

            setLoading(true)

            //Pega a coleção que está no db
            const collectionRef = collection(db, docCollection)

            try {
                let q 

                //Monta as consultas
                if (search) {               //busca
                    q = query(
                        collectionRef, 
                        where("tagsArray", "array-contains", search), 
                        orderBy("createdAt", "desc")
                    )
                    
                } else if (uid) {           //dashboard
                    q = query(
                        collectionRef, 
                        where("uid", "==", uid), 
                        orderBy("createdAt", "desc")
                    )

                } else {                    //listagem dos posts na Home
                    q = query(
                        collectionRef, 
                        orderBy("createdAt", "desc")
                    )
                }

                //Faz a consulta e retorna os docs encontrados
                onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

            } catch (error) {

                console.log(error)
                setError(error.message)  
                
            } finally {
                setLoading(false)

            }

        }

        loadData()

    }, [docCollection, search, uid, cancelled])


    useEffect(() => {

        return () => setCancelled(true)

    }, [])


    return { documents, loading, error }



}
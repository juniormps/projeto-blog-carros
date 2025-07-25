import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

//Hooks
import { useAuthContext } from "../../context/authContext/useAuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from "../../hooks/useDeleteDocument"


const Dashboard = () => {

    const { user } = useAuthContext()
    const uid = user.uid

    const { documents: posts, loading } = useFetchDocuments("posts", null, uid)
    const { deleteDocument } = useDeleteDocument("posts")

    const [deletedId, setDeletedId] = useState(null)  //estado para setar um post como deletado e deixar de exibi-lo no dashboard

    useEffect(() => {
        console.log("Dashboard montado")
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteDocument(id)
            setDeletedId(id)   
        } catch (error) {
            alert("Erro ao excluir o post: " + error.message)
        }
    }
    
    if (loading) {
        return <p>Carregando...</p>
    }

    const visiblePosts = posts?.filter(post => post.id !== deletedId)

  return (

    <div className={styles.dashboard}>
        <h2>Dashboard</h2>

        <p>Gerencie os seus posts</p>

        {visiblePosts && visiblePosts.length === 0 ? (
            <div className={styles.noposts}>
                <p>Não foram encontrados posts</p>
                <Link to="/posts/create" className="btn">Criar primeiro post</Link>
            </div>
            ) : (
            <div className={styles.post_header}>
                <span>Título</span>
                <span>Ações</span>
            </div>
        )}

        {visiblePosts && visiblePosts.map((post) => (
            <div className={styles.post_row} key={post.id}>

                <p>{post.title}</p>

                <div className={styles.actions}>

                    <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>

                    <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>

                    <button onClick={() => handleDelete(post.id)} className="btn btn-outline btn-danger">
                        Excluir
                    </button>
                </div>
            </div>
        ))}

    </div>

  )
}

export default Dashboard
//CSS
import styles from "./Home.module.css"

//Hooks
import { Link } from 'react-router-dom'
import { useFetchDocuments } from "../../hooks/useFetchDocuments"

//Components
import PostDetail from "../../components/PostDetail"
import SearchBar from "../../components/SearchBar"


const Home = () => {

    const { documents: posts, loading } = useFetchDocuments("posts")
    
  return (

    <div className={styles.home}>
        <h1>Veja os nossos posts mais recentes</h1>

        <SearchBar />

        <div>
            {loading && <p>Carregando...</p> }

            {posts && posts.map((post) => <PostDetail key={post.id} post={post}/> )}

            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts</p>
                    <Link to="/posts/create" className="btn">Criar primeiro post</Link>
                </div>
            )}

        </div>
    </div>

  )
}

export default Home
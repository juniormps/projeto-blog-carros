import styles from './CreatePost.module.css'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import { useAuthContext } from "../../context/authContext/useAuthContext"


const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    const { user } = useAuthContext()
    const navigate = useNavigate()

    const { insertDocument, loading, error } = useInsertDocument("posts")

    

    const handleSubmit = (e) => {
        e.preventDefault()

        // valida se a imagem é uma URL
        try {
            new URL(image)

        } catch (error) {
            setFormError("A imagem precisa ser uma URL válida.")
            return
        }

        // check values
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!")
            return
        }

        if (formError) {
            return
        } 

        // create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // redirect to home page
        if (!error) navigate("/");

    }



  return (

    <div className={styles.create_post}>
        <h2>Criar post</h2>

        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>

        <form onSubmit={handleSubmit}>

            <label>
                <span>Título:</span>
                <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder='E-mail do Pense num bom título...' 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </label>

            <label>
                <span>URL da imagem:</span>
                <input 
                    type="text" 
                    name='image' 
                    required 
                    placeholder='Insira uma imagem que representa seu post...' 
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                />
            </label>

            <label>
                <span>Conteúdo:</span>
                <textarea 
                    name='body' 
                    required 
                    placeholder='Insira o conteúdo do post' 
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                ></textarea>
            </label>

            <label>
                <span>Tags:</span>
                <input 
                    type="text" 
                    name='tegs' 
                    required 
                    placeholder='Insira as tags separadas por vírgula' 
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                />
            </label>

            {!loading && <button className='btn'>Cadastrar</button>}
            {loading && <button className='btn' disabled>Aguarde...</button>}

            {error && <p className="error">{error}</p>}
            {formError && <p className="error">{formError}</p>}
            
        </form>
    </div>

  )
}

export default CreatePost
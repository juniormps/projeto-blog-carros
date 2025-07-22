import styles from './EditPost.module.css'

import { useState, useEffect } from "react"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../context/authContext/useAuthContext"
import { useFetchDocument } from '../../hooks/useFetchDocument'


const EditPost = () => {

    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")


    // fill form data
    useEffect(() => {

        if (post) {
            setTitle(post.title)
            setImage(post.image)
            setBody(post.body)

            const textTags = post.tagsArray.join(", ")

            setTags(textTags)
        }

    }, [post]);



    const { user } = useAuthContext()

    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        // validate image
        try {
            new URL(image)

        } catch (error) {
            setFormError("A imagem precisa ser uma URL.")

        }


        // create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())


        // check values
        if (!title || !image || !tags || !body) {

            setFormError("Por favor, preencha todos os campos!")

        }


        if (formError) return

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data)

        // redirect to home page
        navigate("/dashboard");
        
    }



  return (

    <div className={styles.edit_post}>
        {post && (
            <>
                <h2>Editando post: {post.title}</h2>

                <p>Altere os dados do post como desejar</p>

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

                    <p className={styles.preview_title}>Preview da imagem atual:</p>

                    <img
                        className={styles.image_preview}
                        src={post.image}
                        alt={post.title}
                    />

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

                    {!response.loading && <button className='btn'>Editar</button>}
                    {response.loading && <button className='btn' disabled>Aguarde...</button>}

                    {response.error && <p className="error">{response.error}</p>}
                    {formError && <p className="error">{formError}</p>}
                    
                </form>
            </>
        )}
    </div>

  )
}

export default EditPost
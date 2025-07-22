import styles from './SearchBar.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    }

  return (

    <form className={styles.search_form} onSubmit={handleSubmit}>
    
        <input 
            type="text"
            placeholder="Ou busque por tags..."
            onChange={(e) => setQuery(e.target.value)}
        />
        
        <button className="btn btn-dark">Pesquisar</button>

    </form>

  )
}

export default SearchBar
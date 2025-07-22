//CSS
import './App.css'

//React Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuthContext } from './context/authContext/useAuthContext' 


//Pages
import Home from './pages/home/Home'
import About from './pages/about/About'
import Search from './pages/search/Search'
import Post from './pages/post/Post'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import CreatePost from './pages/createPost/CreatePost'
import Dashboard from './pages/dashboard/Dashboard'
import EditPost from './pages/editPost/EditPost'



function App() {

    const { user, loading } = useAuthContext()

    if (loading) return <p>Carregando...</p>
 
  return (
    <>
      <div>
            <BrowserRouter>

                <Navbar/>

                <div className="container">
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/about' element={<About/>} />
                        <Route path='/search' element={<Search/>} />
                        <Route path='/posts/:id' element={<Post/>} />
                        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
                        <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/login" />}/>
                        <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />}/>
                        <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    </Routes>
                </div>

                <Footer/>
                
            </BrowserRouter>
      </div>
    </>
  )
}

export default App

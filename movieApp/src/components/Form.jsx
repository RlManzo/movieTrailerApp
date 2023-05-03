import React from 'react'
import Navbar from './Navbar';
export default function Form({fetchMovies, setSearchKey, searchKey}) {
    const searchMovies = (e)=>{
        e.preventDefault();
        fetchMovies(searchKey)
    }
    const reloadPage = ()=>{
      window.location('/')
    }
  return (
    <div className='container'>
          <nav className="navbar bg-body-tertiary navbarStyles" style={{marginBottom:20, }}>
             <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1 " style={{cursor:'pointer'}} onClick={()=> {window.location='/'}}>Movie Trailer App</span>
               <form  className="btn-group d-flex formStyles" role="group"  onSubmit={searchMovies}>
                      <input type="text" placeholder='Buscar pelicula' onChange={(e)=> setSearchKey(e.target.value)}/>
                      <button type='submit'  className='btn btn-primary formStyles'>search</button>
               </form>
             </div>
          </nav>
    </div>
  )
}

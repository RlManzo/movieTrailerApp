import React, { useState, useEffect } from 'react'
import axios from 'axios'
import YouTube from 'react-youtube';
import Navbar from './Navbar';
import Form from './Form';

export default function Movies() {
    const API_URL = 'https://api.themoviedb.org/3'
    const API_KEY =  '7effe36e1c73271658fe1af2f2e1e4c1'
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [trailer, setTrailer] = useState(null)
    const [movie, setMovie] = useState({title: "Loading movies"})
    const [playing, setPlaying] = useState(false)
 
    const fetchMovies = async(searchKey)=>{
        const type = searchKey ? "search" : "discover"
        const {data: {results},} = 
        await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key : API_KEY,
                query: searchKey,
            },
        });
      setMovies(results)
      setMovie(results[0])

      if(results.length){
        await FetchMovieOne(results[0].id)
      }
    }

    const FetchMovieOne = async(id)=>{
        const {data} = await axios.get(`${API_URL}/movie/${id}`,{
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })
        if(data.videos && data.videos.results){
            const trailer = data.videos.results.find(
                (vid)=> vid.name === "Official Trailer"
            )
            setTrailer(trailer ? trailer : data.videos.results[0])
        }
        setMovie(data)
    } 
    const selectMovie = async (movie)=>{
          FetchMovieOne(movie.id)
          setMovie(movie)
          window.scrollTo(0,0)
    }

    useEffect(()=>{
        fetchMovies()
    },[])
    const searchMovies = (e)=>{
        e.preventDefault();
        fetchMovies(searchKey)
    }
    return (
    <div className='container mt-3'>
        <div >
            <Form fetchMovies={fetchMovies} searchKey={searchKey} setSearchKey={setSearchKey}/>
            <div>
                <main>
                    {movie ?(
                        <div className='viewTrailer' style={{backgroundImage:`url("${IMAGE_PATH}${movie.backdrop_path}")`, }}>
                            {
                             playing ? (
                                <div className='videoYoutube'>
                                <YouTube videoId={trailer.key} opts={{ 
                                     playerVars:{
                                        autoplay:1,
                                        controls:0,
                                        cc_load_policy:0,
                                        fs: 0,
                                        iv_load_policy:0,
                                        modestbranding:0,
                                        rel:0,
                                        showinfo:0
                                    }
                                }}/>
                                

                                <button onClick={()=> setPlaying(false) } className='btn btn-light'>close</button>
                                 </div>
                             ):(
                                <div className='container'>
                                    <div> 
                                    <h1 className='text-white textShadow'>{movie.title}</h1>
                                      <p className='text-white textShadow'> {movie.overview}</p>
                                        {trailer ?(
                                         <button className='btn btn-dark buttonTrailer textShadow' onClick={()=> setPlaying(true)} type='button'>Play Trailer</button> 
                                        )
                                        : ( 'sorry')
                                      }
                                    </div>
                                     
                                     
                                    
                                </div>
                             )
                            }
                        </div>
                    ): 
                        null}
                </main>
            </div>

        </div>
        <div className='row'>
           {movies.map((movie)=>(
             <div key={movie.id} className='col-md-4 mb-3 ' >
                 <figure className="snip1321 ">
                    <img className='cardMovie textShadow' src={`${URL_IMAGE + movie.poster_path}`} alt="" height={500} width='100%'/>
               
                <figcaption>
                    <span>
                        {movie.overview}
                    </span>
                    <button onClick={()=> selectMovie(movie)} className='btn btn-dark'> select movie</button>
                </figcaption></figure>
                <h4 className='text-center text-white h4 textShadow'>{movie.title}</h4>
                </div>
           ))}
        </div>
    </div>
  )
}

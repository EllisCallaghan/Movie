"use client"
import MovieCard from "@/app/components/MovieCard";
import { fetchRel,fetchDetails,fetchVideo} from "@/utils/fetchAPI";
import { useState,useEffect } from "react"
import { Provider, useDispatch } from 'react-redux'
import YouTube from 'react-youtube'
import { addToList } from '@/state'
import { configureStore } from "@reduxjs/toolkit";
import listReducer from '../../../state'
const store = configureStore({
  reducer:{
    list:listReducer
  }
})

const page = ({ params }) => {
  const [results, setResults] = useState([]);
  const [rel, setRel] = useState([])
  const [video, setVideo] = useState([])
  const [item, setItem] = useState(null)
  const [small, setSmall] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    fetchRel(params.id)
    .then((p) => setRel(p))
  }, [])

  useEffect(() => {
    fetchDetails(params.id)
    .then((p) => setResults(p))
  }, [])


  useEffect(() => {
    fetchVideo(params.id)
    .then((p) => setVideo(p))
  }, [video])
  const keyArray = Array.from(video)[0];
  const title = results.title
  const getWidth = () => { 
    if (window.innerWidth < 988){
      setSmall(true)
    } console.log(window.innerWidth)
    }
    useEffect(() => {
      getWidth()
      
    },[])
  const movieId = params.id;
  return (
    <Provider store={store}>
    <div className=' z-0 text-black dark:text-white flex flex-col gap-6 tablet:items-center'>
      <div className="flex flex-row  tablet:flex-col tablet:items-center w-full items-start gap-24 py-[60px] ">
        <img src={`https://image.tmdb.org/t/p/w780/${results.poster_path}`} className="w-[33%]  tablet:w-[75%]"/> 
        <div className="w-[60%] flex flex-col gap-8 h-full items-center">
          <p className="text-7xl font-bold tablet:text-3xl">{results.title}</p>
          <p className="overflow-hidden">{results.overview}</p>
          <button className='z-20 bg-secondary w-[80%] rounded-lg py-2' onClick={() => dispatch(addToList({item:{movieId,title}}))}>
              ADD TO LIST
            </button>
            <YouTube 
            className='z-20' videoId={keyArray} key={keyArray} opts={{height:`${small ? '240' : '400'}` ,width:`${small ? '360' : '600'}`,

            playerVars:{autoplay:1,controls:1,modestbranding:1}}} /> 
        </div>
        
      </div>
      <h1 className="text-black dark:text-white text-6xl font-primary font-[600]">Related Movies</h1>
      <div className="grid grid-flow-row gap-7 grid-cols-4 lg:grid-cols-3  md:grid-cols-2 tablet:grid-cols-1 lg:items-center">
        
        {rel.map((item,i) => {
        if (item.backdrop_path != null){
          return(
          <MovieCard desc={item.overview}
          index={i} showNum={10} videoId={video} movieId={item.id} title={item.title} image={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`}/>)
}})}
      </div>


        
      </div>
      </Provider>
  )
}

export default page
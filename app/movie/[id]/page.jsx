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
  const setTitle = (props) => {
    
    return(
      <a>{props.title}</a>
    )
  }
  return (
    <Provider store={store}>
    <div className=' z-0 text-black dark:text-white flex flex-col gap-6'>
      <div className="flex flex-row w-full items-start gap-24 py-[60px] max-h-[90vh]">
        <img src={`https://image.tmdb.org/t/p/w780/${results.poster_path}`} className="w-[33%]"/> 
        <div className="w-[60%] flex flex-col gap-7 h-full">
          <p className="text-7xl font-bold">{results.title}</p>
          <p className="overflow-hidden">{results.overview}</p>
          <button className='z-20' onClick={() => dispatch(addToList({item:{...item,title}}))}>
              ADD TO LIST
            </button>
            <YouTube 
            className='z-20' videoId={keyArray} key={keyArray} opts={{height:'400',width:'600',
            playerVars:{autoplay:1,controls:1,modestbranding:1}}} /> 
        </div>
        
      </div>

      <div className="grid grid-flow-row gap-7 grid-cols-4">
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
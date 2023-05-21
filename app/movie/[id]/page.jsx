"use client"
import MovieCard from "@/app/components/MovieCard";
import { fetchRel,fetchDetails} from "@/utils/fetchAPI";
import { useState,useEffect } from "react"
import { useDispatch } from 'react-redux'

import { addToList } from '@/state'
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




  return (
    <div className='text-black dark:text-white flex flex-col '>
      <div className="flex flex-row w-full items-start gap-12 py-[60px]">
        <img src={`https://image.tmdb.org/t/p/w780/${results.poster_path}`} className="w-[30%]"/> 
        <div className="w-[50%] flex flex-col gap-9">
          <p className="text-7xl font-bold">{results.title}</p>
          <p>{results.overview}</p>
          <button className='z-20' onClick={() => dispatch(addToList({item:{...item,...params}}))}>
              ADD TO LIST
            </button>
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
  )
}

export default page
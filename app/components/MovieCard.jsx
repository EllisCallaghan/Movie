"use client"
import { useState,useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import YouTube from "react-youtube"
import { addToList } from '@/state'
import { useDispatch } from 'react-redux'
import { fetchVideo } from '@/utils/fetchAPI'
const MovieCard = ({title,image,showNum,index,movieId,desc}) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false)
  const [video,setVideo] = useState([])

  const [small, setSmall] = useState(false)
  useEffect(() => {
    fetchVideo(movieId)
    .then((p) => setVideo(p))
  }, [video])

  const handleClick = (e) => {
    dispatch(addToList({item:{movieId,title}}))
    e.preventDefault()
  }
  const keyArray = Array.from(video)[0];
  const getWidth = () => { 
  if (window.innerWidth < 988){
    setSmall(true)
  } console.log(window.innerWidth)
  }
  useEffect(() => {
    getWidth()
    
  },[]
  )
  const handleHover = (e) => {
    setHover(true)
    e.preventDefault()
  }
  const handleTouch = () => {
    setHover(true)
  }
    for(let i =index; i<showNum;i++){

      return (
        
        <div onMouseEnter={(e) => handleHover(e)} onMouseLeave={() => setHover(false)} 
        onTouchStart={() => handleTouch()} onTouchEnd={() => setHover(false)}
        className='border-black dark:border-white font-primary
        overflow-hidden pb-1
        flex flex-col gap-4 h-[400px] md:h-[300px] w-[300px] md:w-[210px] border rounded-xl hover:scale-110'>
          {hover ? 
            <YouTube 
            className='z-20' videoId={keyArray} key={keyArray} 
            opts={{height:`${small ? '150' : '170'}` ,width:`${small ? '210' : '300'}`,
            playerVars:{autoplay:1,controls:0,modestbranding:1}}} /> 
          
          : <img src={image} className='h-[170px] w-[300px] border rounded-xl border-none'/>}
        <Link className='touch-handler'
        
        
        passHref href={`/movie/${encodeURIComponent(movieId)}`} >
          <div className='flex flex-col max-h-[205px] gap-1 px-2 justify-between'>
            <div className=' flex-row justify-between inline-flex'>
              <h1 className=' text-xl  md:text-lg sm:text-base font-[800] flex flex-wrap'>{title}</h1>
              <button className='text-[14px] min-w-[100px] py-4 max-h-[54px]
              z-20 rounded-md px-1 bg-secondary inline-block' onClick={(e) => handleClick(e)}>
                ADD TO LIST
              </button>
            </div>
            <p className='overflow-hidden text-[18px] md:text-[14px] max-h-[100px] min-h-[99px]'>{desc}</p>
            <p className='text-end text-[22px] pr-3 self-end
             '>View more</p>
            
          </div>
          </Link>
        </div>
        
        
      
    )}
  }

export default MovieCard
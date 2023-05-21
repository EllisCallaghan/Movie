"use client"
import Image from 'next/image'
import { fetchPop } from '@/utils/fetchAPI'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import MovieCard from './components/MovieCard'
import Lottie from "lottie-react"
import MovieAnimation from '../animations/movie.json'
import { motion } from 'framer-motion'



export default function Home() {
  const [results, setResults] = useState([]);
  const [showNum, setShowNum] = useState(10)
  const [showNumActive, setShowNumActive] = useState(false)
  const [page, setPage] = useState()



  useEffect(() => {


    fetchPop(page)
    .then((p) => setResults(p))


  }, [page,results])

  const handleClick = (number) => {
    setPage(number)
    fetchPop(page)

  }

  const handleShowAll = () => {
    setShowNumActive((prev) => (!prev))
    setShowNum(() => showNumActive === false? 20:10)
  }


 
  
  return (
    
  <>
  <div className='flex flex-col h-[100vh] lg:h-full lg:items-center'>
    <div className='flex flex-row  lg:flex-col w-full items-start pt-16 lg:pt-8 lg:items-center'>
      <div className='flex flex-col w-1/2 lg:w-full items-start md:items-center pt-32 lg:pt-8'>
        <h1 className='font-primary text-[80px] lg:text-[54px]  md:text-center dark:text-white font-bold'>
        Lorem ipsum dolor sit amet, consectetur adipiscing.
        </h1>
        <p className='font-primary text-[24px] md:text-[16px] md:text-center font-[100] dark:text-white'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere vulputate sapien non iaculis. Fusce pretium tempus posuere. Donec faucibus mollis.
        </p>
        <div className='flex flex-row gap-8 text-white font-[500] font-primary
        text-[18px] pt-[16px] items-center'>
          <button>Sign up</button>
          <button>Get Started</button>
        </div>
      </div>
      <Lottie animationData={MovieAnimation} className='w-1/2'/>
    </div>
    <div className=" animate-pulse flex justify-center items-center">
        <a href="#about">
          <div className='w-[35px] h-[64px] shadow-2xl rounded-3xl border-4 border-black dark:border-white flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y:[0,24,0]
              }}
              transition={{
                duration:2,
                repeat:Infinity,
                repeatType:'loop'
              }}
              className="w-3 h-3 rounded-full bg-white mb-1"
            />
          </div>
        </a>
    
      </div>
    </div>
    
    <main id='about' className='flex flex-col gap-7 bg-white text-black dark:bg-primary dark:text-white'>
      <h1  className='text-6xl font-primary font-bold'>FEATURED MOVIES</h1>
      <div  className='flex flex-col gap-7'>
        <div className='grid grid-flow-row grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-7 md:gap-4'>
          { 
          
          results.map((results,i) => {
            if (results.backdrop_path != null){
              return(
                <MovieCard desc={results.overview} key={i} index={i} showNum={showNum} image={`https://image.tmdb.org/t/p/w780/${results.backdrop_path}`} movieId={results.id} title={results.title}/>)
  }})}
          <div className='flex items-center justify-start'>
            <button onClick={() => handleShowAll()} className='w-[25%] h-[25%] rounded-[12px] p-2 border border-black dark:border-white text-black dark:text-white'>
              SHOW <span>{showNumActive === false ? 'ALL +': 'LESS'}</span>
            </button>
          </div>
        </div>
        <div className='flex gap-[20px] self-center'>
          {[1,2,3,4,5,6,7].map((item,index) => (
            <button key={index} className='w-[32px] border border-gray-600 rounded-[12px] p-2' 
            onClick={() => handleClick(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      

    </main>
  </>
  )
  
}

"use client";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import CloudIcon from '../../public/cloudicon.png'
import SunIcon from '../../public/sunIcon.png'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useSelector,useDispatch } from "react-redux";
import { decreaseCount,increaseCount,removeFromList } from "@/state";
import { Switch } from "@headlessui/react";
import HomeImg from '../../public/home.svg'
const Nav = () => {
  const [mode,setMode] = useThemeSwitcher();
  const [enabled, setEnabled] = useState(false)
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);


  // redux
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.savedList)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  },[])


  return (

    <div className="flex flex-row justify-between items-center  
    ">
      <Link 
      href="/" className=" w-[5%] ">
        <svg className="fill-black dark:fill-slate-400" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
           viewBox="0 0 495.398 495.398"
          xmlSpace="preserve">
        <g>
          <g>
            <g>
              <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
                v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
                c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
                c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
              <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
                c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
                c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
            </g>
          </g>
        </g>
        </svg>
      </Link>
      <div onClick={() => setMode(mode === "light"?"dark":"light")} className="cursor-pointer flex flex-row gap-3 justify-center items-center">
      <Switch onClick={() => setMode(mode === "light"?"dark":"light")}
        checked={enabled}
        onChange={setEnabled}
        className={`bg-blue-700 dark:bg-white
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full dark:bg-slate-400 bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
        <p className="text-black dark:text-white">
          {mode === "dark" ? <span>Light Mode</span> : <span>Dark Mode</span>}
        </p>
      </div>
      {/* <div className="collapse flex flex-col">
          <button onClick={() => handleClick()} className="
          collapse-title text-black dark:text-white">SAVED:&nbsp;{list.length}</button>

            {toggleDropdown ? (<ul className="bg-black z-10 list-none absolute mt-5">
              {list.map((item) => (
                <li className="text-white"><Link href={`/movie/${encodeURIComponent(item.movieId)}`}>{item.title}</Link></li>
              ))}
            </ul>) : <div></div>}

      </div> */}
     

      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">SAVED:&nbsp;{list.length}</label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60">
        {list.map((item) => (
                
                
                <li className="text-white"><Link href={`/movie/${encodeURIComponent(item.movieId)}`}>{item.title}</Link></li>
                
                
              ))}
        </ul>
      </div>

      {/* <div className='flex '>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='font-primary font-[500] text-[16px] leading-[26.4px] bg-[#162044] border border-none 
                  px-[16px] py-[16px] rounded-[8px] text-white'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div> */}
      
    </div>

  )
}

export default Nav
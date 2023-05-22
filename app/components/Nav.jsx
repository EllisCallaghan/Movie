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

const Nav = () => {
  const [mode,setMode] = useThemeSwitcher();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  
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
  useEffect(() => {
    console.log(list)
  },[toggleDropdown])
  const handleClick = () => {
    setToggleDropdown((prev) => (!prev))
  }
  
  return (

    <div className="flex flex-row justify-between items-center  bg-primary 
    ">
      <Link 
      href="/" className="rounded-[12px] p-2 border border-black dark:border-white text-black dark:text-white">HOME</Link>
      <button onClick={() => setMode(mode === "light"?"dark":"light")}
          className={`ml-3 flex item-center justify-center rounded-full p-1 ${mode=== "light"? "bg-white text-black" : "bg-black text-white"}`}
          >
              {
                  mode === "dark"?
                  <Image src={SunIcon} alt="sun" className={"fill-black w-[32px]"}/>
                  
                  :<Image src={CloudIcon} alt="cloud" className={"fill-black w-[32px]"}/>
              }
      </button>
      <div className="flex flex-col">
          <button onClick={() => handleClick()} className="text-black dark:text-white">SAVED:&nbsp;{list.length}</button>

            {toggleDropdown ? (<ul className="bg-black z-10 list-none absolute mt-5">
              {list.map((item) => (
                <li className="text-white"><Link href={`/movie/${encodeURIComponent(item.id)}`}>{item.title}</Link></li>
              ))}
            </ul>) : <div></div>}

      </div>
      <div className='flex '>
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
                  px-[16px] py-[16px] rounded-[8px]'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      
    </div>

  )
}

export default Nav
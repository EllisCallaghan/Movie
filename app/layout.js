"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import AuthProvider from './components/AuthProvider'
const inter = Inter({ subsets: ['latin'] })
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../state'

const store = configureStore({
  reducer:{
    list:listReducer
  }
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Provider store={store}>
      <body className='bg-white dark:bg-primary'>
        <AuthProvider>
          <main className='px-[220px] xl:px-[32px] md:px-[8px] py-[12px]'>
            <Nav/>
            {children}
          </main>
          </AuthProvider>
      </body>
    </Provider>
  </html>
  )
}

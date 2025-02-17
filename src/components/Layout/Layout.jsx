import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './../Footer/Footer';
import MyNavbar from '../MyNavbar/MyNavbar';


export default function Layout() {
  return (
    <>
      <MyNavbar/>
      <div className='container  md:w-[80%] mx-auto py-20 min-h-screen overflow-hidden'>
      <Outlet/>
      </div>
      < Footer/>
    </>
  )
}

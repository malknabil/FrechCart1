import React, { useEffect } from 'react'
import RecentProducts from './../RecentProducts/RecentProducts';
import CategorySlider from './../categorySlider/categorySlider';
import MainSlider from '../mainSlider/mainSlider';


export default function Home() {
  useEffect(()=>{},[])
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  )
}

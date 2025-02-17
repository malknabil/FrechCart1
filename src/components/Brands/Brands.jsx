import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Brands() {

  const [AllBrands, setAllBrands] = useState([])

  function getAllBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => { setAllBrands(res.data.data)})
      .catch((err) => err)
  }

  useEffect(() => {
    getAllBrands()
  }, []);

  return (
    <>
    <h1 className='text-[#86A789] text-center text-3xl font-bold py-10'>All Brands</h1>
      <div className='flex flex-wrap py-5">'>
        {AllBrands?.map((category) => <div data-aos="zoom-out" className='w-1/2 md:w-1/4 border-4 border-[#86A789] transition-all hover:scale-95 hover:shadow hover:shadow-[#86A789]' kay={category._id}>
          <img src={category.image} alt="category image" className='w-full'/>
          <h1 className='text-center mb-3'>{category.name}</h1>
        </div>)}
      </div>
    </>
  )
}

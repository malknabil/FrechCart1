import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categories() {
  const [AllCategories, setAllCategories] = useState([])

  function getAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => { setAllCategories(res.data.data)})
      .catch((err) => err)
  }

  useEffect(() => {
    getAllCategories()
  }, []);

  return (
    <>
    <h1 className='text-[#86A789] text-center text-3xl font-bold py-10'>All Categories</h1>
      <div className='flex flex-wrap py-5'>
        {AllCategories?.map((category) => <div className='w-1/2 md:w-1/4 border-4 border-[#86A789] transition-all hover:scale-95 hover:shadow hover:shadow-[#86A789]' kay={category._id}>
          <img src={category.image} alt="category image" className='w-full h-[320px] object-fill md:object-cover'/>
          <h1 className='pb-4 text-center bg-[#86A789] font-bold'>{category.name}</h1>
        </div>)}
      </div>
    </>
  );
}

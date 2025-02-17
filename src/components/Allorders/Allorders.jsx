import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Allorders() {
  const [allOrders, setallOrders] = useState([])

  function getAllOrders() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      .then((res) => { setallOrders(res.data.data) })
      .catch((err) => err)
  }

  useEffect(() => {
    getAllOrders()
    console.log(allOrders);
  }, [])


  return (
    <>
    <h1 className='text-[#86A789] text-center font-bold text-2xl'>All Orders</h1>
      <div className='flex flex-wrap py-5 gap-5'>
        {allOrders?.map((order) => <div className='p-4 w-full md:w-full border-4 border-[#86A789] transition-all hover:scale-95 hover:shadow hover:shadow-[#86A789]'>
          <img src={order?.cartItems?.product?.imageCover} alt="" />
          <h1 className='text-[#86A789] font-bold'>Total Price: <span className='text-black'>{order?.totalOrderPrice}</span></h1>
          <h1 className='text-[#86A789] font-bold'>Order Data: <span className='text-black'>{order?.createdAt}</span></h1>
          <h1 className='text-[#86A789] font-bold'>Order paymentMethodType: <span className='text-black'>{order?.paymentMethodType}</span></h1>
        </div>)}
      </div>

      <button className='btn'><Link to={"/"}>Back To Home</Link></button>
    </>
  )
}

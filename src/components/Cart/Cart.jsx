import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";



export default function Cart() {
  let { getItems, updateProduct, deleteProduct, deleteAllItems, setCartNum, CartNum } = useContext(CartContext)
  const [CartItems, setCartItems] = useState([])

  async function getCart() {
    let res = await getItems()
    if (res.data.status == "success") {
      setCartItems(res.data.data)
      console.log(res.data.data);
    } else {
      <div>Cant Add</div>
    }
  }

  async function update(id, count) {
    let res = await updateProduct(id, count)
    console.log(res);
    if (res.data.status === "success") {
      setCartItems(res.data.data)
    } else {
      <div>Cant Add</div>
    }
  }

  async function deleteItem(id) {
    let res = await deleteProduct(id)
    if (res.data.status === "success") {
      setCartItems(res.data.data)
      setCartNum(CartNum - 1)
      toast.success("Removed Success");
    } else {
      <div>Cant Add</div>
    }
  }

  async function deleteAll() {
    let res = await deleteAllItems()
    console.log(res);
    if (res.message === "success") {
      setCartItems(null)
    } else {
      <div>Cant Add</div>
    }
  }


  useEffect(() => {
    getCart()
    console.log(CartItems.products);
    
  }, [])


  return (
    <>
      {CartItems?.products?.length > 0 ? <>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">

                  {CartItems?.products?.map((Item)=><div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <div className="shrink-0 md:order-1">
                        <img className="h-20 w-20" src={Item.product.imageCover} alt="imac image" />
                      </div>
                      <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button onClick={()=> update(Item.product.id , Item.count - 1)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                          </button>
                          <span type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder required>{Item.count}</span>
                          <button onClick={()=> update(Item.product.id , Item.count + 1)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">{Item.price * Item.count} EGY</p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <p className="text-[#86A789] text-base font-medium hover:underline dark:text-white">{Item.product.title}</p>
                        <div className="flex items-center gap-4">

                          <button onClick={()=> deleteItem(Item.product.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> )}
                  









                </div>
              </div>
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                  <div className="space-y-4">
                    
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">{CartItems.totalCartPrice} EGP</dd>
                    </dl>
                  </div>
                  <Link to={"/checkout"} className="btn flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</Link>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <Link to={"/"} title className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                      Continue Shopping
                      <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                      <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder required />
                    </div>
                    <button type="submit" className="btn flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </> : <h1 className='flex justify-center items-center h-40 text-xl font-semibold text-red-600 bg-red-100 border border-red-300 rounded-lg shadow-md'>Add Items Now</h1>}

    </>
  )
}

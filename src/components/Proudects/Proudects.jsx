import React, { useContext, useState } from 'react'
import useProducts from '../../Hooks/useProducts'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';

export default function Proudects() {
  let {data , isError, error, isLoading} = useProducts()
  const [loading, setLoading] = useState(false);
  const [idItem, setIdItem] = useState(0);
  let { addProductToCart, setCartNum, CartNum} = useContext(CartContext);

  if (isError) {
    return <h2>{error}</h2>
  }

  if (isLoading) {
    return <div className='min-h-screen flex items-center justify-center'>
      <span class="loader"></span>
    </div>
  }

  async function addToCart(id) {
    setLoading(true);
    setIdItem(id);
    let res = await addProductToCart(id);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      setCartNum(CartNum + 1)
    } else {
      toast.error(res.data.message);
    }
    setLoading(false);
  }


  return (
    <>
    <h1 className='text-[#86A789] text-center text-3xl font-bold py-10'>All Products</h1>
    <div className="flex flex-wrap py-5">
        {data?.data?.data.map((Product) => (
          <div className='w-1/2 md:w-1/6' key={Product.id}>
            <Link to={`ProductsDetails/${Product.id}/${Product.category.name}`}><div className='product p-5'>
              <img src={Product.imageCover} className='w-full' alt="Product" />
              <h3 className='mb-1'>{Product.category.name}</h3>
              <h3 className='font-bold'>{Product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className='flex justify-between'>
                <h3>{Product.price}EGP</h3>
                <span><i className='fas fa-star text-yellow-300'></i>{Product.ratingsAverage}</span>
              </div>
            </div>
            </Link>
            <button onClick={()=> addToCart(Product.id)} className='btn mt-2 ml-5 flex items-center justify-center'>
            {loading && idItem === Product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

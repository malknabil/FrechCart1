import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';

export default function ProductsDetails() {
  let { id, category } = useParams()
  const [product, setproduct] = useState([])
  const [relatedProduct, setrelatedProduct] = useState([])
  const [loading, setLoading] = useState(false);
  const [idItem, setIdItem] = useState(0);
  let { addProductToCart, setCartNum, CartNum } = useContext(CartContext);

  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data)
      })
      .catch((res) => { })
  }

  function AllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter((product) => product.category.name == category)
        setrelatedProduct(related);
        console.log(relatedProduct);
      })
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slickPlay: true,
    autoplay: true,
    autoplaySpeed: 2000,
  }


  useEffect(() => {
    getProduct(id)
    AllProducts()
  }, [id, category])
  return (
    <>
      <div className=" items-center flex">
        <div className='w-1/4'>
          <Slider {...settings}>
            {product.images?.map((src) => <img src={src} className='w-full'></img>)}
          </Slider>
        </div>
        <div className='w-3/4 p-4'>
          <h3>{product?.title}</h3>
          <h4>{product?.description}</h4>
          <h4>{product?.category?.name}</h4>
          <div className='flex justify-between'>
            <h3>{product?.price}EGP</h3>
            <span><i className='fas fa-star text-yellow-300'></i>{product?.ratingsAverage}</span>
          </div>
          <button onClick={() => addToCart(product.id)} className='btn mt-2 flex items-center justify-center '>
            {loading && idItem === product.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>



      <div className="flex flex-wrap py-5">
        {relatedProduct.length > 0 ? relatedProduct.map((Product) => (
          <div className='w-1/2 md:w-1/6' key={Product.id}>
            <Link to={`/ProductsDetails/${Product.id}/${Product.category.name}`}><div className='product p-5'>
              <img src={Product.imageCover} className='w-full' alt="Product" />
              <h3 className='mb-1'>{Product?.category?.name}</h3>
              <h3 className='font-bold'>{Product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className='flex justify-between'>
                <h3>{Product.price}EGP</h3>
                <span><i className='fas fa-star text-yellow-300'></i>{Product.ratingsAverage}</span>
              </div>
            </div>
            </Link>
            <button onClick={() => addToCart(Product.id)} className='btn mt-2'>
              {loading && idItem === Product.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add To Cart"
              )}
            </button>
          </div>
        )) : <span class="loader"></span>}
      </div>
    </>
  )
}

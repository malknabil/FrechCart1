import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";



export default function CategorySlider() {
  const [Category, setCategory] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 1000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategory() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategory(res.data.data);
      })
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <>
      <h2 className="text-start font-serif capitalize font-bold py-4">Shop Popular Categories</h2>
      {
        <Slider {...settings} className="cursor-pointer ">
          {Category?.map((categorie) => (
            <div key={categorie._id} className="w-full pb-5  ">
              <div className="w-full">
                <img
                  src={categorie?.image}
                  className="w-full h-[200px] rounded-2xl   object-fill md:object-cover"
                  alt=""
                />
                <div className=""> <h4 className="font-mono font-bold mt-2 ">{categorie?.name}</h4></div>
              </div>
            </div>
          ))}
        </Slider>
      }
    </>
  )
}

import React from 'react'
import Slider from "react-slick";
import img1 from '../../assets/slider-image-1.jpeg'
import img2 from '../../assets/slider-image-2.jpeg'
import img3 from '../../assets/slider-image-3.jpeg'
import img4 from '../../assets/grocery-banner-2.jpeg'

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center py-6 gap-4'>
      <div className='w-full lg:w-3/4'>
        <Slider {...settings}>
          <img src={img1} className='w-full h-[300px] md:h-[400px] object-cover rounded-lg' alt="" />
          <img src={img4} className='w-full h-[300px] md:h-[400px] object-cover rounded-lg' alt="" />
          <img src={img3} className='w-full h-[300px] md:h-[400px] object-cover rounded-lg' alt="" />
        </Slider>
      </div>
      <div className='hidden lg:flex flex-col w-1/4 gap-4'>
        <img src={img2} className='w-full h-[200px] object-cover rounded-lg' alt="" />
        <img src={img3} className='w-full h-[200px] object-cover rounded-lg' alt="" />
      </div>
    </div>
  )
}

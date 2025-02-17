import React, { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik'
import { useState } from 'react';
import * as yup from "yup"
import { Button, TextInput } from 'flowbite-react'
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';


export default function Chechout() {
  let {Checkout, cartIdd} = useContext(CartContext)

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    // validationSchema: myValid,
    onSubmit: ()=> handleChechout(cartIdd, 'http://localhost:5173'),
  })


  async function handleChechout(cartId, url) {
    let {data} = await Checkout(cartId, url, formik.values)
    console.log(data.session.url);
    window.location.href = data.session.url
    
  }

  useEffect(()=>{
  },[])

  // let myValid = yup.object().shape({
  //   email: yup.string().email('not valid').required("is a required"),
  //   password: yup.string().min(3, "min length is 3").max(6, "max leagth is 6").required("is a required"),
  // })

  


  return (
    <>

      <div className='h-full'>
        <form onSubmit={formik.handleSubmit} className='flex gap-7 flex-col justify-center items-center'>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="details" value="Base input" />Details
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="details" type="text" name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.details && formik.touched.details ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.details}
            </Alert> : null}
          </div>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="password" value="Base input" />Your Phone
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="phone" type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.phone && formik.touched.phone ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.phone}
            </Alert> : null}
          </div>

          <div className='px-8 w-full flex flex-col items-center justify-center'>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="password" value="Base input" />Your City
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="city" type="text" name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.city && formik.touched.city ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.city}
            </Alert> : null}
          </div>

          <button type='submit' className='btn mt-5'>Checkout</button>

        </form>

      </div>
    </>
  )
}

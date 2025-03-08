import { Button, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup"
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import axios, { Axios } from 'axios';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { userContext } from './../../Context/userContext';
import { useContext } from 'react';
import BG from '../../assets/girl-yellow-wall-with-shopping-bags.jpg'
import styled from './Regiest.module.css'




export default function Regiest() {
  let { userLogin, setuserLogin } = useContext(userContext)

  const [APIError, setAPIError] = useState("")
  const [Loading, setLoading] = useState(false)
  const Navigate = useNavigate()

  function handleSubmit(values) {
    setLoading(true)

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setLoading(false)
        if (!APIError) {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token)
          Navigate("/")
        } else { null }
      })
      .catch((res) => {
        setLoading(false)
        console.log(res)
        console.log(res.response.data.message);
        setAPIError(res.response.data.message)
      })

  }

  let myValid = yup.object().shape({
    name: yup.string().min(3, "min length is 3").max(10, "max leagth is 10").required("name is a required"),
    email: yup.string().email('not valid').required("is a required"),
    password: yup.string().min(3, "min length is 3").max(6, "max leagth is 6").required("is a required"),
    rePassword: yup.string().oneOf([yup.ref("password")]).required("is a required"),
    phone: yup.string().matches(/^01[1250][1-9]{8}$/).required("is a required"),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema: myValid,
    onSubmit: handleSubmit,
  })


  return (
    <>

      {APIError ? <div className='bg-red-600 font-bold w-full h-20 text-black'>{APIError}</div> : null}



      <div className={`${styled.malk} `}>

        <form onSubmit={formik.handleSubmit} className={`form flex flex-col justify-center items-center min-h-screen bg-cover bg-center`}>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="Name" value="Base input" />Your Name
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="Name" type="text" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.name && formik.touched.name ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.name}
            </Alert> : null}
          </div>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="email" />Your Email
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="email" type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.email && formik.touched.email ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.email}
            </Alert> : null}
          </div>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="password" />Your Password
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="password" type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.password && formik.touched.password ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.password}
            </Alert> : null}
          </div>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="rePassword"  />Your rePassword
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="rePassword" type="password" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.rePassword && formik.touched.rePassword ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.rePassword}
            </Alert> : null}
          </div>

          <div className='px-8 w-full flex flex-col items-center justify-center'>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="phone" />Your Phone
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="phone" type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.phone && formik.touched.phone ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.phone}
            </Alert> : null}
          </div>

          <div className='mt-5 w-full flex justify-center items-center gap-3'><Button type='submit'>{Loading ? <span class="loader"></span> : "Submit"}</Button>
            <Link className='text-blue-600 underline' to={"/login"}>Do you already have an account? Login Now</Link>
          </div>

        </form>

      </div>
    </>
  )
}

import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik'
import { useState } from 'react';
import * as yup from "yup"
import { Button, TextInput } from 'flowbite-react'
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from 'axios';
import { userContext } from '../../Context/userContext';


export default function Login() {
  let { userLogin , setuserLogin } = useContext(userContext)
  const [APIError, setAPIError] = useState("")
  const [Loading, setLoading] = useState(false)
  const Navigate = useNavigate()

  function handleLogin(values) {
    setLoading(true)

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setLoading(false)
        console.log(res);
        if (res.data.message == "success") {
          localStorage.setItem("userToken" , res.data.token);
          setuserLogin(res.data.token)
          Navigate("/")
        } else { null }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err?.data?.message);
        setAPIError(err.response?.data?.message || "Something went wrong");
      })

  }

  let myValid = yup.object().shape({
    email: yup.string().email('not valid').required("is a required"),
    password: yup.string().min(3, "min length is 3").max(6, "max leagth is 6").required("is a required"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: myValid,
    onSubmit: handleLogin,
  })


  return (
    <>

      {APIError ? <div className='bg-red-600 font-bold w-full h-20 text-black'>{APIError}</div> : null}


      <div className='text-[#86A789] text-3xl font-bold flex justify-center'>Welcom To FreshCart</div>
      <div className='h-full'>
        <form onSubmit={formik.handleSubmit} className='flex flex-col justify-center items-center h-screen'>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="email" value="Base input" />Your Email
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
              <label htmlFor="password" value="Base input" />Your Password
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="password" type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.password && formik.touched.password ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.password}
            </Alert> : null}
          </div>

          <div className=' flex flex-col mt-5 w-full justify-center items-center gap-3'><Button type='submit'>{Loading ? <span class="loader"></span> : "Submit"}</Button>
          <Link className='text-blue-600 underline' to={"/regiest"}>Don't have an account? Sign up Now</Link>
          <Link className='text-blue-600 underline' to={"/ForgetPass"}>Do You Forget Password?</Link>
          </div>

        </form>

      </div>
    </>
  )
}

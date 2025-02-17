import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik'
import { useState } from 'react';
import * as yup from "yup"
import { Button, TextInput } from 'flowbite-react'
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from 'axios';
import { userContext } from './../../Context/userContext';


export default function ResetPassword() {
  let {setuserLogin} = useContext(userContext)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate()

  let myValid = yup.object().shape({
    email: yup.string().required("Email is required"),
    newPassword: yup.string().min(3, "min length is 3").max(6, "max leagth is 6").required("is a required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: myValid,
    onSubmit: getResetPassword,
  });

  async function getResetPassword(values) {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          "email": values.email,
          "newPassword": values.newPassword,
        }
      );
      console.log(data);


      if (data.token) {
        localStorage.setItem("userToken" , data.token);
        setuserLogin(data.token)
        Navigate("/")
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }


  }


  return (
    <>


      <div className='text-[#86A789] text-3xl font-bold flex justify-center'>Reset Your Password</div>
      <div className='h-full'>
        <form onSubmit={formik.handleSubmit} className='flex flex-col justify-center items-center '>

          <div className='px-8 w-full flex flex-col items-center justify-center '>
            <div className="mb-2 w-full md:w-1/3">
              <label htmlFor="email" value="Base input" />Enter Your Email
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
              <label htmlFor="newPassword" value="Base input" />Your New Password
            </div>
            <div className='md:w-1/3 w-full'>
              <TextInput id="newPassword" type="password" name='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.newPassword && formik.touched.newPassword ? <Alert className='md:w-1/3 w-full my-2' color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Info alert!</span> {formik.errors.newPassword}
            </Alert> : null}
          </div>

          <div className=' flex flex-col mt-5 w-full justify-center items-center gap-3'><Button type='submit'>{loading ? <span class="loader"></span> : "Submit"}</Button>
          </div>

        </form>

      </div>
    </>
  )
}

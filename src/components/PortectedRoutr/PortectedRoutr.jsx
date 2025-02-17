import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from './../Login/Login';

export default function PortectedRoutr(props) {
   

      if(localStorage.getItem("userToken")){
        return props.children
      } else{
        return <Navigate to={"/Login"}/>
      }
  
  
}

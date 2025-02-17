import React, { useContext } from 'react'
import { Navbar } from "flowbite-react";
import logo from "../../assets/freshcart-logo.svg"
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { userContext } from './../../Context/userContext';
import { CartContext } from '../../Context/CartContext';





export default function MyNavbar() {
  let { userLogin , setuserLogin } = useContext(userContext)
  let {CartNum} = useContext(CartContext)
  let Navigate = useNavigate()

  
  function SignOut(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    Navigate("/regiest")
  }

  return (
    <>


      <Navbar className=" bg-[#86A789] flex py-5 fixed items-center top-0 gap-3 right-0 left-0 z-50 ">
        <div className="  items-center  contents lg:flex lg:gap-2 w-[90%] mx-auto">
          <NavLink to="">
            <img
              src={logo}
              className="mr-3 "
              alt="cart React Logo"
            />
          </NavLink>

          {userLogin != null ?
            <Navbar.Collapse >

              <NavLink className="text-[18px] text-navText font-[400]" to="">
                Home
              </NavLink>
              <NavLink className="text-[18px] text-navText font-[400]" to="wishList">
                Wish List
              </NavLink>
              <NavLink className="relative text-[18px] text-navText font-[400]" to="cart">
                Cart
                <div className='text-[#86A789] absolute top-[-15px] right-[-15px] size-5 bg-black rounded-full flex justify-center items-center'>{CartNum}</div>
              </NavLink>
              <NavLink className="text-[18px] text-navText font-[400]" to="proudects">
                Products
              </NavLink>
              <NavLink className="text-[18px] text-navText font-[400]" to="categories"
              >
                Categories
              </NavLink>
              <NavLink className="text-[18px] text-navText font-[400]" to="brands">
                Brands
              </NavLink>

            </Navbar.Collapse> : null}

        </div>
        <div className=" flex gap-3 items-center fixed right-0 top-0 p-5 ">
          <Navbar.Toggle className="order-2" />

          <ul className=" gap-3 mr-14 order-1 hidden lg:flex ">
            <li> <i class="fa-brands fa-instagram"></i></li>
            <li> <i class="fa-brands fa-facebook"></i></li>
            <li> <i class="fa-brands fa-youtube"></i></li>
            <li> <i class="fa-brands fa-linkedin"></i></li>
            <li> <i class="fa-brands fa-twitter"></i></li>
          </ul>



          {!userLogin ? <ul className="flex gap-3">
            <li><Link to="login">Login</Link></li>
            <li><Link to="regiest">register</Link></li>
          </ul>
            :
          <ul>
            <li><Link to={"/regiest"} onClick={SignOut}>Sign Out</Link></li>
          </ul>}




          <div>
          </div>

        </div>




      </Navbar>



    </>
  )
}

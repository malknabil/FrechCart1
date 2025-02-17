import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound';
import Proudects from './components/Proudects/Proudects';
import Regiest from './components/Regiest/Regiest';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Sign from './components/Sign/Sign';
import ConterContextProvider from './Context/ConterContext'
import UserContextProvider from './Context/userContext'
import PortectedRoutr from './components/PortectedRoutr/PortectedRoutr';
import ProductsDetails from './components/ProductsDetails/ProductsDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import WishList from './components/WishList/WishList';
import WishListContextProvider from './Context/WishListContext'
import ForgetPass from './components/ForgetPass/ForgetPass';
import ResetCode from './components/ResetCode/ResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'






let Query = new QueryClient()

let x = createBrowserRouter([
  {
    path: "", element: <Layout />,
    children: [
      { index: true, element: <PortectedRoutr><Home /></PortectedRoutr> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
      { path: "regiest", element: <Regiest /> },
      { path: "ForgetPass", element: <ForgetPass /> },
      { path: "ResetCode", element: <ResetCode /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "cart", element: <PortectedRoutr><Cart /></PortectedRoutr> },
      { path: "ProductsDetails/:id/:category", element: <PortectedRoutr><ProductsDetails /></PortectedRoutr> },
      { path: "proudects", element: <PortectedRoutr><Proudects /></PortectedRoutr> },
      { path: "brands", element: <PortectedRoutr><Brands /></PortectedRoutr> },
      { path: "categories", element: <PortectedRoutr><Categories /></PortectedRoutr> },
      { path: "/allorders", element: <PortectedRoutr><Allorders /></PortectedRoutr> },
      { path: "wishList", element: <PortectedRoutr><WishList /></PortectedRoutr> },
      { path: "sign in", element: <Sign /> },
      { path: "checkout", element: <PortectedRoutr><Checkout /></PortectedRoutr> },
    ]
  }
])

function App() {


  return (
    <>
      <UserContextProvider>
        <ConterContextProvider>
          <WishListContextProvider>
            <QueryClientProvider client={Query}>
              <CartContextProvider>
                <RouterProvider router={x}></RouterProvider>
                <Toaster />
              </CartContextProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </WishListContextProvider>
        </ConterContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {

    let headers = { token: localStorage.getItem("userToken") }
    const [cartIdd, setcartIdd] = useState(0)
    const [CartNum, setCartNum] = useState(0)

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: productId },
            { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function getItems() {
        return (
            axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
                .then((res) => {console.log(res.data.numOfCartItems);
                    setCartNum(res.data.numOfCartItems)
                    setcartIdd(res.data.data._id)
                    return res})
                    
                .catch((err) => err)
        )
    }

    function updateProduct(productId, newCount) {
        return (
            axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count: newCount },
                { headers }
            )
                .then((res) => res)
                .catch((err) => err)
        )
    }

    function deleteProduct(productId) {
        return (
            axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers }
            )
                .then((res) => res)
                .catch((err) => err)
        )
    }

    function deleteAllItems() {
        return (
            axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                { headers }
            )
                .then((res) => res)
                .catch((err) => err)
        )
    }

    function Checkout(cartId, url, formData) {
        return (
            axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
                { shippingAddress: formData },
                { headers }
            )
                .then((res) => res)
                .catch((err) => err)
        )
    }

    useEffect(()=>{
        getItems()
    }, [])



    return (
        <CartContext.Provider value={{CartNum, setCartNum, addProductToCart, getItems, updateProduct, deleteProduct, Checkout, cartIdd, deleteAllItems}}>
            {props.children}
        </CartContext.Provider>
    )
}
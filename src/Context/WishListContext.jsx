import axios from "axios";
import { createContext } from "react";
import React from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    let headers = {};
    if (localStorage.getItem("userToken")) {
        headers = { token: localStorage.getItem("userToken") };
    }

    // ✅ إضافة منتج للـ Wishlist
    async function addProductToWishlist(productId) {
        try {
            const res = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId: productId },
                { headers }
            );
            return res;
        } catch (err) {
            console.error("Error adding product to wishlist:", err);
            return err;
        }
    }


    async function getWishlistProducts() {
        try {
            const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers,
            });
            return res;
        } catch (err) {
            console.error("Error fetching wishlist products:", err);
            return err;
        }
    }

    async function deleteWishlistItem(productId) {
        try {
            const res = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers }
            );
            return res;
        } catch (err) {
            console.error("Error deleting wishlist item:", err);
            return err;
        }
    }

    return (
        <WishlistContext.Provider
            value={{ addProductToWishlist, getWishlistProducts, deleteWishlistItem }}
        >
            {props.children}
        </WishlistContext.Provider>
    );
}

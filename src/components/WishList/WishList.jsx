import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function Wishlist() {
  let { getWishlistProducts, deleteWishlistItem } = useContext(WishlistContext);
  let { addProductToCart, setCartNum, CartNum } = useContext(CartContext);
  const [WishDetails, setWishDetails] = useState([]);
  const [idItem, setIdItem] = useState(0);

  async function getWishlist() {
    let response = await getWishlistProducts();
    setWishDetails(response.data.data);
  }

  async function deleteItem(productId) {
    let response = await deleteWishlistItem(productId);
    console.log("Delete Response:", response);
  
    if (response.data.status === "success") {
      setWishDetails((prevWishlist) => {
        const updatedWishlist = prevWishlist.filter((item) => item.id !== productId);
        console.log("Updated Wishlist:", updatedWishlist);
        return updatedWishlist;
      });
    }
  }

  async function addToCart(id) {

    setIdItem(id);
    let res = await addProductToCart(id);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      setCartNum(CartNum + 1)
      deleteItem(id);
    } else {
      toast.error(res.data.message);
    }

  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* Table Header */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Remove</th>
              <th className="px-6 py-3">To Cart</th>
            </tr>
          </thead>
          <tbody>
            {WishDetails.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.title}
                  />
                </td>
                <td className="text-[#86A789] px-6 py-4 font-semibold text-xl dark:text-white">
                  {product.title}
                </td>
                <td className="px-6 py-4 text-black font-bold">{product.price} EGY</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
                <td><button onClick={()=> addToCart(product.id)}>Add To Cart</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




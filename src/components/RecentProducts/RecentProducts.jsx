import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { WishlistContext } from "../../Context/WishListContext";

export default function RecentProducts() {
  let { data, isError, error, isLoading } = useProducts();
  let { addProductToCart, setCartNum, CartNum} = useContext(CartContext);
  let { addProductToWishlist, deleteWishlistItem, getWishlistProducts } = useContext(WishlistContext);
  
  const [loading, setLoading] = useState(false);
  const [idItem, setIdItem] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]); 

  useEffect(() => {
    async function fetchWishlist() {
      let response = await getWishlistProducts();
      if (response.data?.data) {
        setWishlistItems(response.data.data.map((item) => item.id)); 
      }
    }
    fetchWishlist();
  }, []);

  async function addToCart(id) {
    setLoading(true);
    setIdItem(id);
    let res = await addProductToCart(id);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      setCartNum(CartNum + 1)
    } else {
      toast.error(res.data.message);
    }
    setLoading(false);
  }

  async function handleWishlist(id) {
    if (wishlistItems.includes(id)) {
      await deleteWishlistItem(id);
      setWishlistItems((prev) => prev.filter((itemId) => itemId !== id)); // إزالة المنتج من القائمة
      toast.success("Removed from Wishlist");
    } else {
      await addProductToWishlist(id);
      setWishlistItems((prev) => [...prev, id]); // إضافة المنتج للقائمة
      toast.success("Added to Wishlist");
    }
  }

  if (isError) {
    return <h2>{error}</h2>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap py-5 ">
        {data?.data?.data.map((Product) => (
          <div className="w-1/2 md:w-1/4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#86A789] dark:hover:border-blue-400 transition duration-300" key={Product.id}>
            <Link to={`ProductsDetails/${Product.id}/${Product.category.name}`}>
              <div className="product p-5">
                <img src={Product.imageCover} className="w-full" alt="Product" />
                <h3 className="mb-1 text-[#86A789]">{Product.category.name}</h3>
                <h3 className="font-bold">
                  {Product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between">
                  <h3>{Product.price} EGP</h3>
                  <span>
                    <i className="fas fa-star text-yellow-300"></i>
                    {Product.ratingsAverage}
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex justify-between items-center flex-col md:flex-row">
              <button
                onClick={() => addToCart(Product.id)}
                className="btn mt-2 ml-5 flex items-center justify-center"
              >
                {loading && idItem === Product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
              <button onClick={() => handleWishlist(Product.id)}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={wishlistItems.includes(Product.id) ? "text-red-500 scale-110 md:me-7" : "text-gray-400 md:me-7"}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

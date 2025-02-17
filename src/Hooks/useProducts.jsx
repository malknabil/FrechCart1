import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {

    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }


    let ProductsInfo = new useQuery({
        queryKey: ["recentProducts"],
        queryFn: getProducts,
    })
    return (
        ProductsInfo
    )
}

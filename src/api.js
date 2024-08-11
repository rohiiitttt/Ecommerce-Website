import axios from 'axios';
import React from 'react';

export function getProductList(setProductList) { 
  return axios.get("https://dummyjson.com/products").then(function(response){
    return response.data.products;
  });
}
export function getProductData(id){
  return axios.get(`https://dummyjson.com/products/` + id);
}

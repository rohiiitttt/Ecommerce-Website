  import axios from 'axios';

  export function getProductList({sortBy,search,page,sortType}) { 
    let params = {};

    if(sortBy){
      params.sortBy = sortBy;
    }
    if(search){
      params.search = search;
    }
    if(page){
      params.page = page;
    }
    if(sortType){
      params.sortType = sortType;
    }



    return axios.get("https://myeasykart.codeyogi.io/products"
      ,{
        params,
      })
      .then(function(response){
      console.log("response:response.data")
      return response.data;
    });
  }
  export function getProductData(id){
    return axios.get(`https://myeasykart.codeyogi.io/product/` + id).then(function(response){
      return response.data;
    });
  }

  export function getProductByIds(ids) {
    const commaSeparatedIds = ids.join();
    return axios.get("https://myeasykart.codeyogi.io/products/bulk", {
      params: {
        ids: commaSeparatedIds,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching products by IDs:", error);
      throw error;
    });
  }
  
  export function saveCart(cart){
  axios.post("https://myeasykart.codeyogi.io/products/carts",{data: cart}).then((response) => {return response.data})
}
  export function getCart( ){
  axios.get("https://myeasykart.codeyogi.io/products/carts",{
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }).then((response) => {return response.data})
}
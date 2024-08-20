import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Product from './Product';
import NoMatchFound from './NoMatchFound';
import { getProductList } from './api';
import Loading from './Loading';

function ProductList() {
  console.log("ProductstPage running...");
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    console.log("api running...");
    getProductList().then(function(products){
      setProductList(products);
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    setQuery(event.target.value);
  },[]);

  const data = useMemo(() => {
    const filteredData = productList.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === 'AtoZ') {
      return filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'highlow') {
      return filteredData.sort((a, b) => b.price - a.price);
    } else if (sort === 'lowhigh') {
      return filteredData.sort((a, b) => a.price - b.price);
    }

    return filteredData;
  }, [productList, query, sort]);

  const handleSortChange = useCallback((event) => {
    setSort(event.target.value);
  },[]);

  if (productList.length === 0) {
    return <Loading />;
  }

  return (
    <div className="mx-4 sm:mx-8 mt-6 sm:mt-10 p-4 sm:p-6 mb-4 shadow-xl bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <input 
          className="border border-gray-300 rounded-md w-full sm:w-60 pl-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Search products..." 
          value={query} 
          onChange={handleQueryChange} 
        />
        <select 
          onChange={handleSortChange}
          value={sort}
          className="p-2 border sm:text-sm border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="default">Default Sorting</option>
          <option value="AtoZ">Sort by A to Z</option>
          <option value="lowhigh">Sort by price: Low to High</option>
          <option value="highlow">Sort by price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.length > 0 ? (
          data.map((product) => (
            <Product key={product.id} {...product} />
          ))
        ) : (
          <NoMatchFound />
        )}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <button className="text-red-400 border border-red-400 px-3 py-2 rounded-md hover:bg-red-100 transition">1</button>
        <button className="text-red-400 border border-red-400 px-3 py-2 rounded-md hover:bg-red-100 transition">2</button>
        <button className="text-red-400 border border-red-400 px-3 py-2 rounded-md hover:bg-red-100 transition">-&gt;</button>
      </div>
    </div>
  );
}

export default ProductList;

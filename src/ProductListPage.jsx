import { useState, useEffect, useCallback } from 'react';
import Product from './Product';
import NoMatchFound from './NoMatchFound';
import { getProductList } from './api';
import Loading from './Loading';
import { Link, useSearchParams } from 'react-router-dom';

function ProductList() {
  console.log("ProductListPage running...");

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "default";
  let page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchProducts = async () => {
      let sortType;
      let sortBy;

      if (sort === "title") {
        sortBy = "title";
      } else if (sort === "price") {
        sortBy = "price";
      } else if (sort === "pricehighlow") {
        sortBy = "price";
        sortType = "desc";
      }

      console.log("API running...");
      setLoading(true);
      try {
        const { data, meta } = await getProductList({ sortBy, search, page, sortType });
        setProductList(data);
        setTotalPages(meta?.last_page || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, sort, page]);

  const handleQueryChange = useCallback((event) => {
    setSearchParams({ ...searchParams, search: event.target.value, page: 1 });
  }, [searchParams, setSearchParams]);

  const handleSortChange = useCallback((event) => {
    setSearchParams({ ...searchParams, sort: event.target.value, page: 1 });
  }, [searchParams, setSearchParams]);

  // const handlePageChange = useCallback((newPage) => {
  //   setSearchParams({ ...searchParams, page: newPage });
  // }, [searchParams, setSearchParams]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 mx-4 mt-6 mb-4 bg-white rounded-lg shadow-xl sm:mx-8 sm:mt-10 sm:p-6">
      <div className="flex flex-col items-center justify-between mb-4 space-y-4 sm:flex-row sm:mb-6 sm:space-y-0">
        <input 
          className="w-full py-2 pl-3 text-gray-700 border border-gray-300 rounded-md sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Search products..." 
          value={search} 
          onChange={handleQueryChange} 
        />
        <select 
          onChange={handleSortChange}
          value={sort}
          className="w-full p-2 text-gray-700 border border-gray-300 rounded-md sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
        >
          <option value="default">Default Sorting</option>
          <option value="title">Sort by A to Z</option>
          <option value="price">Sort by price: Low to High</option>
          <option value="pricehighlow">Sort by price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
        {productList.length > 0 ? (
          productList.map((product) => (
            <Product key={product.id} {...product} />
          ))
        ) : (
          <NoMatchFound />
        )}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link 
            key={index}
            className={`px-3 py-2 transition border rounded-md hover:bg-red-100 ${page === index + 1 ? 'text-blue-500 border-blue-500' : 'text-red-400 border-red-400'}`}
            to={`?page=${index + 1}&search=${search}&sort=${sort}`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

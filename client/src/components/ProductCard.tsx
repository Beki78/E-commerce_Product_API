import { useContext, useEffect, useState } from "react";
import { IoBagAddOutline } from "react-icons/io5";
import { MyContext } from "../context/state";

interface CategoryMap {
  [key: string]: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  image_url: string;
  category: string;
}

// Base URL for API
const baseURL = "http://127.0.0.1:8000";

// Category mapping
const categoryMap: CategoryMap = {
  FD: "Food",
  EL: "Electronics",
  CL: "Clothing",
  FN: "Furniture",
  HM: "Home",
  VH: "Vehicle",
  HA: "Home Accessories",
};

const ProductCard = () => {
  const { setCurrentId } = useContext(MyContext) || {};
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryParam = selectedCategory
          ? `&category=${selectedCategory}`
          : "";
        const response = await fetch(
          `${baseURL}/api/products/?page=${currentPage}${categoryParam}`
        );
        const data = await response.json();
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory]); // Add selectedCategory to dependencies

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="">
      {/* Category Filter */}
      <div className="mb-4 flex justify-center  w-full">
        {Object.entries(categoryMap).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)} // Update selected category
            className={`mr-2 p-2 border rounded ${
              selectedCategory === key
                ? "bg-indigo-500 text-white"
                : "text-indigo-500"
            }`}
          >
            {value}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)} // Reset category filter
          className={`mr-2 p-2 border rounded ${
            selectedCategory === null
              ? "bg-indigo-500 text-white"
              : "text-indigo-500"
          }`}
        >
          All
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-semibold text-gray-600">
            No products available.
          </p>
        </div>
      )}

      <section
        id="ProductCard"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-12 gap-x-14 mt-10 mb-5"
      >
        {filteredProducts.map((product) => (
          <div
            onClick={() => {
              setCurrentId?.(product.id);
            }}
            key={product.id}
            className="w-72 bg-white shadow-md rounded-xl duration-300 hover:shadow-xl"
          >
            <a href="">
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={`${baseURL}${product.image_url}`}
                  alt={product.name}
                  className="h-80 w-72 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.name}
                </p>
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {categoryMap[product.category] || product.category}
                </span>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product.price}
                  </p>
                  {product.stock_quantity > 0 ? (
                    <span className="text-sm text-green-600 ml-5">
                      In Stock: {product.stock_quantity}
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 ml-2">
                      Out of Stock
                    </span>
                  )}
                  <div className="ml-auto">
                    <IoBagAddOutline className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-full px-4 py-2 border text-base ${
              currentPage === index + 1
                ? "text-indigo-500 font-bold"
                : "text-gray-600"
            } bg-white hover:bg-gray-100`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="w-full p-4 border-t border-b border-r text-base rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

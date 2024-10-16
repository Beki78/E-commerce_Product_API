import { useEffect, useState } from "react";
import { IoBagAddOutline } from "react-icons/io5";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Navbar from "../components/Navbar";
// import { MyContext } from "../context/state";
// import ProductModal from "../components/ProductModal";
// import { ToastContainer, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Footer5 from "../components/Footer";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  image_url: string;
  category: string;
}

interface CategoryMap {
  [key: string]: string;
}

const categoryMap: CategoryMap = {
  FD: "Food",
  EL: "Electronics",
  CL: "Clothing",
  FN: "Furniture",
  HM: "Home",
  VH: "Vehicle",
  HA: "Home Accessories",
};

const baseURL = "https://e-commerce-product-api-xhr1.onrender.com";

const MyMarket = () => {
//   const context = useContext(MyContext);

//   if (!context) {
//     throw new Error("MyMarket must be used within a ContextProvider");
//   }

//   const { setOpen, triggerEditModal, modalAction, setCurrentId } = context;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseURL}/api/products/?page=${currentPage}`
        );
        const data = await response.json();
        console.log("API Response:", data); // Log the response

        if (data.results && Array.isArray(data.results)) {
          setProducts(data.results);
          setTotalPages(Math.ceil(data.count / 6));
        } else {
          console.warn("No results found or response structure is incorrect.");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Consider adding a toast notification for error feedback
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {loading ? (
          <p className="flex justify-center items-center h-96 text-3xl font-semibold text-gray-600">
            Loading...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-600">
            No products available
          </p>
        ) : (
          <section
            id="ProductCard"
            className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5"
          >
            {products.map((product) => (
              <div
                // onClick={() => setCurrentId(product.id)}
                key={product.id}
                className="relative w-72 bg-white shadow-md rounded-xl duration-300 hover:shadow-xl"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={`${baseURL}${product.image_url}`} // Adjust if necessary
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
                <div className="absolute top-2 right-2 flex space-x-2 bg-white shadow-md shadow-black p-1 rounded-lg">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                    //   triggerEditModal();
                    }}
                  >
                    <MdEdit className="w-6 h-6" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation();
                    //   setOpen(true);
                    //   setCurrentId(product.id);
                    }}
                  >
                    <MdDeleteForever className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
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
      {/* <ProductModal
        title={modalAction === "sell" ? "Sell Product" : "Edit Product"}
        buttonName={modalAction === "sell" ? "Sell" : "Update"}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}
      <Footer5 />
    </>
  );
};

export default MyMarket;

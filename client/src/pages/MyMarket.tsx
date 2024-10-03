import { useContext, useEffect } from "react";
import { IoBagAddOutline } from "react-icons/io5";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Navbar from "../components/Navbar";
import { MyContext } from "../context/state";
import ProductModal from "../components/ProductModal";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer5 from "../components/Footer";

// Type for mapping categories
interface CategoryMap {
  [key: string]: string; // Maps category codes to their full names
}

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

const baseURL = "http://127.0.0.1:8000";

const MyMarket = () => {
  const context = useContext(MyContext);

  // Check if context is available
  if (!context) {
    throw new Error("MyMarket must be used within a ContextProvider");
  }

  // Destructure necessary values from context
  const {
    products,
    setOpen,
    triggerEditModal,
    modalAction,
    setCurrentId,
    currentId,
    loading,
  } = context;

  // Use effect can be used for side effects, but in this case, it's empty.
  useEffect(() => {}, [products]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {loading ? (
          <p className="flex justify-center items-center  h-96   text-3xl font-semibold text-gray-600">
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
                onClick={() => setCurrentId(product.id)} 
                key={product.id}
                className="relative w-72 bg-white shadow-md rounded-xl duration-300 hover:shadow-xl"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={`${baseURL}${product.image_url}`} // Combine base URL with relative path
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
                      e.stopPropagation(); // Prevent click from bubbling to parent div
                      triggerEditModal();
                    }} // Open the modal for editing
                  >
                    <MdEdit className="w-6 h-6" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from bubbling to parent div
                      setOpen(true); // Open delete confirmation modal
                      console.log(currentId);
                      
                    }}
                  >
                    <MdDeleteForever className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
      <ProductModal
        title={modalAction === "sell" ? "Sell Product" : "Edit Product"} // Dynamic title
        buttonName={modalAction === "sell" ? "Sell" : "Update"} // Dynamic button text
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
      />
      <Footer5 />
    </>
  );
};

export default MyMarket;

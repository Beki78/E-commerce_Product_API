import React, { useContext, useEffect } from "react";
import { IoBagAddOutline } from "react-icons/io5";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Navbar from "../components/Navbar";
import { MyContext } from "../context/state";
import ProductModal from "../components/ProductModal";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer5 from "../components/Footer";

const MyMarket = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("MyMarket must be used within a ContextProvider");
  }

  const { products, setOpen, triggerEditModal, modalAction } = context;

  // Optionally, you can fetch products on component mount if needed
  useEffect(() => {
    // Fetch or manipulate products if necessary
  }, [products]);

  return (
    <>
      <Navbar />
      <section
        id="ProductCard"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-72 bg-white shadow-md rounded-xl duration-300 hover:shadow-xl"
          >
            <a href="#">
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-80 w-72 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.name}
                </p>
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product.category}
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
            <div className="absolute top-2 right-2 flex space-x-2 bg-white shadow-md shadow-black p-1 rounded-lg">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  // Set the product to edit in context if needed
                  triggerEditModal();
                }} // Open the modal for editing
              >
                <MdEdit className="w-6 h-6" />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => setOpen(true)} // Open delete confirmation modal
              >
                <MdDeleteForever className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </section>
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
      <Footer5/>
    </>
  );
};

export default MyMarket;

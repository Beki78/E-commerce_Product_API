import React, { useContext } from "react";
import { IoBagAddOutline } from "react-icons/io5";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Navbar from "../components/Navbar";
import { MyContext } from "../context/state";
import ProductModal from "../components/ProductModal";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyMarket = () => {
  const products = [
    // Sample products array
    {
      id: 1,
      name: "Product Name 1",
      description: "This is a brief description of Product Name 1.",
      price: 149.99,
      stockQuantity: 20,
      imageUrl:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product Name 2",
      description: "This is a brief description of Product Name 2.",
      price: 99.99,
      stockQuantity: 15,
      imageUrl:
        "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Category 2",
    },
    {
      id: 3,
      name: "Product Name 3",
      description: "This is a brief description of Product Name 3.",
      price: 199.99,
      stockQuantity: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Electronics",
    },
  ];

  const context = useContext(MyContext);

  if (!context) {
    throw new Error("MyMarket must be used within a ContextProvider");
  }

  const { setOpen, triggerEditModal, modalAction } = context;

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
                    ${product.price.toFixed(2)}
                  </p>
                  {product.stockQuantity > 0 ? (
                    <span className="text-sm text-green-600 ml-5">
                      In Stock: {product.stockQuantity}
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
                onClick={triggerEditModal} // Open the modal for editing
              >
                <MdEdit className="w-6 h-6" />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => setOpen(true)} // Delete action
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
    </>
  );
};

export default MyMarket;

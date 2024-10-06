import { useContext, useEffect } from "react";
import {

  Menu,
  MenuItems,
} from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { MyContext } from "../context/state";
import axios from "axios";



export default function Filter() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("Filter must be used within a MyProvider");
  }
  const { setProducts } = context;

  

  const fetchProducts = (search = "") => {
    const url = `https://e-commerce-product-api-xhr1.onrender.com/api/products/?search=${search}`; // Ensure the query string is correct
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data); // Update state with fetched products
      })
      .catch((err) => {
        console.error("Error fetching products:", err); // Log errors for debugging
      });
  };



  useEffect(() => {
    fetchProducts(); 
  }, []); 

  return (
    <div className="bg-white">
      <div>
    

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <div className="flex flex-col justify-center w-full text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>
           
            </div>  

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {/* Sort options can be added here */}
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
             

              <div className="lg:col-span-3">
                <ProductCard />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

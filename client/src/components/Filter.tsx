import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { MyContext } from "../context/state";
import axios from "axios";

const subCategories = [
  { name: "Vehicle", href: "#", path: "VH" },
  { name: "House", href: "#", path: "HM" },
  { name: "Home Accesories", href: "#", path: "HA" },
  { name: "Electronics", href: "#", path: "EL" },
  { name: "Cloth", href: "#", path: "CL" },
  { name: "Furniture", href: "#", path: "FN" },
  { name: "Food", href: "#", path: "FD" },
];

export default function Filter() {
  const { setSelectedCategory, setProducts } = useContext(MyContext);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
const fetchProducts = () => {
  axios
    .get("http://127.0.0.1:8000/api/products")
    .then((response) => {
      setProducts(response.data); // Set the fetched products
    })
    .catch((err) => {
      console.error(err);
    });
};
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a
                        // href={category.href}
                        onClick={() => {
                          console.log("sd");
                          setSelectedCategory(category.path);
                        }}
                        className="block px-2 py-3"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {/* <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div> */}
                </MenuItems>
              </Menu>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
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
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  onClick={fetchProducts}
                  role="list"
                  className="space-y-3  border-b w-full border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  <li className="w-full hover:bg-slate-100 pl-3 py-2 rounded-md  duration-200 ease-in-out">
                    <a className=" cursor-pointer text-[1rem] font-bold ">
                      ALL
                    </a>
                  </li>
                  {subCategories.map((category) => (
                    <li
                      key={category.name}
                      onClick={() => {
                        setSelectedCategory(category.path);
                      }}
                      className="w-full hover:bg-slate-100 pl-3 py-2 rounded-md duration-200 ease-in-out"
                    >
                      <a className=" cursor-pointer">{category.name}</a>
                    </li>
                  ))}
                </ul>
              </form>

              {/* Product grid */}

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

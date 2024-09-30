  import React, { useContext } from "react";
  import { IoBagAddOutline } from "react-icons/io5";
  import { MyContext } from "../context/state"; // Update this import to point to your context file

  const ProductCard = () => {
    const { products } = useContext(MyContext) || { products: [] }; // Get products from context

    return (
      <section
        id="ProductCard"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-12 gap-x-14 mt-10 mb-5"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-72 bg-white shadow-md rounded-xl duration-300 hover:shadow-xl"
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
          </div>
        ))}
      </section>
    );
  };

  export default ProductCard;

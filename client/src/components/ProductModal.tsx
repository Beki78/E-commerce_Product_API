import { useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { MyContext } from "../context/state";

interface Props {
  title: string;
  buttonName: string;
}

const ProductModal = ({ title, buttonName }: Props) => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("DropDown must be used within a ContextProvider");
  }

  const {
    setOpenEditModal,
    openEditModal,
    // notifyUpdate,
    products,
    currentId,
    modalAction,
    updateProduct,
    setProductName,
    setProductDesc,
    setProductCategory,
    setProductPrice,
    // setProductImageURL,
    setProductQuantity,
    productCategory,
    productDesc,
    productPrice,
    productQuantity,
    // productImageURL,
    productName,
    addProduct,
  } = context;
  const currentProduct = products.find((product) => product.id === currentId);
  const uniqueCategories = products
    .map((product) => product.category)
    .filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

  // const [newProduct, setNewProduct] = useState({
  //   name: "",
  //   description: "",
  //   price: 0,
  //   category: "",
  //   stock_quantity: 0,
  //   image_url: "",
  // });

  // Update productName whenever currentProduct changes
  useEffect(() => {
    if (currentProduct) {
      setProductName(currentProduct.name || "");
      setProductDesc(currentProduct.description || "");
    }
  }, [currentProduct]);

  return (
    <Dialog
      className="relative z-10"
      open={openEditModal}
      onClose={() => setOpenEditModal(false)}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-lg rounded-lg bg-white p-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-bold">
              {title} Product
            </Dialog.Title>
            <button onClick={() => setOpenEditModal(false)}>
              <IoMdClose className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          {modalAction === "edit" ? (
            <>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Product Description"
                  rows={3}
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Product Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="">Select Category</option>{" "}
              
                  {uniqueCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Stock Quantity"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Product Description"
                  rows={3}
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Product Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="">Select Category</option>{" "}
                  {/* Default option */}
                  {uniqueCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Stock Quantity"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={modalAction === "edit" ? updateProduct : addProduct}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {buttonName}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProductModal;

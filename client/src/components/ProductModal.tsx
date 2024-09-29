import { useContext } from "react";
import { Dialog } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { MyContext } from "../context/state";

interface Props{
    title: string
    buttonName: string
}

const ProductModal = ({title, buttonName}: Props) => {

const categories = [
{
    id: 1,
    "category": "Electronics"
}
]
const context = useContext(MyContext);

if (!context) {
  throw new Error("DropDown must be used within a ContextProvider");
}

const { setOpenEditModal, openEditModal, notifyUpdate } = context;
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
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Product Name"
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
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              New Category
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Add New Category"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Stock Quantity"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={notifyUpdate}
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

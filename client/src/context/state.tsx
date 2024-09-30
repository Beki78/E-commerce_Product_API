import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Bounce, toast } from "react-toastify";

// Define the structure of a Product
interface Products {
  id: number; // Product ID
  name: string; // Product name
  description: string; // Product description
  price: number; // Product price
  imageUrl: string; // URL of the product image
  stock_quantity: number; // Quantity in stock
  category: string;
}

interface DialogContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  modalAction: "edit" | "sell" | undefined;
  notify: () => void;
  notifyUpdate: () => void;
  notifyDelete: () => void; // New notification for delete
  triggerEditModal: () => void; // Function to open edit modal
  triggerSellModal: () => void; // Function to open sell modal
  loading: boolean; // Loading state for asynchronous actions
  products: Products[]; // List of products
  setProducts: (products: Products[]) => void; // Function to set products
  deleteProduct: (id: number) => void; // Function to delete product
}

export const MyContext = createContext<DialogContextType | undefined>(
  undefined
);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "sell">();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);

  const notify = () => {
    toast.info("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    setOpen(false);
  };

  const notifyUpdate = () => {
    toast.success("Product Updated Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    setOpenEditModal(false);
  };

  const notifyDelete = () => {
    toast.success("Product Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const triggerEditModal = () => {
    setModalAction("edit");
    setOpenEditModal(true);
  };

  const triggerSellModal = () => {
    setModalAction("sell");
    setOpenEditModal(true);
  };

  const deleteProduct = (id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/api/product_details/${id}`)
      .then((response) => {
        // Remove the product from the state
        setProducts(products.filter((product) => product.id !== id));
        setOpen(false)
        notifyDelete();
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <MyContext.Provider
      value={{
        open,
        setOpen,
        openEditModal,
        setOpenEditModal,
        modalAction,
        notify,
        notifyUpdate,
        notifyDelete,
        triggerEditModal,
        triggerSellModal,
        loading,
        products,
        setProducts,
        deleteProduct, // Add deleteProduct to context value
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

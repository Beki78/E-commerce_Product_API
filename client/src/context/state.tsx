import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Bounce, toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
  description: string;
}
interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock_quantity: number;
  category: Category;
}

interface DialogContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  modalAction: "edit" | "sell" | undefined;
  notify: () => void;
  notifyUpdate: () => void;
  notifyDelete: () => void;
  triggerEditModal: () => void;
  triggerSellModal: () => void;
  loading: boolean;
  products: Products[]; // List of products
  setProducts: (products: Products[]) => void; // Function to set products
  deleteProduct: () => void; // Function to delete product
  currentId: number | null;
  setCurrentId: (id: number | null) => void;
  setProductName: React.Dispatch<React.SetStateAction<string | number>>;
  setProductDesc: React.Dispatch<React.SetStateAction<string | number>>;
  setProductPrice: React.Dispatch<React.SetStateAction<string | number>>;
  setProductCategory: React.Dispatch<React.SetStateAction<string | number>>;
  setProductQuantity: React.Dispatch<React.SetStateAction<string | number>>;
  setProductImageURL: React.Dispatch<React.SetStateAction<string | number>>;
  productName: string | number;
  productDesc: string | number;
  productPrice: string | number;
  productCategory: string | number;
  productQuantity: string | number;
  productImageURL: string | number;
  updateProduct: () => void;
  addProduct: () => void;
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
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string | number>("");
  const [productDesc, setProductDesc] = useState<string | number>("");
  const [productPrice, setProductPrice] = useState<string | number>("");
  const [productCategory, setProductCategory] = useState<string | number>("");
  const [productQuantity, setProductQuantity] = useState<string | number>("");
  const [productImageURL, setProductImageURL] = useState<string | number>("");

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
  const updateProduct = () => {
    if (currentId) {


      axios
        .put(`http://127.0.0.1:8000/api/product_details/${currentId}`, {
          id: currentId,
          name: productName, 
          description: productDesc,
          price: productPrice,
          category: productCategory,
          stock_quantity: productQuantity,
          image_url: productImageURL,
        })
        .then((response) => {
          const updatedProducts = products.map((product) =>
            product.id === currentId ? response.data : product
          );
          setProducts(updatedProducts);
          notifyUpdate();
        })
        .catch((error) => {
          console.error("There was an error updating the product!", error);
        });
    }
  };

  const addProduct = () => {
   
    axios
      .post("http://127.0.0.1:8000/api/products/create", {
        id: currentId,
        name: productName,
        description: productDesc,
        price: productPrice,
        category: productCategory,
        stock_quantity: productQuantity,
        image_url: productImageURL,
      })
      .then((response) => {
      setProducts((prevProducts) => [...prevProducts, response.data]);
        setOpenEditModal(false);
        toast.success("Product added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);

        // Notify the user of failure
        toast.error("Error adding product, please try again.");
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

  const deleteProduct = () => {
    console.log(currentId);

    axios
      .delete(`http://127.0.0.1:8000/api/product_details/${currentId}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== currentId));
        setOpen(false);
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
        console.log(response.data);
        
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
        deleteProduct,
        currentId,
        setCurrentId,
        updateProduct,
        setProductName,
        productName,
        setProductDesc,
        setProductPrice,
        setProductCategory,
        setProductQuantity,
        setProductImageURL,
        productDesc,
        productPrice,
        productCategory,
        productQuantity,
        productImageURL,
        addProduct,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

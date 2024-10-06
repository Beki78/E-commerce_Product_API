import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Bounce, toast } from "react-toastify";

interface Category {
  id: string;
  name: string;
}
interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
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
  setProductImageURL: React.Dispatch<React.SetStateAction<File | null>>;
  productName: string | number;
  productDesc: string | number;
  productPrice: string | number;
  productCategory: string | number;
  productQuantity: string | number;
  productImageURL: File | null;
  updateProduct: () => void;
  addProduct: () => void;
  categories: Category[];
  selectedCategory: string | number;
  setSelectedCategory: (SubCategory: string) => void;
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
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Products[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string | number>("");
  const [productDesc, setProductDesc] = useState<string | number>("");
  const [productPrice, setProductPrice] = useState<string | number>("");
  const [productCategory, setProductCategory] = useState<string | number>("");
  const [productQuantity, setProductQuantity] = useState<string | number>("");
  const [productImageURL, setProductImageURL] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories] = useState<Category[]>([
    { id: "FD", name: "Food" },
    { id: "EL", name: "Electronics" },
    { id: "CL", name: "Clothing" },
    { id: "FN", name: "Furniture" },
    { id: "HM", name: "Home" },
    { id: "VH", name: "Vehicle" },
    { id: "HA", name: "Home Accessories" },
  ]);

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
      // Create a FormData object to hold the data
      const formData = new FormData();
      formData.append("id", String(currentId));
      formData.append("name", String(productName));
      formData.append("description", String(productDesc));
      formData.append("price", String(productPrice));
      formData.append("category", String(productCategory));
      formData.append("stock_quantity", String(productQuantity));

      // Check if there's an image to upload
      if (productImageURL) {
        formData.append("image", productImageURL); // Assuming productImageURL is a File object
      }

      axios
        .put(
          `http://127.0.0.1:8000/api/product_details/${currentId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Specify the content type
            },
          }
        )
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
    const formData = new FormData();

    // Append all necessary fields to formData
    formData.append("name", String(productName)); // Convert to string
    formData.append("description", String(productDesc)); // Convert to string
    formData.append("price", String(productPrice)); // Convert to string
    formData.append("category", String(productCategory)); // Convert to string
    formData.append("stock_quantity", String(productQuantity));

    if (productImageURL) {
      console.log("Appending image:", productImageURL); // Log the file object
      formData.append("image", productImageURL);
    } else {
      console.error("No image file selected!");
    }

    axios
      .post("http://127.0.0.1:8000/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure this header is set
        },
      })
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setOpenEditModal(false);
        toast.success("Product added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
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
        setProducts(response.data.results);
        console.log(response.data.results);
        console.log("Products state:", products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
         setLoading(false);
      })
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true); // Set loading to true when fetching starts
      axios
        .get(`http://127.0.0.1:8000/api/products/category/${selectedCategory}`)
        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false); // Set loading to false when data is fetched
        });
    }
  }, [selectedCategory]); // Ensure the hook re-triggers when selectedCategory changes

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
        categories,
        setSelectedCategory,
        selectedCategory,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

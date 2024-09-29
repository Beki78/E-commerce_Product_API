import React, { createContext, useState, ReactNode } from "react";
import { Bounce, toast } from "react-toastify";

interface DialogContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  modalAction: "edit" | "sell" | undefined;
  notify: () => void;
  notifyUpdate: () => void;
  triggerEditModal: () => void; // Function to open edit modal
  triggerSellModal: () => void; // Function to open sell modal
}

export const MyContext = createContext<DialogContextType | undefined>(
  undefined
);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "sell">(); // State for modal action

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

  const triggerEditModal = () => {
    setModalAction("edit");
    setOpenEditModal(true);
  };

  const triggerSellModal = () => {
    setModalAction("sell");
    setOpenEditModal(true);
  };

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
        triggerEditModal, 
        triggerSellModal, 
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

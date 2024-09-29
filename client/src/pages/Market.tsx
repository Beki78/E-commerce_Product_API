import { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer5 from "../components/Footer";
import Filter from "../components/Filter";
import { MyContext } from "../context/state";
import ProductModal from "../components/ProductModal";

const Market = () => {

   const context = useContext(MyContext);

   if (!context) {
     throw new Error("MyMarket must be used within a ContextProvider");
   }

   const { modalAction } = context;
  return (
    <div>
      <Navbar />
      <Filter />
      <Footer5 />
      <ProductModal
        title={modalAction === "sell" ? "Sell Product" : "Edit Product"} // Dynamic title
        buttonName={modalAction === "sell" ? "Sell" : "Update"} // Dynamic button text
      />
    </div>
  );
};

export default Market;

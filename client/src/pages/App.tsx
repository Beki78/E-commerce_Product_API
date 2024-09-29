import { useContext } from "react"
import Collections from "../components/Collections"
import Footer5 from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import NewsLetter from "../components/NewsLetter"
import Stats from "../components/Stats"
import Testimonial3 from "../components/Testimonials"
import TrustedBy from "../components/Trustedby"
import { MyContext } from "../context/state"
import ProductModal from "../components/ProductModal"



const App = () => {
   const context = useContext(MyContext);

   if (!context) {
     throw new Error("MyMarket must be used within a ContextProvider");
   }

   const { modalAction } = context;
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Collections />
      <Stats />
      <Testimonial3 />
      <TrustedBy />
      <NewsLetter />
      <Footer5 />
      <ProductModal
        title={modalAction === "sell" ? "Sell Product" : "Edit Product"} // Dynamic title
        buttonName={modalAction === "sell" ? "Sell" : "Update"} // Dynamic button text
      />
    </div>
  );
}

export default App
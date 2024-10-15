import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { fetchProduct } from "../features/product/ProductSlice";

const Home = () => {
  const { products, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched products:", products);
  }, [products]);
  return <div>Home</div>;
};

export default Home;

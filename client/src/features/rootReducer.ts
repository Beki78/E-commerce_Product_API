import { combineReducers } from "redux";
import productReducer from "./product/ProductSlice";
import AuthSlice from "./auth/AuthSlice";

const rootReducer = combineReducers({
  products: productReducer,
  auth: AuthSlice,
});

export default rootReducer;

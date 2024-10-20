import { combineReducers } from "redux";
import productReducer from "./product/ProductSlice";
import AuthSlice from "./auth/AuthSlice";
import CurrentUserSlice from "./auth/CurrentUserSlice";

const rootReducer = combineReducers({
  products: productReducer,
  auth: AuthSlice,
  currentuser: CurrentUserSlice,
});

export default rootReducer;

import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./app/store";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Market from "./pages/Market";
import MyMarket from "./pages/MyMarket";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Signup />;
}

const router = createBrowserRouter([
  {
    path: "/my_market",
    element: (
      <ProtectedRoute>
        <MyMarket />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <RegisterAndLogout />,
  },
  {
    path: "/market_place",
    element: <Market />,
  },{
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

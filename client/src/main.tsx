import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Error from "./pages/Error.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import Market from "./pages/Market.tsx";
import { ContextProvider } from "./context/state.tsx";
import MyMarket from "./pages/MyMarket.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/market_place",
    element: <Market />,
  },
  {
    path: "/my_market",
    element: <MyMarket />,
  },
]);

createRoot(document.getElementById("root")!).render(
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
);

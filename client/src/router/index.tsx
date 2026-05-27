import { createBrowserRouter, createHashRouter } from "react-router-dom";

import GlobalErrorPage from "../components/errors/GlobalErrorPage";
import RootLayout from "../components/layout/RootLayout";
import { lazy } from "react";

// import Home from "../features/products/pages/Home";
const Home = lazy(()=>import("../features/products/pages/Home"))

// import Products from "../features/products/pages/Products";
const Products = lazy(()=>import("../features/products/pages/Products"))

// import ProductDetail from "../features/products/pages/ProductDetail";
const ProductDetail = lazy(()=>import("../features/products/pages/ProductDetail"))

// import Cart from "../features/cart/pages/Cart";
const Cart = lazy(()=>import("../features/cart/pages/Cart"))

// import Login from "../features/auth/pages/Login";
const Login = lazy(()=>import("../features/auth/pages/Login"))

// import Signup from "../features/auth/pages/Signup";
const Signup = lazy(()=>import("../features/auth/pages/Signup"))

// import Settings from "../features/settings/pages/Settings";
const Settings = lazy(()=>import("../features/settings/pages/Settings"))

// import ProtectRouter from "./ProtectedRouter";
const ProtectRouter = lazy(()=>import("./ProtectedRouter"))

// import { authLoader } from "./ProtectedRouteLoader";

export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "cart",
        element: (
          <ProtectRouter>
            <Cart />
          </ProtectRouter>
          ),
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

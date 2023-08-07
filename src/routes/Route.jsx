import { createBrowserRouter } from "react-router-dom";

import Registration from "../pages/Registration";
import Main from "../layout/Main";
import Home from "../components/Home";
import AddProductForm from "../components/AddProducts";
import LoginForm from "../pages/Login";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-product",
        element: <AddProductForm></AddProductForm>,
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/AllProducts",
        element: <AllProducts></AllProducts>,
      },
      { path: "/ProductDetails/:id",
       element: <ProductDetails></ProductDetails> 
      },
    ],
  },
]);

import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import Layout from "./components/Layout";
import Product from "./components/Product/Product";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cards from "./components/Cards/Cards";
import Signup from "./components/Signup/Signup";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import Carts from "./components/Carts/Carts";
import ProductDetails from "./components/ProductDetails";
import Orders from "./components/Orders";
import BrandsDetails from "./components/BrandsDetails";
import Checkout from "./components/Checkout";
import Catedetails from "./components/Catedetails";
import Forgetpass from "./components/Forgetpass";
import Resetpass from "./components/Resetpass";
import Newpassword from "./components/Newpassword";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./components/Context/UserContext";

function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Login></Login> },
        {
          path: "Home",
          element: (
            <ProtectRoute>
              <Home></Home>
            </ProtectRoute>
          ),
        },
        {
          path: "Product",
          element: (
            <ProtectRoute>
              <Product></Product>
            </ProtectRoute>
          ),
        },
        // {
        //   path: "Checkout",
        //   element: (
        //     <ProtectRoute>
        //       <Checkout></Checkout>
        //     </ProtectRoute>
        //   ),
        // },
        {
          path: "allorders",
          element: (
            <ProtectRoute>
              <Orders></Orders>
            </ProtectRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectRoute>
              <Categories></Categories>
            </ProtectRoute>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectRoute>
              <Brands></Brands>
            </ProtectRoute>
          ),
        },
        {
          path: "Carts",
          element: (
            <ProtectRoute>
              <Carts></Carts>
            </ProtectRoute>
          ),
        },
        {
          path: "Checkout",
          element: (
            <ProtectRoute>
              <Checkout></Checkout>
            </ProtectRoute>
          ),
        },
        {
          path: "Catedetails/:id/subcategories",
          element: (
            <ProtectRoute>
              <Catedetails></Catedetails>
            </ProtectRoute>
          ),
        },
        {
          path: "Forgetpass",
          element: <Forgetpass></Forgetpass>,
        },
        {
          path: "Resetpass",
          element: <Resetpass></Resetpass>,
        },
        {
          path: "Newpassword",
          element: <Newpassword></Newpassword>,
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectRoute>
              <ProductDetails></ProductDetails>
            </ProtectRoute>
          ),
        },
        {
          path: "BrandsDetails/:id",
          element: (
            <ProtectRoute>
              <BrandsDetails></BrandsDetails>
            </ProtectRoute>
          ),
        },
        {
          path: "Cards",
          element: (
            <ProtectRoute>
              <Cards></Cards>
            </ProtectRoute>
          ),
        },
        { path: "Signup", element: <Signup></Signup> },
        { path: "*", element: <Notfound></Notfound> },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routes} />
      </UserContextProvider>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;

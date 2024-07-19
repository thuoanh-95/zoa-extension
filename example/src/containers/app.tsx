import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from "../views/products";
import ProductDetail from "../views/product-detail";
import Settings from "../views/settings";


const routes = [{
  path: "/zone",
  element: <Products />,
}, {
  path: "/settings",
  element: <Settings />,
}, {
  path: "/products/:id",
  element: <ProductDetail />,
}]


const router = createBrowserRouter(routes, { basename: "/extensions/3126224783690575731" })


export default function App() {
  return <RouterProvider router={router} />
}

import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from "../views/products";
import ProductDetail from "../views/product-detail";
import Settings from "../views/settings";


const appId = process.env.APP_ID;

const routes = [{
  path: "/zone/admin-dashboard-primary-area-block",
  element: <Products />,
}, {
  path: "/settings",
  element: <Settings />,
}, {
  path: "/products/:id",
  element: <ProductDetail />,

}]


const router = createBrowserRouter(routes, { basename: `/extensions/${appId}` })


export default function App() {
  return <RouterProvider router={router} />
}

import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";

const Home = lazy(() => import("../pages/Home"));
const Blog = lazy(() => import("../pages/Blog"));
const Article = lazy(() => import("../pages/Article"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App handles Layout and Providers
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <Article />,
      },
    ],
  },
]);

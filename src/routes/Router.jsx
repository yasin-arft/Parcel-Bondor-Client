import Main from "@/layouts/Main";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home/>
      }
    ]
  }
]);

export default Router;
import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signUp/SignUp";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign_up',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: []
  },
]);

export default Router;
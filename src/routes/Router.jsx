import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signUp/SignUp";
import Profile from "@/pages/userDashboard/profile/Profile";
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
    children: [
      // user's routes
      {
        path: 'profile',
        element: <Profile />
      },


      // delivery man's routes
      {
        path: 'delivery_list'
      },
      {
        path: 'my_reviews'
      },


      // admin's routes
      {
        path: 'all_parcels'
      },
    ]
  },
]);

export default Router;
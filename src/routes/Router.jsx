import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signUp/SignUp";
import BookParcel from "@/pages/userDashboard/bookParcel/BookParcel";
import Profile from "@/pages/userDashboard/profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MyParcels from "@/pages/userDashboard/myParcels/MyParcels";

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
      {
        path: '',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },

      // user's routes
      {
        path: 'book_parcel',
        element: <PrivateRoute><BookParcel /></PrivateRoute>
      },
      {
        path: 'my_parcel',
        element: <PrivateRoute><MyParcels /></PrivateRoute>
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
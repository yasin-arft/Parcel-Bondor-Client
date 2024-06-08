import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signUp/SignUp";
import BookParcel from "@/pages/userDashboard/bookParcel/BookParcel";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MyParcels from "@/pages/userDashboard/myParcels/MyParcels";
import UpdateParcel from "@/pages/userDashboard/updateParcel/UpdateParcel";
import DashboardHome from "@/pages/dashboardHome/DashboardHome";
import AllParcels from "@/pages/adminDashboard/allParcels/AllParcels";
import AllUsers from "@/pages/adminDashboard/allUsers/AllUsers";
import AllDeliveryMen from "@/pages/adminDashboard/allDeliveryMen/AllDeliveryMen";

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
        element: <PrivateRoute><DashboardHome /></PrivateRoute>
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
      {
        path: 'update_parcel/:id',
        element: <PrivateRoute><UpdateParcel /></PrivateRoute>
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
        path: 'all_parcels',
        element: <PrivateRoute><AllParcels /></PrivateRoute>
      },
      {
        path: 'all_users',
        element: <AllUsers />
      },
      {
        path: 'all_delivery_men',
        element: <AllDeliveryMen />
      },
    ]
  },
]);

export default Router;
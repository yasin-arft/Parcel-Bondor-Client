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
import MyDeliveryList from "@/pages/deliveryManDashboard/myDeliveryList/MyDeliveryList";
import MyReviews from "@/pages/deliveryManDashboard/myReviews/MyReviews";
import Checkout from "@/pages/userDashboard/checkout/Checkout";
import PaymentSuccess from "@/pages/userDashboard/checkout/PaymentSuccess";
import ContactUs from "@/pages/contactUs/ContactUs";

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
      },
      {
        path: '/contact_us',
        element: <ContactUs />
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
      {
        path: 'checkout/:id',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },


      // delivery man's routes
      {
        path: 'my_delivery_list/:id',
        element: <MyDeliveryList />
      },
      {
        path: 'my_reviews/:id',
        element: <MyReviews />
      },


      // admin's routes
      {
        path: 'all_parcels',
        element: <PrivateRoute><AllParcels /></PrivateRoute>
      },
      {
        path: 'all_delivery_men',
        element: <AllDeliveryMen />
      },
      {
        path: 'all_users',
        element: <AllUsers />,
        loader: () => fetch(`${import.meta.env.VITE_server_URL}/totalUser`)
      },
    ]
  },
  {
    path: '/payment_success',
    element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
  },
]);

export default Router;
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import NavItem from "../navbar/NavItem";
import logo from '../../../assets/logo.png';
import { Link } from "react-router-dom";
import useUser from "@/hooks/useUser";


const DashboardSidebar = () => {
  const { userData } = useUser();
  const userRole = userData?.role;
  const navData = userRole === 'admin' ?
    [
      { path: '/dashboard', text: 'Statistics' },
      { path: '/dashboard/all_parcels', text: 'All Parcels' },
      { path: '/dashboard/all_delivery_men', text: 'All Delivery Men' },
      { path: '/dashboard/all_users', text: 'All Users' },
    ] :
    userRole === 'deliveryMan' ?
      [
        { path: '/dashboard', text: 'My Profile' },
        { path: `/dashboard/my_delivery_list/${userData._id}`, text: 'My Delivery List' },
        { path: `/dashboard/my_reviews/${userData._id}`, text: 'My Reviews' },
      ] :
      [
        { path: '/dashboard', text: 'My Profile' },
        { path: '/dashboard/book_parcel', text: 'Book A Parcel' },
        { path: '/dashboard/my_parcel', text: 'My Parcel' }
      ];


  return (
    <aside className="bg-red-light min-h-screen p-4 ">
      <div className="bg-white rounded-md my-5 p-2">
        <Link to='/'>
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
      </div>
      <NavigationMenu className="items-start">
        <NavigationMenuList className="flex-col space-x-0 space-y-3 items-start">
          {navData.map((item, idx) => <NavItem key={idx} item={item} />)}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
};

export default DashboardSidebar;
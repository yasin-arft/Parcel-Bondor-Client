import PropTypes from 'prop-types';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import NavItem from "../navbar/NavItem";
import logo from '../../../assets/logo.png';
import { Link } from "react-router-dom";
import useUser from "@/hooks/useUser";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { IoMenu } from "react-icons/io5";

const DashboardSidebar = ({ drawer = false }) => {
  const { userData, isUserLoading } = useUser();
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
      userRole === 'user' ?
        [
          { path: '/dashboard', text: 'My Profile' },
          { path: '/dashboard/book_parcel', text: 'Book A Parcel' },
          { path: '/dashboard/my_parcel', text: 'My Parcel' }
        ] :
        [];

  if (isUserLoading) return

  return (
    <>
      {
        drawer ?
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className='text-3xl p-0 h-auto bg-transparent border-0 text-white'>
                <IoMenu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="bg-white rounded-md my-5 p-2">
                <SheetClose>
                  <Link to='/'>
                    <img src={logo} alt="Logo" className="h-10" />
                  </Link>
                </SheetClose>
              </div>
              <NavigationMenu className="items-start">
                <NavigationMenuList className="flex-col space-x-0 space-y-3 items-start">
                  {navData.map((item, idx) => (
                    <SheetClose key={idx}><NavItem item={item} /></SheetClose>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
          :
          <>
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
          </>
      }
    </>
  );
};

DashboardSidebar.propTypes = {
  drawer: PropTypes.bool
};

export default DashboardSidebar;
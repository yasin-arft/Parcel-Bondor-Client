import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import { FaRegBell } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import NavItem from "./NavItem";
import useAuth from "@/hooks/useAuth";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navData = [
    { path: '/', text: 'Home' },
    { path: '/dashboard', text: 'Dashboard' },
    { path: '/notification', text: <FaRegBell className="text-xl" /> }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <NavigationMenu className="container max-w-screen-2xl py-2 flex justify-between bg-white rounded-md shadow-md">
        <NavigationMenuList>
          <Link to={'/'}>
            <img src={logo} alt="logo" className="max-h-12" />
          </Link>
        </NavigationMenuList>
        <div className="flex gap-3 items-center">
          <NavigationMenuList>
            {navData.map((item, idx) => <NavItem key={idx} item={item} />)}
          </NavigationMenuList>
          {user ?
            <UserProfile /> :
            <Button onClick={() => navigate('/login')} className="bg-red-light hover:bg-red-deep">Login</Button>
          }
        </div>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
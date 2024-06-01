import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import { FaRegBell } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import NavItem from "./NavItem";

const Navbar = () => {
  // TODO: load user
  const user = true;
  const navigate = useNavigate();

  const navData = [
    { path: '/', text: 'Home' },
    { path: '/dashboard', text: 'Dashboard' },
    { path: '/notification', text: <FaRegBell className="text-xl" /> }
  ];

  return (
    <header>
      <NavigationMenu className="container max-w-full py-2 flex justify-between">
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
            <div className="size-6 rounded-full">
              {/* TODO: load user image */}
              <img src="https://i.ibb.co/n7xGsYb/images.jpg" alt="Profile picture" />
            </div> :
            <Button onClick={() => navigate('/login')} className="bg-red-light hover:bg-red-deep">Login</Button>
          }
        </div>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
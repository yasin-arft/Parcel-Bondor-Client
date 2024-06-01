import {
  NavigationMenuItem,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom";

const NavItem = ({item}) => {
  const {path, text} = item;
  return (
    <NavigationMenuItem>
      <NavLink to={path} className={navigationMenuTriggerStyle()}>
        {text}
      </NavLink>
    </NavigationMenuItem>
  );
};

export default NavItem;
import {
  NavigationMenuItem,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const NavItem = ({ item }) => {
  const { path, text } = item;
  return (
    <NavigationMenuItem>
      <NavLink to={path} className={navigationMenuTriggerStyle()}>
        {text}
      </NavLink>
    </NavigationMenuItem>
  );
};

NavItem.propTypes = {
  item: PropTypes.object
};

export default NavItem;
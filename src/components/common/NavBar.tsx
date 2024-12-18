import { FC } from "react";
import {
  Navbar as NextUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Badge,
} from "@nextui-org/react";
import { FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import ProfileOptions from "../profile/ProfileOptions";
import DarkModeSwitch from "./DarkModeSwitch";
import useCart from "../../hooks/useCart";

interface Props {}

const NavBar: FC<Props> = () => {
  const { totalCount } = useCart();

  return (
    <NextUINav>
      <NavbarBrand>
        <Link to="/" className="flex items-center justify-center space-x-4">
          <FaBookReader size={24} />
          <p className="font-bold text-inherit"> E-Book</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <DarkModeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Link to="/cart">
            <Badge color="danger" content={totalCount} shape="circle">
              <FaCartShopping size={24} />
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ProfileOptions />
        </NavbarItem>
      </NavbarContent>
    </NextUINav>
  );
};

export default NavBar;

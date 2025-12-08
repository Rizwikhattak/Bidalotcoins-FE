import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { GLOBAL_ROUTES } from "../../utils/Constants";
import LogoImage from "../../assets/images/Bidalot-primary-logo-dark.png";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        scrolled ? "border-b  backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={GLOBAL_ROUTES.HOME} className="flex items-center gap-2">
          <img src={LogoImage} alt="" className="h-16 w-20 object-contain" />
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `bg-transparent rounded-none border-b-2 border-transparent  ${
                    activePage === GLOBAL_ROUTES.HOME
                      ? "border-b-2 border-primary"
                      : "hover:border-b-2 border-primary"
                  }`
                )}
                asChild
              >
                <Link to={GLOBAL_ROUTES.HOME} className="hover:bg-transparent">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent ">
                Auction
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/auctions"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          All Auctions
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Browse all live and upcoming auctions
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/auctions/live"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Live Auctions
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Bid now on active auctions
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `bg-transparent rounded-none   ${
                    activePage === GLOBAL_ROUTES.BUY_NOW
                      ? "border-b-2 border-primary"
                      : "hover:border-b-2 border-primary"
                  }`
                )}
                asChild
              >
                <Link className="hover:bg-transparent" to="/buy-now">
                  Buy It Now
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `bg-transparent rounded-none   ${
                    activePage === GLOBAL_ROUTES.NEWS
                      ? "border-b-2 border-primary"
                      : "hover:border-b-2 border-primary"
                  }`
                )}
                asChild
              >
                <Link className="hover:bg-transparent" to="/news">
                  News & Updates
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  `bg-transparent rounded-none   ${
                    activePage === GLOBAL_ROUTES.CONTACT
                      ? "border-b-2 border-primary"
                      : "hover:border-b-2 border-primary"
                  }`
                )}
                asChild
              >
                <Link className="hover:bg-transparent" to="/contact">
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full border border-foreground"
          >
            <Link className="hover:bg-transparent" to="/login">
              Login
            </Link>
          </Button>
          <Button className="rounded-full bg-foreground">
            <Link className="hover:bg-transparent" to="/register">
              Register
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

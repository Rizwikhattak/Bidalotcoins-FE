import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// import { getBreadcrumbs } from "../Utils/Helpers";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import SidebarCommon from "../common/SidebarCommon";
import HeaderCommon from "../common/HeaderCommon";
import { useTheme } from "../../hooks/useTheme";
import { Switch } from "../ui/switch";
import { APP_CONSTANTS } from "../../utils/Constants";
import { Moon, Sun } from "lucide-react";
import Breadcrumb from "../common/BreadCrumbs";

const SidebarLayout = ({ children }) => {
  const location = useLocation();

  let pathName = location.pathname.slice(1);
  pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
  const [currentElement, setCurrentElement] = useState(pathName);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  // const breadcrumbs = getBreadcrumbs(pathname);
  // function getCookieValue(name) {
  //   const cookies = document.cookie.split("; ");
  //   console.log("Cookies", cookies);
  //   const cookie = cookies.find((row) => row.includes(name));
  //   console.log(cookie.split("=")[1]);
  //   return cookie ? (cookie.split("=")[1] === "false" ? false : true) : null;
  // }

  // // Example:
  // const sidebarState = getCookieValue("sidebar_state");
  // console.log(sidebarState); // "true" or "false"

  return (
    <div className=" h-full w-full overflow-hidden">
      <SidebarProvider className="">
        <SidebarCommon
          currentElement={currentElement}
          hadnleCurrentElement={(value) => setCurrentElement(value)}
        />
        <main className="w-full overflow-hidden">
          <div className="flex items-center justify-between gap-2 mr-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Breadcrumb />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="themeToggler"
                checked={theme === APP_CONSTANTS.DARK_THEME}
                onCheckedChange={toggleTheme}
                className="relative overflow-hidden cursor-pointer"
              >
                {/* overlay icons */}
                <Sun
                  className={`absolute h-5 w-5 text-yellow-500 transition-all duration-300
            ${
              theme === APP_CONSTANTS.DARK_THEME
                ? "opacity-0 scale-50"
                : "opacity-100 scale-100"
            }`}
                />
                <Moon
                  className={`absolute h-5 w-5 text-blue-500 transition-all duration-300
            ${
              theme === APP_CONSTANTS.DARK_THEME
                ? "opacity-100 scale-100"
                : "opacity-0 scale-50"
            }`}
                />
              </Switch>
              <label htmlFor="themeToggler">
                {theme === APP_CONSTANTS.DARK_THEME
                  ? "Dark Mode"
                  : "Light Mode"}
              </label>
            </div>
          </div>
          <div className="px-7 pt-3 ">{children}</div>
        </main>
        {/* <div
          className={`
          w-full h-svh flex flex-col overflow-hidden`}
        >
          <MainPageContent
            currentElement={currentElement}
            children={children}
          />
        </div> */}
      </SidebarProvider>
    </div>
  );
};

export const MainPageContent = ({ currentElement, children }) => {
  const parentRef = useRef(null);
  const injectedChildren = React.isValidElement(children)
    ? React.cloneElement(children, { parentRef })
    : children;
  return (
    <main
      className="flex-1 overflow-y-auto flex flex-col relative"
      ref={parentRef}
    >
      <div className="flex items-center gap-3 pt-3 pb-1">
        <SidebarTrigger className="!p-0" />
        <HeaderCommon currentElement={currentElement} />
      </div>
      <div className="pages flex-1 flex flex-col">{injectedChildren}</div>
    </main>
  );
};
export default SidebarLayout;

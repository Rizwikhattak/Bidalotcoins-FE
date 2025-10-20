import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// import { getBreadcrumbs } from "../Utils/Helpers";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import SidebarCommon from "../common/SidebarCommon";
import HeaderCommon from "../common/HeaderCommon";

const SidebarLayout = ({ children }) => {
  const location = useLocation();

  let pathName = location.pathname.slice(1);
  pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);
  const [currentElement, setCurrentElement] = useState(pathName);
  const { pathname } = useLocation();
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
        <main className="w-full">
          <div className="flex items-center ">
            <SidebarTrigger />
            <HeaderCommon />
          </div>
          <div className="p-7">{children}</div>
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

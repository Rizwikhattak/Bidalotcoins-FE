import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import SpinnerCommon from "./SpinnerCommon";

const NavigationCommon = ({
  navList = [],
  activeTab,
  handleActiveTab,
  isLoading = false,
  ...props
}) => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {isLoading ? (
            <SpinnerCommon className="w-10 h-10" />
          ) : (
            navList &&
            navList.map((navItem, index) => (
              <NavigationMenuItem
                key={index}
                className={`${
                  activeTab?.label === navItem?.label
                    ? "!text-primary border-b border-primary group"
                    : ""
                } !pb-2 box-border hover:border-b hover:border-primary hover:text-primary h-10`}
              >
                <NavigationMenuLink
                  //  hover:!bg-transparent
                  className={`flex items-center gap-2 ${navigationMenuTriggerStyle()} cursor-pointer`}
                  onClick={() => handleActiveTab(navItem)}
                  {...props}
                >
                  <span
                    className={`${
                      activeTab?.label === navItem?.label
                        ? "group-hover:text-primary"
                        : ""
                    }`}
                  >
                    {navItem?.name}
                  </span>
                  {(navItem?.count || navItem?.count === 0) && (
                    <span
                      className={`total-count mb-1 text-white w-6 h-6 flex items-center justify-center rounded-lg text-xs ${
                        activeTab?.label === navItem?.label
                          ? "!bg-primary"
                          : "bg-gray-300"
                      }`}
                    >
                      <span>{navItem?.count}</span>
                    </span>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default NavigationCommon;

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/features/auth/authSlice";
import { authRequiredRoutes } from "@/routes.js";
import { APP_CONSTANTS, GLOBAL_ROUTES } from "../../utils/Constants";
import BidalotLogo from "@/assets/images/Bidalot-primary-logo-dark.png";
import { useLogoutUserMutation } from "../../app/features/auth/authApi";
import { TypographyH3 } from "./Typography";
const SidebarCommon = () => {
  const { state } = useSidebar();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log("PERMISSIONSSSSSSSSSS", auth?.permissions);
  const LABEL_TO_GROUP_TITLE = {
    [APP_CONSTANTS.DASHBOARD_LABEL]: "",
    [APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL]: "Auction & Activities",
    [APP_CONSTANTS.USERS_LABEL]: "Users",
    [APP_CONSTANTS.HELP_AND_SUPPORT_LABEL]: "Help & Support",
    [APP_CONSTANTS.SYSTEM_NOTIFICATIONS_LABEL]: "System & Notifications",
  };

  const customizedRoutes = groupRoutes(authRequiredRoutes);
  console.log("customizedRoutes", customizedRoutes);
  const handleLogOutUser = async () => {
    try {
      await logoutUser({ refresh_token: auth?.refresh_token });
    } catch (err) {
      console.error(err);
    }

    navigate(GLOBAL_ROUTES.ADMIN_LOGIN, { replace: true });
  };
  function groupRoutes(routes) {
    const map = new Map();
    routes.forEach((item) => {
      if (!item.includeInSidebar) return;

      if (!map.has(item.label)) {
        map.set(item.label, {
          title: LABEL_TO_GROUP_TITLE[item.label],
          routes: [],
        });
      }
      if (
        item.permission !== null &&
        auth?.permissions &&
        !(item.permission in auth.permissions)
      )
        return;
      map.get(item.label).routes.push(item);
    });
    map.forEach((value, key) => {
      console.log(key, value);
      if (value.routes.length === 0) {
        map.delete(key);
      }
    });
    return Array.from(map.values());
  }
  return (
    <>
      <Sidebar className="h-full " collapsible="icon">
        <SidebarHeader>
          <SidebarGroup>
            <SidebarMenu className="!gap-4">
              <SidebarMenuItem>
                <img
                  src={APP_CONSTANTS.BUSINESS_LOGO_URL}
                  alt="Bidalot Logo"
                  className="object-contain w-24 h-14"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
          {customizedRoutes.map((group, index) => (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="!gap-1">
                  {group.routes.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          className="!px-6 !py-5 "
                          asChild
                          isActive={isActive}
                        >
                          <Link to={item.path}>
                            <span>
                              <item.icon />
                            </span>
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    className={`!text-white cursor-pointer ${
                      state === "collapsed"
                        ? "bg-none p-5 flex items-center justify-center"
                        : " !bg-black"
                    } !h-14 `}
                  >
                    <Avatar className="w-7 h-7 ">
                      <AvatarImage src={auth?.data?.profile_image} />
                      <AvatarFallback className="!bg-primary  capitalize">
                        {auth?.data?.first_name?.[0]?.toLocaleUpperCase()}
                        {auth?.data?.last_name?.[0]?.toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      <h1 className="font-medium ">{auth?.data?.full_name}</h1>
                      <p className="text-xs ">{auth?.data?.username}</p>
                    </span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup className="space-y-2">
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(GLOBAL_ROUTES.ADMIN_PROFILE_SETTINGS)
                      }
                    >
                      Profile
                      {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate(GLOBAL_ROUTES.EMBEDDER_PROGRAM)}
                    >
                      Embedder Program
                      {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogOutUser}
                      className="text-red-600"
                    >
                      Log out
                      {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default SidebarCommon;

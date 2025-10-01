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

const SidebarCommon = () => {
  const { state } = useSidebar();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const handleLogOutUser = () => {
    dispatch(logout());
  };

  return (
    <>
      <Sidebar className="h-full " collapsible="icon">
        <SidebarHeader>
          <SidebarGroup>
            <SidebarMenu className="!gap-4">
              <SidebarMenuItem>
                <ChevronsUp stroke="#1976D2" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="!gap-4">
                {authRequiredRoutes.map((item) => {
                  const isActive = location.pathname === item.path;
                  return item.withSidebar ? (
                    item.label === "dashboard" ? (
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
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Auction & Activities</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="!gap-4">
                {authRequiredRoutes.map((item) => {
                  const isActive = location.pathname === item.path;
                  return item.withSidebar ? (
                    item.label === "dashboard" ? (
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
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    className={`!text-white ${
                      state === "collapsed"
                        ? "bg-none p-5 flex items-center justify-center"
                        : "!bg-[#1976D2]"
                    } !h-14 `}
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={auth?.data?.profile_image} />
                      <AvatarFallback className="!bg-blue-300 !text-white capitalize">
                        {auth?.data?.first_name?.[0]?.toLocaleUpperCase()}
                        {auth?.data?.last_name?.[0]?.toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      <h1 className="font-medium">{auth?.data?.full_name}</h1>
                      <p className="text-xs">{auth?.data?.username}</p>
                    </span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup className="space-y-2">
                    <DropdownMenuItem>
                      Profile
                      {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Support
                      {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Affiliate
                      {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
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

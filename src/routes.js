import AdminLoginPage from "./pages/Admin/auth/Page";
import { GLOBAL_ROUTES } from "./utils/Constants";
import DashboardPage from "@/pages/Admin/Dashboard/Page.jsx";

import DashboardIcon from "./components/icons/DashboardIcon.jsx";
import AuctionsIcon from "./components/icons/AuctionsIcon.jsx";
import LotsIcon from "./components/icons/LotsIcon.jsx";
import SessionIcon from "./components/icons/SessionIcon.jsx";
import TagsIcon from "./components/icons/TagsIcon.jsx";
import HistoryIcon from "./components/icons/HistoryIcon.jsx";
import UsersIcon from "./components/icons/UsersIcon.jsx";
import FaqsIcon from "./components/icons/FaqsIcon.jsx";
import NotificationsIcon from "./components/icons/NotificationsIcon.jsx";
// Public/auth routes (no authentication required)
export const publicRoutes = [
  {
    path: GLOBAL_ROUTES.ADMIN_LOGIN,
    name: "Admin Login",
    component: AdminLoginPage,
    protected: false,
    withSidebar: false,
    font: "admin-font",
    isAdminRoute: true,
  },
];
export const authRequiredRoutes = [
  {
    path: GLOBAL_ROUTES.ADMIN_DASHBOARD,
    name: "Dashboard",
    label: "dashboard",
    icon: DashboardIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_AUCTIONS,
    name: "Auctions",
    label: "auctions_activities",
    icon: AuctionsIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_LOTS,
    name: "Lots",
    label: "auctions_activities",
    icon: LotsIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_LIVE_SESSIONS,
    name: "Live Session",
    label: "auctions_activities",
    icon: SessionIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_TAGS,
    name: "Tags",
    label: "auctions_activities",
    icon: TagsIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_BIDDING_HISTORY,
    name: "Biding History",
    label: "auctions_activities",
    icon: HistoryIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_USERS,
    name: "User Management",
    label: "users",
    icon: UsersIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_FAQS,
    name: "FAQ's",
    label: "helpAndSupport",
    icon: FaqsIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_NOTIFICATIONS,
    name: "Notifications",
    label: "systemAndNotifications",
    icon: NotificationsIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
  },
];

// // Routes that require specific permissions
// export const permissionRequiredRoutes = [
//   {
//     path: UPDATE_DOCUMENT_ROUTE,
//     name: "Edit Document",
//     icon: ClipboardList,
//     component: EditDocumentPage,
//     protected: true,
//     permission: PERMISSIONS.UPDATE_DOCUMENT,
//     withSidebar: true,
//   },
// ];

// Combine all routes when needed
export const ALL_ROUTES = [
  ...publicRoutes,
  ...authRequiredRoutes,
  // ...permissionRequiredRoutes,
];

import AdminLoginPage from "./pages/Admin/auth/Page";
import { APP_CONSTANTS, GLOBAL_ROUTES } from "./utils/Constants";
import DashboardPage from "@/pages/Admin/dashboards/Page.jsx";
import AuctionsPage from "@/pages/Admin/auctions/Page.jsx";
import LotsPage from "@/pages/Admin/lot/Page.jsx";
import LiveSessionPage from "@/pages/Admin/live-session/Page.jsx";
import TagsPage from "@/pages/Admin/tags/Page.jsx";
import BidingHistoryPage from "@/pages/Admin/biding-history/Page.jsx";
import UserManagementPage from "@/pages/Admin/user-management/Page.jsx";
import FaqsPage from "@/pages/Admin/faqs/Page.jsx";
import NotificationsPage from "@/pages/Admin/notifications/Page.jsx";

import DashboardIcon from "./components/icons/DashboardIcon.jsx";
import AuctionsIcon from "./components/icons/AuctionsIcon.jsx";
import LotsIcon from "./components/icons/LotsIcon.jsx";
import SessionIcon from "./components/icons/SessionIcon.jsx";
import TagsIcon from "./components/icons/TagsIcon.jsx";
import HistoryIcon from "./components/icons/HistoryIcon.jsx";
import UsersIcon from "./components/icons/UsersIcon.jsx";
import FaqsIcon from "./components/icons/FaqsIcon.jsx";
import NotificationsIcon from "./components/icons/NotificationsIcon.jsx";
import AddNewLot from "./components/lot/AddNewLot.jsx";
import ForgetPasswordPage1 from "./components/auth/ForgetPasswordPage1.jsx";
import VerifyLinks from "./components/auth/VerifyLinks.jsx";
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
  {
    path: GLOBAL_ROUTES.ADMIN_FORGET_PASSWORD_ONE,
    name: "Admin Forget Password Screen one",
    component: ForgetPasswordPage1,
    protected: false,
    withSidebar: false,
    font: "admin-font",
    isAdminRoute: true,
  },
  {
    path: GLOBAL_ROUTES.VERIFY_LINKS,
    name: "Verify Links",
    component: VerifyLinks,
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
    label: APP_CONSTANTS.DASHBOARD_LABEL,
    icon: DashboardIcon,
    component: DashboardPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_AUCTIONS,
    name: "Auctions",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: AuctionsIcon,
    component: AuctionsPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_LOTS,
    name: "Lots",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: LotsIcon,
    component: LotsPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_ADD_LOT,
    name: "Add New Coin",
    label: APP_CONSTANTS.ADD_NEW_COIN_LABEL,
    icon: LotsIcon,
    component: AddNewLot,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: false,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_LIVE_SESSIONS,
    name: "Live Session",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: SessionIcon,
    component: LiveSessionPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_TAGS,
    name: "Tags",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: TagsIcon,
    component: TagsPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_BIDDING_HISTORY,
    name: "Biding History",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: HistoryIcon,
    component: BidingHistoryPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_USERS,
    name: "User Management",
    label: APP_CONSTANTS.USERS_LABEL,
    icon: UsersIcon,
    component: UserManagementPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_FAQS,
    name: "FAQ's",
    label: APP_CONSTANTS.HELP_AND_SUPPORT_LABEL,
    icon: FaqsIcon,
    component: FaqsPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_NOTIFICATIONS,
    name: "Notifications",
    label: APP_CONSTANTS.SYSTEM_NOTIFICATIONS_LABEL,
    icon: NotificationsIcon,
    component: NotificationsPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
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

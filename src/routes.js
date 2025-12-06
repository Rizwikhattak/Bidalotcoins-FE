import AdminLoginPage from "./pages/admin-pages/auth/Page.jsx";
import { APP_CONSTANTS, GLOBAL_ROUTES, PERMISSIONS } from "./utils/Constants";
import DashboardPage from "./pages/admin-pages/dashboards/Page.jsx";
import AuctionsPage from "./pages/admin-pages/auctions/Page.jsx";
import LotsPage from "./pages/admin-pages/lot/Page.jsx";
import LiveSessionPage from "./pages/admin-pages/live-session/Page.jsx";
import TagsPage from "./pages/admin-pages/tags/Page.jsx";
import BidingHistoryPage from "./pages/admin-pages/biding-history/Page.jsx";
import UserManagementPage from "./pages/admin-pages/user-management/Page.jsx";
import FaqsPage from "./pages/admin-pages/faqs/Page.jsx";
import NewsUpdatesPage from "./pages/admin-pages/news-updates/Page.jsx";
import NotificationsPage from "./pages/admin-pages/notifications/Page.jsx";
import EmbeddersPage from "./pages/admin-pages/embedder/Page.jsx";
import ProfileSettingsPage from "./pages/admin-pages/profile-settings/Page.jsx";

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
import HomePage from "./pages/public-pages/home/Page.jsx";
import AddUpdateAuctions from "./components/auctions/AddUpdateAuctions.jsx";
import SetPassword from "./components/auth/SetPassword.jsx";
import { Newspaper } from "lucide-react";
import AddUpdateNewsUpdates from "./components/news-updates/AddUpdateNewsUpdates.jsx";
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
    path: GLOBAL_ROUTES.ADMIN_SET_PASSWORD,
    name: "Admin Set password",
    component: SetPassword,
    protected: false,
    withSidebar: false,
    font: "admin-font",
    isAdminRoute: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_ACTIVATE_ACCOUNT,
    name: "Admin Activate Account",
    component: SetPassword,
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
  {
    path: GLOBAL_ROUTES.HOME,
    name: "Home page",
    component: HomePage,
    protected: false,
    withSidebar: false,
    font: "admin-font",
    isAdminRoute: false,
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
    permission: PERMISSIONS.SHOW_AUCTION,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_ADD_AUCTION,
    name: "Add new Auctions",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: AuctionsIcon,
    component: AddUpdateAuctions,
    protected: true,
    permission: PERMISSIONS.CREATE_AUCTION,
    withSidebar: true,
    includeInSidebar: false,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_UPDATE_AUCTION,
    name: "Update Auction",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: AuctionsIcon,
    component: AddUpdateAuctions,
    protected: true,
    permission: PERMISSIONS.UPDATE_AUCTION,
    withSidebar: true,
    includeInSidebar: false,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_LOTS,
    name: "Lots",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: LotsIcon,
    component: LotsPage,
    protected: true,
    permission: PERMISSIONS.SHOW_LOT,
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
    permission: PERMISSIONS.CREATE_LOT,
    withSidebar: true,
    includeInSidebar: false,
  },
  // {
  //   path: GLOBAL_ROUTES.ADMIN_LIVE_SESSIONS,
  //   name: "Live Session",
  //   label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
  //   icon: SessionIcon,
  //   component: LiveSessionPage,
  //   protected: true,
  //   permission: null,
  //   withSidebar: true,
  //   includeInSidebar: true,
  // },
  {
    path: GLOBAL_ROUTES.ADMIN_TAGS,
    name: "Tags",
    label: APP_CONSTANTS.AUCTIONS_ACTIVITIES_LABEL,
    icon: TagsIcon,
    component: TagsPage,
    protected: true,
    permission: PERMISSIONS.SHOW_TAG,
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
    permission: PERMISSIONS.SHOW_USER,
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
    permission: PERMISSIONS.SHOW_FAQ,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_NEWS_UPDATES,
    name: "News & updates",
    label: APP_CONSTANTS.HELP_AND_SUPPORT_LABEL,
    icon: Newspaper,
    component: NewsUpdatesPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: true,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_ADD_NEWS_UPDATES,
    name: "Add News & updates",
    label: APP_CONSTANTS.HELP_AND_SUPPORT_LABEL,
    icon: Newspaper,
    component: AddUpdateNewsUpdates,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: false,
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
  {
    path: GLOBAL_ROUTES.EMBEDDER_PROGRAM,
    name: "Embedder",
    label: APP_CONSTANTS.EMBEDDER_LABEL,
    icon: null,
    component: EmbeddersPage,
    protected: true,
    permission: PERMISSIONS.SHOW_HOTLINK,
    withSidebar: true,
    includeInSidebar: false,
  },
  {
    path: GLOBAL_ROUTES.ADMIN_PROFILE_SETTINGS,
    name: "Settings",
    label: APP_CONSTANTS.EMBEDDER_LABEL,
    icon: null,
    component: ProfileSettingsPage,
    protected: true,
    permission: null,
    withSidebar: true,
    includeInSidebar: false,
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

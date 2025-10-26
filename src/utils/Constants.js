export const APP_CONSTANTS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_CREDENTIALS: "user_credentials",
  GLOBAL_THEME: "global_theme",
  DARK_THEME: "dark",
  LIGHT_THEME: "light",
  DASHBOARD_LABEL: "dashboard",
  AUCTIONS_ACTIVITIES_LABEL: "auctions_activities",
  USERS_LABEL: "users",
  HELP_AND_SUPPORT_LABEL: "help_and_support",
  SYSTEM_NOTIFICATIONS_LABEL: "system_notifications",
  ADD_NEW_COIN_LABEL: "add_new_coin",
  INVIITED_STATUS: "Invited",
  ACTIVE_STATUS: "Active",
  INACTIVE_STATUS: "Inactive",
  DEACTIVATED_STATUS: "Deactivated",
};

export const GLOBAL_ROUTES = {
  // ================= ADMIN =================
  ADMIN_LOGIN: "/",
  ADMIN_FORGET_PASSWORD_ONE: "/admin/forget-password",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_AUCTIONS: "/admin/auctions",
  ADMIN_LOTS: "/admin/lots",
  ADMIN_ADD_LOT: "/admin/lots/add-new-coin",
  ADMIN_LIVE_SESSIONS: "/admin/live-sessions",
  ADMIN_TAGS: "/admin/tags",
  ADMIN_BIDDING_HISTORY: "/admin/bidding-history",
  ADMIN_USERS: "/admin/users", // user management
  ADMIN_FAQS: "/admin/faqs",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  VERIFY_LINKS: "/verify-link/",

  // ================= CUSTOMER =================
  HOME: "/",
  AUCTIONS: "/auction",
  AUCTION_DETAIL: "/auction/:id", // dynamic auction page
  BUY_NOW: "/buy-now",
  NEWS: "/news",
  CONTACT: "/contact",
  CUSTOMER_PROFILE: "/profile",
  CUSTOMER_ORDERS: "/orders",
  CUSTOMER_BIDS: "/bids",
  CUSTOMER_WATCHLIST: "/watchlist",
  CUSTOMER_NOTIFICATIONS: "/notifications",
};

export const RTK_TAGS = {
  USERS: "USERS",
  ROLES: "ROLES",
  PERMISSIONS: "PERMISSIONS",
  TAGS: "TAGS",
  AUCTIONS: "AUCTIONS",
};

export const API_URLS = {
  //User authentication
  REFRESH_TOKEN: "user/v1/refresh/",
  USER_LOGIN: "user/v1/login/",
  USER_LOGOUT: "user/v1/logout/",
  USER_FORGET_PASSWORD_SEND_LINK: "user/v1/forget/password/",

  //User
  USERS: "user/v1/",
  DEACTIVATE_USER: "user/v1/toggle/",

  //Roles
  ROLES: "user/v1/role/",
  //tags
  TAGS: "misc/v1/tag/",
  //Permissions
  PERMISSIONS: "user/v1/permission/",

  //Auctions
  AUCTIONS: "marketplace/v1/auction/",
};

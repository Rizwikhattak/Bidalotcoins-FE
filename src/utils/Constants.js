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
};

export const GLOBAL_ROUTES = {
  // ================= ADMIN =================
  ADMIN_LOGIN: "/",
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
};

export const API_URLS = {
  //User authentication
  REFRESH_TOKEN: "auth/refresh",
  USER_LOGIN: "user/v1/login/",

  //User
  USERS: "user/v1/",
};

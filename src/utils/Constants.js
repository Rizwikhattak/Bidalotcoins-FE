export const APP_CONSTANTS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_CREDENTIALS: "user_credentials",
  USER_PERMISSIONS: "user_permissions",
  GLOBAL_THEME: "global_theme",
  DARK_THEME: "dark",
  LIGHT_THEME: "light",
  DASHBOARD_LABEL: "dashboard",
  EMBEDDER_LABEL: "embedder",
  AUCTIONS_ACTIVITIES_LABEL: "auctions_activities",
  USERS_LABEL: "users",
  HELP_AND_SUPPORT_LABEL: "help_and_support",
  SYSTEM_NOTIFICATIONS_LABEL: "system_notifications",
  ADD_NEW_COIN_LABEL: "add_new_coin",
  INVIITED_STATUS: "Invited",
  ACTIVE_STATUS: "Active",
  INACTIVE_STATUS: "Inactive",
  DEACTIVATED_STATUS: "Deactivated",
  PUBLISHED_STATUS: "Published",
  ARCIVED_STATUS: "Archived",
  BUSINESS_LOGO_URL:
    "http://167.88.165.177:8000/media/business_images/Logo_2025-11-13_013038.1895120000.png",
};

export const PERMISSIONS = {
  SHOW_ROLE: "show_role",
  CREATE_ROLE: "create_role",
  READ_ROLE: "read_role",
  UPDATE_ROLE: "update_role",
  DELETE_ROLE: "delete_role",
  SHOW_USER: "show_user",
  CREATE_USER: "create_user",
  READ_USER: "read_user",
  UPDATE_USER: "update_user",
  DELETE_USER: "delete_user",
  TOGGLE_USER: "toggle_user",
  SHOW_AUCTION: "show_auction",
  CREATE_AUCTION: "create_auction",
  READ_AUCTION: "read_auction",
  UPDATE_AUCTION: "update_auction",
  DELETE_AUCTION: "delete_auction",
  SHOW_TAG: "show_tag",
  CREATE_TAG: "create_tag",
  READ_TAG: "read_tag",
  UPDATE_TAG: "update_tag",
  DELETE_TAG: "delete_tag",
  SHOW_LOT: "show_lot",
  CREATE_LOT: "create_lot",
  READ_LOT: "read_lot",
  UPDATE_LOT: "update_lot",
  DELETE_LOT: "delete_lot",
  SHOW_FAQ: "show_faq",
  CREATE_FAQ: "create_faq",
  READ_FAQ: "read_faq",
  UPDATE_FAQ: "update_faq",
  DELETE_FAQ: "delete_faq",
  GET_PROFILE: "get_profile",
  UPDATE_PROFILE: "update_profile",
  SHOW_NEWS_CATEGORY: "show_news_category",
  CREATE_NEWS_CATEGORY: "create_news_category",
  READ_NEWS_CATEGORY: "read_news_category",
  UPDATE_NEWS_CATEGORY: "update_news_category",
  DELETE_NEWS_CATEGORY: "delete_news_category",
  SHOW_NEWS_UPDATE: "show_news_update",
  CREATE_NEWS_UPDATE: "create_news_update",
  READ_NEWS_UPDATE: "read_news_update",
  UPDATE_NEWS_UPDATE: "update_news_update",
  DELETE_NEWS_UPDATE: "delete_news_update",
  SHOW_BUSINESS: "show_business",
  CREATE_BUSINESS: "create_business",
  READ_BUSINESS: "read_business",
  UPDATE_BUSINESS: "update_business",
  DELETE_BUSINESS: "delete_business",
  CREATE_HOTLINK: "create_hotlink",
  READ_HOTLINK: "read_hotlink",
  DELETE_HOTLINK: "delete_hotlink",
  SHOW_HOTLINK: "show_hotlink",
};

export const GLOBAL_ROUTES = {
  // ================= ADMIN =================
  ADMIN_LOGIN: "/",
  ADMIN_FORGET_PASSWORD_ONE: "/admin/forget-password",
  ADMIN_SET_PASSWORD: "/admin/set-password",
  ADMIN_ACTIVATE_ACCOUNT: "/admin/activate-account",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_AUCTIONS: "/admin/auctions",
  ADMIN_ADD_AUCTION: "/admin/auctions/add-new-auction",
  ADMIN_UPDATE_AUCTION: "/admin/auctions/update-auction/:id",
  ADMIN_LOTS: "/admin/lots",
  ADMIN_ADD_LOT: "/admin/lots/add-new-coin",
  ADMIN_LIVE_SESSIONS: "/admin/live-sessions",
  ADMIN_TAGS: "/admin/tags",
  ADMIN_BIDDING_HISTORY: "/admin/bidding-history",
  ADMIN_USERS: "/admin/users", // user management
  ADMIN_FAQS: "/admin/faqs",
  ADMIN_NEWS_UPDATES: "/admin/news-updates",
  ADMIN_ADD_NEWS_UPDATES: "/admin/news-updates/add-new-update",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  VERIFY_LINKS: "/verify-link/:token",
  EMBEDDER_PROGRAM: "/admin/embedder/",
  ADMIN_PROFILE_SETTINGS: "/admin/profile-settings/",

  // ================= CUSTOMER =================
  HOME: "/home",
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
  LOTS: "LOTS",
  COUNTRY: "COUNTRY",
  EMBEDDER: "EMBEDDER",
  FAQS: "FAQS",
  NEWS_UPDATES: "NEWS_UPDATES",
  PERSONAL_SETTINGS: "PERSONAL_SETTINGS",
  BUSINESS_SETTINGS: "BUSINESS_SETTINGS",
  CONTACT_US: "CONTACT_US",
};

export const API_URLS = {
  //User authentication
  REFRESH_TOKEN: "user/v1/refresh/",
  USER_LOGIN: "user/v1/login/",
  USER_LOGOUT: "user/v1/logout/",
  USER_FORGET_PASSWORD_SEND_LINK: "user/v1/forget/password/",
  VERIFY_LINK: "user/v1/verify/link/",
  SET_PASSWORD: "user/v1/reset/password/",
  ACTIVATE_ACCOUNT: "user/v1/account/activate/",

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

  // lots
  LOTS: "marketplace/v1/lot/",

  //Faqs
  FAQS: "misc/v1/faq/",

  //News Updates
  NEWS_UPDATES: "marketplace/v1/news/update/",

  //Contact Us
  CONTACT_US: "misc/v1/contactus/",

  // Profile Settings
  PERSONAL_SETTINGS: "user/v1/profile/",
  BUSINESS_SETTINGS: "misc/v1/business/",

  //Commons
  COUNTRIES: "misc/v1/country/",

  //Embedder
  EMBEDDER: "misc/v1/hotlink/",
};

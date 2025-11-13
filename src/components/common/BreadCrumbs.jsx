import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { GLOBAL_ROUTES } from "../../utils/Constants";
import { authRequiredRoutes } from "../../routes";

// Breadcrumb utilities
export const getBreadcrumbs = (pathname, routes = authRequiredRoutes) => {
  const breadcrumbs = [
    { name: "Home", path: GLOBAL_ROUTES.ADMIN_DASHBOARD, icon: Home },
  ];

  // Find current route
  const currentRoute = routes.find((route) => route.path === pathname);

  if (!currentRoute || currentRoute.path === GLOBAL_ROUTES.ADMIN_DASHBOARD) {
    return breadcrumbs;
  }

  // Build breadcrumb trail based on route relationships
  const trail = buildBreadcrumbTrail(currentRoute, routes);
  breadcrumbs.push(...trail);

  return breadcrumbs;
};

const buildBreadcrumbTrail = (currentRoute, routes) => {
  const trail = [];

  // Define parent-child relationships
  const routeHierarchy = {
    [GLOBAL_ROUTES.ADMIN_ADD_AUCTION]: GLOBAL_ROUTES.ADMIN_AUCTIONS,
    [GLOBAL_ROUTES.ADMIN_UPDATE_AUCTION]: GLOBAL_ROUTES.ADMIN_AUCTIONS,
    [GLOBAL_ROUTES.ADMIN_ADD_LOT]: GLOBAL_ROUTES.ADMIN_LOTS,
    [GLOBAL_ROUTES.ADMIN_ADD_NEWS_UPDATES]: GLOBAL_ROUTES.ADMIN_NEWS_UPDATES,
  };

  // Check if current route has a parent
  const parentPath = routeHierarchy[currentRoute.path];

  if (parentPath) {
    const parentRoute = routes.find((r) => r.path === parentPath);
    if (parentRoute) {
      trail.push({
        name: parentRoute.name,
        path: parentRoute.path,
        icon: parentRoute.icon,
      });
    }
  }

  // Add current route (non-clickable)
  trail.push({
    name: currentRoute.name,
    path: currentRoute.path,
    icon: currentRoute.icon,
    isCurrentPage: true,
  });

  return trail;
};

// Breadcrumb Component
const Breadcrumb = ({ className = "" }) => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  // if (breadcrumbs.length <= 1) {
  //   return null; // Don't show breadcrumbs on homepage only
  // }

  return (
    <nav
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = crumb.icon;

        return (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}

            {isLast ? (
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                {crumb.name}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;

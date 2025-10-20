import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx";
import { useLocation, Link } from "react-router-dom";
import { authRequiredRoutes } from "../../routes";

const HeaderCommon = () => {
  const { pathname } = useLocation();
  const crumbs = authRequiredRoutes.find((routes) => {
    return routes.path.includes(pathname);
  });
  console.log("crumbs", crumbs);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))} */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default HeaderCommon;

// import React from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "../ui/breadcrumb";

// const HeaderCommon = ({ currentElement }) => {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         {/* <BreadcrumbItem>
//           <BreadcrumbLink>Home</BreadcrumbLink>
//         </BreadcrumbItem> */}
//         {/* <BreadcrumbSeparator /> */}
//         <BreadcrumbItem>
//           <BreadcrumbPage>{currentElement}</BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// };

// export default HeaderCommon;

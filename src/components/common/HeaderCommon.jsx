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

const HeaderCommon = () => {
  const { pathname } = useLocation();

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

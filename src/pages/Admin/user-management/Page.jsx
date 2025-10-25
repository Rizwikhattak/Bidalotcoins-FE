import React, { useState } from "react";
import Users from "../../../components/user-management/Users";
import Roles from "../../../components/user-management/Roles";
import NavigationCommon from "@/components/common/NavigationCommon";
import { TypographyH1 } from "../../../components/common/Typography";

const Page = () => {
  const navList = [
    {
      name: "Users",
      label: "users",
      component: Users,
    },
    {
      name: "Roles",
      label: "roles",
      component: Roles,
    },
  ];
  const [activeTab, setActiveTab] = useState(navList[0]);
  return (
    <section className="lots-page w-full">
      <TypographyH1>User Management</TypographyH1>
      <div className="pt-4">
        <NavigationCommon
          navList={navList}
          activeTab={activeTab}
          handleActiveTab={(currentTab) => setActiveTab(currentTab)}
        />
      </div>
      <div>
        <activeTab.component />
      </div>
    </section>
  );
};

export default Page;

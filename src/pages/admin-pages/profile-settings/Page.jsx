import React from "react";
import NavigationCommon from "@/components/common/NavigationCommon";
import { useState } from "react";

import ProcessedLot from "@/components/lot/ProcessedLot";
import BuyItNow from "@/components/lot/BuyItNow";
import Lots from "../../../components/lot/Lots";
import { TypographyH1 } from "../../../components/common/Typography";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { GLOBAL_ROUTES } from "../../../utils/Constants";
import PersonalSettings from "../../../components/profile-settings/PersonalSettings";
import BusinessSettings from "../../../components/profile-settings/BusinessSettings";

const Page = () => {
  const navList = [
    {
      name: "Personal",
      label: "personal",
      status: "personal",
      component: PersonalSettings,
    },
    {
      name: "Business",
      label: "business",
      status: "business",
      component: BusinessSettings,
    },
  ];
  const [activeTab, setActiveTab] = useState(navList[0]);
  return (
    <section className="profile-settings-page w-full">
      <div className="flex items-center gap-2 justify-between pb-4">
        <TypographyH1>Settings</TypographyH1>
      </div>
      <div>
        <NavigationCommon
          navList={navList}
          activeTab={activeTab}
          handleActiveTab={(currentTab) => setActiveTab(currentTab)}
        />
      </div>
      <div>
        <activeTab.component status={activeTab.status} />
      </div>
    </section>
  );
};

export default Page;

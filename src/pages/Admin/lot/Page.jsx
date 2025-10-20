import React from "react";
import NavigationCommon from "@/components/common/NavigationCommon";
import { useState } from "react";

import ProcessedLot from "@/components/lot/ProcessedLot";
import BuyItNow from "@/components/lot/BuyItNow";
import Lots from "../../../components/lot/Lots";

const Page = () => {
  const navList = [
    {
      name: "Lot",
      label: "lot",
      component: Lots,
    },
    {
      name: "Processed Lot",
      label: "processedLot",
      component: ProcessedLot,
    },
    {
      name: "But it Now",
      label: "buyItNow",
      component: BuyItNow,
    },
  ];
  const [activeTab, setActiveTab] = useState(navList[0]);
  return (
    <section className="lots-page w-full">
      <div>
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

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

const Page = () => {
  const navList = [
    {
      name: "Lot",
      label: "lot",
      status: "auction",
      component: Lots,
    },
    {
      name: "Processed Lot",
      label: "processedLot",
      status: "processed",
      component: ProcessedLot,
    },
    {
      name: "But it Now",
      label: "buyItNow",
      status: "buy now",
      component: BuyItNow,
    },
  ];
  const [activeTab, setActiveTab] = useState(navList[0]);
  return (
    <section className="lots-page w-full">
      <div className="flex items-center gap-2 justify-between pb-4">
        <TypographyH1>Lot</TypographyH1>
        <Link to={GLOBAL_ROUTES.ADMIN_ADD_LOT}>
          <Button>+ Add New Coin</Button>
        </Link>
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

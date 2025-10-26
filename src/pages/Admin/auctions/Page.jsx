import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { TypographyH1 } from "../../../components/common/Typography";
import AddUpdateAuctions from "../../../components/auctions/AddUpdateAuctions";
import Auctions from "../../../components/auctions/Auctions";

const Page = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="auctions-section">
      <div className="auctions-header flex items-center justify-between gap-2 py-2">
        <TypographyH1>Auctions</TypographyH1>
        <AddUpdateAuctions
          selectedTag={selectedRowData}
          setSelectedTag={setSelectedRowData}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
      <Auctions
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </section>
  );
};

export default Page;

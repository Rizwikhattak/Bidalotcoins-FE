import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { TypographyH1 } from "../../../components/common/Typography";
import AddUpdateAuctions from "../../../components/auctions/AddUpdateAuctions";
import Auctions from "../../../components/auctions/Auctions";
import { Link } from "react-router-dom";
import { GLOBAL_ROUTES } from "../../../utils/Constants";

const Page = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="auctions-section">
      <div className="auctions-header flex items-center justify-between gap-2 py-2">
        <TypographyH1>Auctions</TypographyH1>
        <Link to={GLOBAL_ROUTES.ADMIN_ADD_AUCTION}>
          <Button onClick={() => setOpenDialog(!openDialog)}>
            + Add New Auction
          </Button>
        </Link>
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

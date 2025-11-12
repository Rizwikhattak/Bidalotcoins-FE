import React, { useState } from "react";
import { TypographyH1 } from "../../../components/common/Typography";
import AddUpdateFaqs from "../../../components/faqs/AddUpdateFaqs";
import Faqs from "../../../components/faqs/Faqs";
import NewsUpdates from "../../../components/news-updates/NewsUpdates";
import AddUpdateNewsUpdates from "../../../components/news-updates/AddUpdateNewsUpdates";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { GLOBAL_ROUTES } from "../../../utils/Constants";

const Page = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="tags-section">
      <div className="tags-header flex items-center justify-between gap-2 py-2">
        <TypographyH1>News & Updates Management</TypographyH1>
        <Link to={GLOBAL_ROUTES.ADMIN_ADD_NEWS_UPDATES}>
          <Button>+ Add News & Updates</Button>
        </Link>
      </div>

      <NewsUpdates
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </section>
  );
};

export default Page;

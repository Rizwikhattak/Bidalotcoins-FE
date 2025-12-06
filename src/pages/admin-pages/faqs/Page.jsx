import React, { useState } from "react";
import { TypographyH1 } from "../../../components/common/Typography";
import AddUpdateFaqs from "../../../components/faqs/AddUpdateFaqs";
import Faqs from "../../../components/faqs/Faqs";

const Page = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="tags-section">
      <div className="tags-header flex items-center justify-between gap-2 py-2">
        <TypographyH1>Faq Management</TypographyH1>
        <AddUpdateFaqs
          selectedFaq={selectedRowData}
          setSelectedFaq={setSelectedRowData}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>

      <Faqs
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </section>
  );
};

export default Page;

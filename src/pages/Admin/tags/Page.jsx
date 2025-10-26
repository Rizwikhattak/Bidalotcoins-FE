import React, { useState } from "react";
import Tags from "../../../components/Tags/Tags";
import { Button } from "../../../components/ui/button";
import { TypographyH1 } from "../../../components/common/Typography";
import AddUpdateTags from "../../../components/Tags/AddUpdateTags";

const Page = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="tags-section">
      <div className="tags-header flex items-center justify-between gap-2 py-2">
        <TypographyH1>Tags</TypographyH1>
        <AddUpdateTags
          selectedTag={selectedRowData}
          setSelectedTag={setSelectedRowData}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>

      <Tags
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </section>
  );
};

export default Page;

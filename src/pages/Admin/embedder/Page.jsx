import React, { useState } from "react";

import { TypographyH1 } from "../../../components/common/Typography";
import AddUpdateEmbedder from "../../../components/embedder/AddUpdateEmbedder";
import Embedder from "../../../components/embedder/Embedder";

const Page = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="tags-section">
      <div className="tags-header flex items-center justify-between gap-2 py-2">
        <TypographyH1>Embedder</TypographyH1>
        <AddUpdateEmbedder
          selectedEmbedder={selectedRowData}
          setSelectedEmbedder={setSelectedRowData}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>

      <Embedder
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </section>
  );
};

export default Page;

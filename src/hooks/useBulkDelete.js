import { useState } from "react";
import { toast } from "sonner";
import { getSelectedRows } from "../utils/Helpers";

export function useBulkDelete() {
  const [tableInstance, setTableInstance] = useState(null);
  const bulkDelete = async (params) => {
    const selectedRows = getSelectedRows(tableInstance);
    if (selectedRows.length > 0) {
      selectedRows.forEach((item) => console.log(item));
    } else toast.error("Please select a row first!");
  };
  return { setTableInstance, bulkDelete };
}

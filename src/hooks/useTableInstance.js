import { useState } from "react";

export function useTableInstance() {
  // Add this state to store table instance
  const [tableInstance, setTableInstance] = useState(null);

  // Function to reset selection
  const resetRowSelection = () => {
    if (tableInstance) {
      tableInstance.resetRowSelection();
    }
  };

  return { tableInstance, setTableInstance, resetRowSelection };
}

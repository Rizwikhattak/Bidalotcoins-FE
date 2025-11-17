export function formateDateTime(dateTimeString) {
  // const date = new Date(dateTimeString);
  // const options = {
  //   year: 'numeric',
  //   month: 'short',
  //   day: '2-digit',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false,
  // };
  // return date.toLocaleString('en-US', options).replace(',', '');
  if (!dateTimeString) return ["", ""];
  return dateTimeString.split(" ");
}

export const getSelectedRows = (tableInstance) => {
  if (tableInstance) {
    const selectedRows = tableInstance.getSelectedRowModel().rows;
    const selectedData = selectedRows.map((row) => row.original);
    console.log("Selected rows:", selectedData);
    return selectedData;
  }
  return [];
};

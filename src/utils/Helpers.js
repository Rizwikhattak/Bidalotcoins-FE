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

export const GetSelectedRowsFromTable = (table) => {
  if (table) {
    const rowSelection = table.getState().rowSelection;
    const allRows = table.getRowModel().rows;
    const selectedRows = allRows
      .filter((row) => rowSelection[row.id])
      .map((row) => row.original);
    return selectedRows;
  }
  return [];
};

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

console.log(formateDateTime("2025-10-12 19:38:18"));

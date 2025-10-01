import React from "react";

const HistoryIcon = ({ color= "currentColor", width = 21, height = 18, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 21 18" fill="none" {...props}>
    <path
      d="M12 0a9 9 0 00-9 9H0l3.89 3.89.07.14L8 9H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.951 8.951 0 0012 18a9 9 0 000-18zm-1 5v5l4.25 2.52.77-1.29-3.52-2.09V5H11z"
      fill={color}
    />
  </svg>
);

export default HistoryIcon;

import React from "react";

const NotificationsIcon = ({ color= "currentColor", width = 20, height = 20, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M10.268 21a2 2 0 003.464 0m-10.47-5.674A1 1 0 004 17h16a1 1 0 00.74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 006 8c0 4.499-1.411 5.956-2.738 7.326z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NotificationsIcon;

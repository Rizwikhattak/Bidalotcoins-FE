import React from "react";

const DashboardIcon = ({ color= "currentColor", width = 20, height = 18, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 20 18" fill="none" {...props}>
    <path
      d="M1.667 3.167A1.667 1.667 0 013.333 1.5h5v15h-5a1.667 1.667 0 01-1.667-1.667V3.167zm10-1.667h5a1.667 1.667 0 011.666 1.667v4.166h-6.666V1.5zm0 9.167h6.666v4.166a1.666 1.666 0 01-1.666 1.667h-5v-5.833z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DashboardIcon;

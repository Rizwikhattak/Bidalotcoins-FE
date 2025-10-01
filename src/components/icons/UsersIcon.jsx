import React from "react";

const UsersIcon = ({
  color = "currentColor",
  width = 24,
  height = 24,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M18 21a8 8 0 00-16 0M10 13a5 5 0 100-10 5 5 0 000 10zM22 20c0-3.37-2-6.5-4-8a5 5 0 00-.45-8.3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UsersIcon;

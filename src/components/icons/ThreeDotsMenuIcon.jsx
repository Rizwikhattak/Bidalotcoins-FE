import React from "react";

const ThreeDotsMenuIcon = ({
  color = "currentColor",
  width = 24,
  height = 24,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="12"
      cy="5"
      r="1.5"
      stroke={color}
      fill={color}
      strokeWidth="1"
    />
    <circle
      cx="12"
      cy="12"
      r="1.5"
      stroke={color}
      fill={color}
      strokeWidth="1"
    />
    <circle
      cx="12"
      cy="19"
      r="1.5"
      stroke={color}
      fill={color}
      strokeWidth="1"
    />
  </svg>
);

export default ThreeDotsMenuIcon;

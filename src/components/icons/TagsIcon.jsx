import React from "react";

const TagsIcon = ({ color= "currentColor", width = 24, height = 24, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M3 8v4.172a2 2 0 00.586 1.414l5.71 5.71a2.41 2.41 0 003.408 0l3.592-3.592a2.41 2.41 0 000-3.408l-5.71-5.71A2 2 0 009.172 6H5a2 2 0 00-2 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 19l1.592-1.592a4.82 4.82 0 000-6.816L15 6m-8 4h-.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TagsIcon;

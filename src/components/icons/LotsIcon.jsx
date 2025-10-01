import React from "react";

const LotsIcon = ({ color= "currentColor", width = 16, height = 20, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 16 20" fill="none" {...props}>
    <path
      d="M8 20c3.976 0 8-1.374 8-4V4c0-2.626-4.024-4-8-4S0 1.374 0 4v12c0 2.626 4.024 4 8 4zm0-2c-3.722 0-6-1.295-6-2v-1.268C3.541 15.57 5.777 16 8 16s4.459-.43 6-1.268V16c0 .705-2.278 2-6 2zM8 2c3.722 0 6 1.295 6 2 0 .705-2.278 2-6 2S2 4.705 2 4c0-.705 2.278-2 6-2zM2 6.732C3.541 7.57 5.777 8 8 8s4.459-.43 6-1.268V8c0 .705-2.278 2-6 2S2 8.705 2 8V6.732zm0 4C3.541 11.57 5.777 12 8 12s4.459-.43 6-1.268V12c0 .705-2.278 2-6 2s-6-1.295-6-2v-1.268z"
      fill={color}
    />
  </svg>
);

export default LotsIcon;

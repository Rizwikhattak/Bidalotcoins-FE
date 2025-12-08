import React from "react";
import { Badge } from "../ui/badge";
import SessionIcon from "../icons/SessionIcon";

const CommonBadge = ({ title = "Live", img = null }) => {
  return (
    <Badge className="bg-red-600 rounded-full p-1 px-2 flex items-center justify-center gap-2">
      {img ? <img src={img} alt="" /> : <SessionIcon />}
      <p>{title}</p>
    </Badge>
  );
};

export default CommonBadge;

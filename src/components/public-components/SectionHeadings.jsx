import { MoveRight } from "lucide-react";
import React from "react";

const SectionHeadings = ({ title }) => {
  return (
    <div className="my-4 flex items-center gap-2 bg-custom-soft-marigold w-fit px-3 py-1 rounded-lg text-sm  border border-black/9">
      <span>
        <MoveRight strokeWidth={0.75} />
      </span>
      <span>{title}</span>
    </div>
  );
};

export default SectionHeadings;

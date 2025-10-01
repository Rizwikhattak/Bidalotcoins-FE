import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Wrap **any clickable element** that should be blocked when the
 * current user lacks permission.
 * ─────────────────────────────────────────────────────────────
 * @param {boolean} hasPermission - true ⟹ render children as-is
 * @param {string}  message        - tooltip text when blocked
 * @param {ReactElement} children  - the button / icon you want protected
 */
const TooltipCommon = ({ isEnabled, message, children }) => {
  if (isEnabled) return children;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-block">
            {React.cloneElement(children, {
              disabled: true,
              className: `${
                children.props.className || ""
              } cursor-not-allowed opacity-50`,
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs z-50">
          <p className="text-sm">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCommon;

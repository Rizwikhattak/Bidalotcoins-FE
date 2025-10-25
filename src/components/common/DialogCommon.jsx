// ModalCommon.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Props:
 * - open: boolean (controls whether the dialog is open or closed)
 * - onOpenChange: function (called when the dialog should open/close)
 * - headerTitle, headerDescription, ModalStyle, children, etc.
 */
const DialogCommon = ({
  open,
  onOpenChange,
  headerTitle,
  onCloseData,
  headerDescription,
  className = "",
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[425px]  max-h-[90vh] overflow-y-auto",
          className
        )}
        onOpenChange={onOpenChange}
        onCloseData={onCloseData}
        onInteractOutside={(e) => {
          //Prevents modals from closing when clicked outside
          // e.preventDefault();
        }}
      >
        <DialogHeader className="!h-fit">
          <DialogTitle>{headerTitle}</DialogTitle>
          <DialogDescription>{headerDescription}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCommon;

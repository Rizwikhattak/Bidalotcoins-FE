import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ThreeDotsMenuIcon from "../icons/ThreeDotsMenuIcon";

const BulkHandler = ({ bulkOperationsList, selectedRows }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <ThreeDotsMenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {bulkOperationsList?.map((operation, index) => (
          <DropdownMenuItem
            onClick={selectedRows.length !== 0 && operation.action}
            key={index}
            className="group"
          >
            {operation.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BulkHandler;

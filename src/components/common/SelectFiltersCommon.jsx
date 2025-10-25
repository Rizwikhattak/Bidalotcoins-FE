import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
const SelectFiltersCommon = ({
  placeholder,
  items = [],
  onValueChange,
  className,
  ...props
}) => {
  return (
    <Select
      onValueChange={onValueChange}
      // defaultValue={field.value}
      {...props}
    >
      <SelectTrigger
        className={cn("cursor-pointer hover:bg-primary-custom/5", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="cursor-pointer hover:bg-primary-custom/5"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFiltersCommon;

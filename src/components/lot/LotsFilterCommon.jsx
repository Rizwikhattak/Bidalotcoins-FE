import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Search } from "lucide-react";
import SelectFiltersCommon from "../common/SelectFiltersCommon";

const LotsFilterCommon = () => {
  return (
    <div className="filters-section flex items-center justify-between gap-2 py-4">
      <div className="flex-1 max-w-md">
        <InputGroup className="">
          <InputGroupInput placeholder="Search users..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center gap-2">
        <SelectFiltersCommon
          placeholder="Year"
          items={[
            {
              value: "invited",
              name: "Invited",
            },
            {
              value: "active",
              name: "Active",
            },
            {
              value: "deactivated",
              name: "Deactivated",
            },
          ]}
        />
        <SelectFiltersCommon
          placeholder="Country"
          items={[
            {
              value: "invited",
              name: "Invited",
            },
            {
              value: "active",
              name: "Active",
            },
            {
              value: "deactivated",
              name: "Deactivated",
            },
          ]}
        />
        <SelectFiltersCommon
          placeholder="Tags"
          items={[
            {
              value: "invited",
              name: "Invited",
            },
            {
              value: "active",
              name: "Active",
            },
            {
              value: "deactivated",
              name: "Deactivated",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LotsFilterCommon;

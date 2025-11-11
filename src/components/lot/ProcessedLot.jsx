import React, { useState } from "react";
import { DataTableCommon } from "../common/DataTableCommon";
import { DataTableColumnHeaderCommon } from "../common/DataTableColumnHeaderCommon";
import LotsFilterCommon from "./LotsFilterCommon";
import { GLOBAL_ROUTES } from "../../utils/Constants";
import { formateDateTime } from "../../utils/Helpers";
import { useGetLotsQuery } from "../../app/features/lots/lotsApi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ThreeDotsMenuIcon from "../icons/ThreeDotsMenuIcon";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const ProcessedLot = ({ status }) => {
  const { data, isLoading } = useGetLotsQuery({ status: "processed" });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const columns = [
    // Checkbox Select Column
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected()
    //           ? true
    //           : table.getIsSomePageRowsSelected()
    //           ? "indeterminate"
    //           : false
    //       }
    //       onCheckedChange={(value) =>
    //         table.toggleAllPageRowsSelected(value === true)
    //       }
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={
    //         row.getIsSelected()
    //           ? true
    //           : row.getIsSomeSelected()
    //           ? "indeterminate"
    //           : false
    //       }
    //       onCheckedChange={(value) => row.toggleSelected(value === true)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "front_image",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Image"
          className="ml-3"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="w-12 h-12">
            <img
              src={row.getValue("front_image")}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        );
      },
      enableSorting: false,
    },

    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Title"
          className="ml-3"
        />
      ),
      enableSorting: true,
    },

    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Description" />
      ),

      enableSorting: false,
    },
    {
      accessorKey: "year",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="year" />
      ),

      enableSorting: true,
    },
    {
      accessorKey: "country",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Country" />
      ),
      cell: ({ row }) => {
        const country = row.getValue("country");
        return <span>{country?.name || "N/A"}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "weight",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Weight" />
      ),

      enableSorting: true,
    },
    {
      accessorKey: "tag",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Tag" />
      ),
      cell: ({ row }) => {
        const tag = row.getValue("tag");
        return <span>{tag?.name || "N/A"}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "auction",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Auction Title" />
      ),
      cell: ({ row }) => {
        const auction = row.getValue("auction");
        return <span>{auction?.auction_name || "N/A"}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "auctions_attended",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Auctions Attended"
        />
      ),

      enableSorting: true,
    },

    // Actions
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        // setSelectedRowData(row.original);
        return (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <ThreeDotsMenuIcon className="" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="flex flex-col gap-2 w-fit">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      setSelectedRowData(row.original);
                      setOpenDialog(true);
                    }}
                  >
                    View Details
                  </Button>
                  <Link
                    to={GLOBAL_ROUTES.ADMIN_UPDATE_AUCTION.split(
                      ":id"
                    )[0].concat(row.original?.id)}
                    className="w-full justify-start"
                  >
                    <Button
                      variant="ghost"
                      className="justify-start w-full"
                      onClick={() => {
                        // setSelectedRowData(row.original);
                        // setOpenDialog(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start text-user-status-deactivated  "
                    onClick={() => {
                      setSelectedRowData(row.original);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
  return (
    <section className="lots-section">
      <LotsFilterCommon />
      <div>
        <DataTableCommon
          // filters={filters}
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          // selectedFilter={selectedFilter}
          // setSelectedFilter={setSelectedFilter}
          // totalDataCount={bankAccountsData.count}
          // onFetchData={(offset, limit) =>
          //   dispatch(getAllBankAccounts({ offset, limit }))
          // }
        />
      </div>
    </section>
  );
};

export default ProcessedLot;

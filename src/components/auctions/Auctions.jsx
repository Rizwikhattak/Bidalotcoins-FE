import React, { useState } from "react";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeaderCommon";
import {
  useDeactivateUserMutation,
  useGetUsersQuery,
} from "../../app/features/users/usersApi";
import { formateDateTime } from "../../utils/Helpers";
import { Edit, Search, Trash } from "lucide-react";
import ThreeDotsMenuIcon from "../icons/ThreeDotsMenuIcon";
import { APP_CONSTANTS, GLOBAL_ROUTES } from "../../utils/Constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import SelectFiltersCommon from "../common/SelectFiltersCommon";
import DialogCommon from "../common/DialogCommon";
import {
  useDeleteTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
} from "../../app/features/tags/tagsApi";
import { useGetAuctionsQuery } from "../../app/features/auctions/auctionsApi";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const Auctions = ({
  selectedRowData,
  setSelectedRowData,
  openDialog,
  setOpenDialog,
}) => {
  const { data, isLoading } = useGetAuctionsQuery();
  const [deleteTag, { isLoading: isDeleteLoading }] = useDeleteTagMutation();
  const [updateTag, { isLoading: isUpdateLoading }] = useUpdateTagMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);
  function getStatusColors(status) {
    switch (status) {
      case APP_CONSTANTS.INVIITED_STATUS:
        return "bg-user-status-invited text-black ";
      case APP_CONSTANTS.ACTIVE_STATUS:
        return "bg-user-status-active";
      case APP_CONSTANTS.DEACTIVATED_STATUS:
        return "bg-user-status-deactivated text-background";
      default:
        return "bg-gray-200";
    }
  }

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
      accessorKey: "image",
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
              src={row.getValue("image")}
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
      accessorKey: "status",
      header: ({ column }) => (
        <div className="ml-2">
          <DataTableColumnHeaderCommon column={column} title="Status" />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div
            className={`${getStatusColors(
              status
            )} flex w-32 h-10 rounded-md text-base`}
          >
            <span className="m-auto"> {status}</span>
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "total_bids",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Bids" />
      ),

      enableSorting: true,
    },
    {
      accessorKey: "total_lots",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Total Coins" />
      ),

      enableSorting: true,
    },
    {
      accessorKey: "start_date",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Live Date" />
      ),
      cell: ({ row }) => {
        const dateTimeString = row.getValue("start_date");
        return <span>{formateDateTime(dateTimeString)[0]}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "end_date",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="End Date" />
      ),
      cell: ({ row }) => {
        const dateTimeString = row.getValue("end_date");
        return <span>{formateDateTime(dateTimeString)[0]}</span>;
      },
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
    <section className="users-section">
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
        <div>
          <SelectFiltersCommon
            placeholder="Status"
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
      {openDeleteDialog && (
        <DialogCommon
          headerTitle="Deactivate User"
          open={openDeleteDialog}
          onOpenChange={setOpenDeleteDialog}
        >
          <>
            <p>
              Are you sure you want to delete this Tag? This operation is
              irreversible.
            </p>
            <div className="flex items-center gap-2 justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setOpenDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteTag(selectedRowData?.id);
                  setSelectedRowData(null);
                  setOpenDeleteDialog(false);
                }}
                isLoading={isDeleteLoading}
              >
                Delete Tag
              </Button>
            </div>
          </>
        </DialogCommon>
      )}
      {openDeactivateDialog && (
        <DialogCommon
          headerTitle="Deactivate User"
          open={openDeactivateDialog}
          onOpenChange={setOpenDeactivateDialog}
        >
          <>
            <p>
              {selectedRowData?.status === APP_CONSTANTS.DEACTIVATED_STATUS
                ? "Are you sure you want to reactivate this tag?"
                : "Are you sure you want to deactivate this tag?"}
            </p>
            <div className="flex items-center gap-2 justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setOpenDeactivateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant={
                  selectedRowData?.status === APP_CONSTANTS.INACTIVE_STATUS
                    ? "activate"
                    : "destructive"
                }
                onClick={async () => {
                  await updateTag({
                    id: selectedRowData?.id,
                    status:
                      selectedRowData?.status === APP_CONSTANTS.INACTIVE_STATUS
                        ? APP_CONSTANTS.ACTIVE_STATUS
                        : APP_CONSTANTS.INACTIVE_STATUS,
                  });
                  setSelectedRowData(null);
                  setOpenDeactivateDialog(false);
                }}
                isLoading={isUpdateLoading}
              >
                {selectedRowData?.status === APP_CONSTANTS.INACTIVE_STATUS
                  ? "Activate Tag"
                  : "Deactivate Tag"}
              </Button>
            </div>
          </>
        </DialogCommon>
      )}
    </section>
  );
};

export default Auctions;

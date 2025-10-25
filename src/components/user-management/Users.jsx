import React, { useState } from "react";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeaderCommon";
import {
  useDeactivateUserMutation,
  useGetUsersQuery,
} from "../../app/features/users/usersApi";
import { formateDateTime } from "../../utils/Helpers";
import { Button } from "../../../../../dext-dev/dext-dev/src/Component/ui/button";
import { Edit, Search, Trash } from "lucide-react";
import ThreeDotsMenuIcon from "../icons/ThreeDotsMenuIcon";
import { APP_CONSTANTS } from "../../utils/Constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SelectCommon } from "../common/FormCommons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFilterScheema } from "./UserManagementScheema";
import { Form } from "../ui/form";
import SelectFiltersCommon from "../common/SelectFiltersCommon";
import AddUpdateUser from "./AddUpdateUser";
import DialogCommon from "../common/DialogCommon";
const Users = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [deactivateUser, { isLoading: isDeactivateLoading }] =
    useDeactivateUserMutation();
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  function getStatusColors(status) {
    switch (status) {
      case APP_CONSTANTS.USER_INVIITED_STATUS:
        return "bg-user-status-invited";
      case APP_CONSTANTS.USER_ACTIVE_STATUS:
        return "bg-user-status-active";
      case APP_CONSTANTS.USER_DEACTIVATED_STATUS:
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
      accessorKey: "full_name",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Name"
          className="ml-3"
        />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Email" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const role = row.getValue("role");
        return <span className="capitalize">{role?.name}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const dateTimeString = row.getValue("created_at");
        return <span>{formateDateTime(dateTimeString)[0]}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Updated At" />
      ),
      cell: ({ row }) => {
        const dateTimeString = row.getValue("updated_at");
        return <span>{formateDateTime(dateTimeString)[0]}</span>;
      },
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
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start w-fit text-user-status-deactivated  "
                    onClick={() => {
                      setSelectedRowData(row.original);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    {row.original?.status ===
                    APP_CONSTANTS.USER_DEACTIVATED_STATUS
                      ? "Reactivate User"
                      : "Deactivate User"}
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
      <div className="filters-section flex items-center gap-2 py-4">
        <div className="flex-1 w-full flex items-center gap-3">
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
          <AddUpdateUser
            selectedUser={selectedRowData}
            setSelectedUser={setSelectedRowData}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
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
              {selectedRowData?.status === APP_CONSTANTS.USER_DEACTIVATED_STATUS
                ? "Are you sure you want to reactivate this user?"
                : "Are you sure you want to deactivate this user?"}
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
                  await deactivateUser(selectedRowData?.id);
                  setSelectedRowData(null);
                  setOpenDeleteDialog(false);
                }}
                isLoading={isDeactivateLoading}
              >
                {selectedRowData?.status ===
                APP_CONSTANTS.USER_DEACTIVATED_STATUS
                  ? "Reactivate User"
                  : "Deactivate User"}
              </Button>
            </div>
          </>
        </DialogCommon>
      )}
    </section>
  );
};

export default Users;

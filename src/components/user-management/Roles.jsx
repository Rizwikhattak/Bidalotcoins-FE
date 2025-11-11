import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeaderCommon";
import { formateDateTime } from "../../utils/Helpers";
import { Search, Trash } from "lucide-react";
import ThreeDotsMenuIcon from "../icons/ThreeDotsMenuIcon";
import { APP_CONSTANTS } from "../../utils/Constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFilterScheema } from "./UserManagementScheema";

import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../../app/features/roles/rolesApi";
import DialogCommon from "../common/DialogCommon";
import AddUpdateRole from "./AddUpdateRole";
import { useState } from "react";
import { Button } from "../ui/button";
const Roles = () => {
  const { data, error, isLoading } = useGetRolesQuery();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [deleteRole, { isLoading: isDeleteLoading }] = useDeleteRoleMutation();
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
      accessorKey: "name",
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
      accessorKey: "code_name",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Code Name" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "permissions",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Permissions" />
      ),
      cell: ({ row }) => {
        const permissions = row.getValue("permissions");
        return (
          <div className="flex items-center gap-1">
            {permissions?.length > 0
              ? permissions?.map(
                  (perm, index) =>
                    index <= 2 && (
                      <p>
                        {perm?.name}
                        {index !== 2 ? "," : "...."}
                      </p>
                    )
                )
              : "N/A"}
          </div>
        );
      },
      enableSorting: false,
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
                    className="justify-start "
                    onClick={() => {
                      setSelectedRowData(row.original);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start w-fit text-red-500"
                    onClick={() => {
                      setSelectedRowData(row.original);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    Delete Role
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
        <InputGroup className="max-w-md">
          <InputGroupInput placeholder="Search users..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        <AddUpdateRole
          selectedRole={selectedRowData}
          setSelectedRoleData={setSelectedRowData}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
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
          headerTitle="Delete Role"
          // headerDescription="Are you sure you want to delete this role? This action cannot be undone."
          open={openDeleteDialog}
          onOpenChange={setOpenDeleteDialog}
        >
          <>
            <p>
              Are you sure you want to delete this role? This action cannot be
              undone.
            </p>
            <div className="pt-4 flex items-center gap-2 justify-between">
              <Button variant="outline">Cancel</Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteRole(selectedRowData?.id);
                  setOpenDeleteDialog(false);
                  setSelectedRowData(null);
                }}
                isLoading={isDeleteLoading}
              >
                Delete Role
              </Button>
            </div>
          </>
        </DialogCommon>
      )}
    </section>
  );
};

export default Roles;

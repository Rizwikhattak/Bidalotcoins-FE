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
import { APP_CONSTANTS } from "../../utils/Constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import SelectFiltersCommon from "../common/SelectFiltersCommon";
import DialogCommon from "../common/DialogCommon";
import { Button } from "../ui/button";
import {
  useDeleteFaqsMutation,
  useGetFaqsQuery,
} from "../../app/features/faqs/faqsApi";
const Faqs = ({ selectedRowData, setSelectedRowData, setOpenDialog }) => {
  const { data, isLoading } = useGetFaqsQuery();
  const [deleteFaqs, { isLoading: isDeleteLoading }] = useDeleteFaqsMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  function getStatusColors(status) {
    switch (status) {
      case APP_CONSTANTS.ARCIVED_STATUS:
        return "bg-user-status-invited text-black ";
      case APP_CONSTANTS.PUBLISHED_STATUS:
        return "bg-user-status-active";

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
      accessorKey: "question",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Question"
          className="ml-3"
        />
      ),
      cell: ({ row }) => {
        const question = row.getValue("question") || "N/A";
        return <p className="text-wrap">{question}</p>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "answer",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Answer"
          className="ml-3"
        />
      ),
      cell: ({ row }) => {
        const answer = row.getValue("answer") || "N/A";
        return <p className="text-wrap">{answer}</p>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Last Updated" />
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
          headerTitle="Delete Faq"
          open={openDeleteDialog}
          onOpenChange={setOpenDeleteDialog}
        >
          <>
            <p>
              Are you sure you want to delete this FAQ? This operation is
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
                  await deleteFaqs(selectedRowData?.id);
                  setSelectedRowData(null);
                  setOpenDeleteDialog(false);
                }}
                isLoading={isDeleteLoading}
              >
                Delete FAQ
              </Button>
            </div>
          </>
        </DialogCommon>
      )}
    </section>
  );
};

export default Faqs;

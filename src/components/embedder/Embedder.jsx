import React, { useState } from "react";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeaderCommon";
import {
  useDeactivateUserMutation,
  useGetUsersQuery,
} from "../../app/features/users/usersApi";
import { formateDateTime, getSelectedRows } from "../../utils/Helpers";
import { Edit, Search, Trash, Copy, Check } from "lucide-react";
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
import {
  useDeleteEmbedderMutation,
  useGetEmbeddersQuery,
} from "../../app/features/embedder/embeddersApi";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

// Animated Copy Button Component
const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Copied to clipboard!");

      // Reset back to copy icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-8 w-8 transition-all"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600 animate-in zoom-in-50 duration-300" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};

const Embedder = ({ selectedRowData, setSelectedRowData }) => {
  console.log("selectedRowData", selectedRowData);
  const { data, isLoading } = useGetEmbeddersQuery();
  const [deleteEmbedder, { isLoading: isDeleteLoading }] =
    useDeleteEmbedderMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  

  // Get selected rows whenever you need them



  const columns = [
    // Checkbox Select Column
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(value === true)
          }
          aria-label="Select all"
          className="bg-gray-200"
        />
      ),
      cell: ({ row }) => (
        <>
          <Checkbox
            checked={
              row.getIsSelected()
                ? true
                : row.getIsSomeSelected()
                ? "indeterminate"
                : false
            }
            onCheckedChange={(value) => row.toggleSelected(value === true)}
            aria-label="Select row"
            className="bg-gray-200"
          />
        </>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "filename",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="File Name"
          className="ml-3"
        />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Hotlink URL" />
      ),
      cell: ({ row }) => {
        const hotlink = row.original?.image || "N/A";
        return <span className="text-wrap">{hotlink}</span>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Upload Date" />
      ),
      cell: ({ row }) => {
        const dateTimeString = row.getValue("created_at");
        return <span>{dateTimeString}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: "file_size",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="File Size" />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "dimensions",
      header: ({ column }) => (
        <div className="ml-2">
          <DataTableColumnHeaderCommon column={column} title="Dimensions" />
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "image",
      header: ({ column }) => (
        <div className="ml-2">
          <DataTableColumnHeaderCommon column={column} title="Preview" />
        </div>
      ),
      cell: ({ row }) => {
        const image = row.original?.image || "";
        return <img src={image} className="w-12 h-12 object-contain" />;
      },
      enableSorting: false,
    },
    {
      accessorKey: "html_code",
      header: ({ column }) => (
        <div className="ml-2">
          <DataTableColumnHeaderCommon column={column} title="HTML Code" />
        </div>
      ),
      cell: ({ row }) => {
        const htmlCode = row.original?.html_code || "";
        return <p className="text-wrap">{htmlCode}</p>;
      },
      enableSorting: false,
    },
    // Actions with animated copy button
    {
      accessorKey: "actions",
      header:"Actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="space-x-3">
            <CopyButton textToCopy={row.original?.html_code || ""} />
            <Button
              variant="ghost"
              className="justify-start text-user-status-deactivated  "
              onClick={async () => {
                setSelectedRowData(row.original);
                setOpenDeleteDialog(true);
              }}
            >
              <Trash />
            </Button>
          </div>
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
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
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
                  await deleteEmbedder(selectedRowData?.id);
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
    </section>
  );
};

export default Embedder;

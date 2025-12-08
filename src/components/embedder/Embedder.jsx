import React, { useState } from "react";
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeaderCommon";

import { GetSelectedRowsFromTable } from "../../utils/Helpers";
import { Edit, Search, Trash, Copy, Check, CodeXml } from "lucide-react";
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
import BulkHandler from "../common/BulkHandler";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTableInstance } from "../../hooks/useTableInstance";
import GenerateHtmlDialog from "./GenerateHtmlDialog";

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
  const [selectedRows, setSelectedRows] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [openImagePreview, setOpenImagePreview] = useState(false);
  const [openGenerateHtml, setOpenGenerateHtml] = useState(false);
  const [selectedRowsForHtml, setSelectedRowsForHtml] = useState([]);
  const { tableInstance, setTableInstance, resetRowSelection } =
    useTableInstance();

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
      accessorKey: "image",
      header: ({ column }) => (
        <div className="ml-2">
          <DataTableColumnHeaderCommon column={column} title="Preview" />
        </div>
      ),
      cell: ({ row }) => {
        const image = row.original?.image || "";
        return (
          <img
            src={image}
            className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              setPreviewImage(image);
              setOpenImagePreview(true);
            }}
          />
        );
      },
      enableSorting: false,
    },
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
      cell: ({ row }) => {
        const name = row.original?.name || "N/A";
        return (
          <p className="whitespace-normal break-words max-w-[300px]">{name}</p>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Description"
          className="ml-3"
        />
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const description = row.original?.description || "N/A";
        return (
          <p className="whitespace-normal break-words max-w-[300px]">
            {description}
          </p>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon
          column={column}
          title="Price"
          className="ml-3"
        />
      ),
      enableSorting: true,
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
      cell: ({ row }) => {
        const filename = row.original?.filename || "N/A";
        return (
          <p className="whitespace-normal break-words max-w-[300px]">
            {filename}
          </p>
        );
      },
    },
    {
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Hotlink URL" />
      ),
      cell: ({ row }) => {
        const hotlink = row.original?.image || "N/A";
        return (
          <p className="whitespace-normal break-words max-w-[300px]">
            {hotlink}
          </p>
        );
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
      accessorKey: "html_code",
      header: ({ column }) => (
        <div className="ml-2">
          <DataTableColumnHeaderCommon column={column} title="HTML Code" />
        </div>
      ),
      cell: ({ row }) => {
        const htmlCode = row.original?.html_code || "";
        return (
          <p className="whitespace-normal break-words max-w-[300px]">
            {htmlCode}
          </p>
        );
      },
      enableSorting: false,
    },
    // Actions with animated copy button
    {
      accessorKey: "actions",
      id: "actions",
      enableSorting: false,
      enableHiding: false,
      header: (
        { column, table } // Add 'table' here!
      ) => {
        const selectedRows = GetSelectedRowsFromTable(table);

        return (
          <div className="flex items-center gap-4">
            <DataTableColumnHeaderCommon column={column} title="Actions" />
            <BulkHandler
              selectedRows={selectedRows}
              bulkOperationsList={[
                {
                  label: (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p
                          className={`flex items-center gap-2 w-full h-full group-hover:text-red-600 ${
                            selectedRows.length === 0
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <Trash className="group-hover:text-red-600" />{" "}
                          <span>Delete Selected</span>
                        </p>
                      </TooltipTrigger>
                      {selectedRows.length === 0 && (
                        <TooltipContent className="bg-gray-900 text-white text-xs">
                          <p>Select a row first</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ),
                  action: () => {
                    const selectedRows = GetSelectedRowsFromTable(table);
                    setSelectedRows(selectedRows.map((row) => row.id));
                    setOpenDeleteDialog(true);
                    console.log("Selected Rows:", selectedRows);
                  },
                },
                {
                  label: (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p
                          className={`flex items-center gap-2  group hover:text-green-600 ${
                            selectedRows.length === 0
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <CodeXml className="group-hover:text-green-600" />{" "}
                          <span>Generate Code</span>
                        </p>
                      </TooltipTrigger>
                      {selectedRows.length === 0 && (
                        <TooltipContent className="bg-gray-900 text-white text-xs">
                          <p>Select a row first</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ),
                  action: () => {
                    const rowSelection = table.getState().rowSelection;
                    const allRows = table.getRowModel().rows;
                    const selectedRows = allRows
                      .filter((row) => rowSelection[row.id])
                      .map((row) => row.original);

                    if (selectedRows.length > 0) {
                      setSelectedRowsForHtml(selectedRows);
                      setOpenGenerateHtml(true);
                    } else {
                      toast.error("Please select at least one row");
                    }
                  },
                },
              ]}
            />
          </div>
        );
      },
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
          onTableInstanceChange={setTableInstance}
        />
      </div>
      {openDeleteDialog && (
        <DialogCommon
          headerTitle="Delete Image"
          open={openDeleteDialog}
          onOpenChange={setOpenDeleteDialog}
        >
          <>
            <p>
              Are you sure you want to delete{" "}
              {selectedRows.length > 0 ? "these" : "this"} Image? This operation
              is irreversible.
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
                  await deleteEmbedder(
                    selectedRows.length > 0 ? selectedRows : selectedRowData.id
                  );
                  setSelectedRowData(null);
                  setOpenDeleteDialog(false);
                  setSelectedRows([]);
                  resetRowSelection();
                }}
                isLoading={isDeleteLoading}
              >
                Delete
              </Button>
            </div>
          </>
        </DialogCommon>
      )}

      {openImagePreview && (
        <DialogCommon
          headerTitle="Image Preview"
          open={openImagePreview}
          onOpenChange={(val) => {
            setOpenImagePreview(val);
            if (!val) setPreviewImage(null);
          }}
          className="sm:max-w-4xl"
        >
          <div className="flex items-center justify-center p-4">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        </DialogCommon>
      )}

      {openGenerateHtml && (
        <GenerateHtmlDialog
          open={openGenerateHtml}
          onOpenChange={(val) => {
            setOpenGenerateHtml(val);
            if (!val) setSelectedRowsForHtml([]);
          }}
          selectedRows={selectedRowsForHtml}
        />
      )}
    </section>
  );
};

export default Embedder;

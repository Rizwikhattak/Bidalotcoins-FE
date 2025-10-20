import React from 'react'
import { DataTableCommon } from "@/components/common/DataTableCommon";
import { DataTableColumnHeaderCommon } from "@/components/common/DataTableColumnHeaderCommon";
const Users = () => {
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

    // Bank Name
    {
      accessorKey: "bank_name",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Bank Name" />
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;
        return <span>{data?.bank?.name}</span>;
      },
    },

    // Account Name
    {
      accessorKey: "account_name",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Account Name" />
      ),
      enableSorting: true,
    },

    // Account Number
    {
      accessorKey: "account_no",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Account Number" />
      ),
      enableSorting: true,
    },

    // Account Type
    {
      accessorKey: "account_type",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Account Type" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("account_type");
        return (
          <span
            className={`capitalize px-2 py-1 rounded-xl ${
              type?.toLocaleLowerCase()?.trim()?.replace(/\s+/g, "") ===
              "personal"
                ? "bg-[#EFF8FF] text-[#175CD3]"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {type}
          </span>
        );
      },
      enableSorting: true,
    },

    // Currency
    {
      accessorKey: "currency_code",
      header: ({ column }) => (
        <DataTableColumnHeaderCommon column={column} title="Currency" />
      ),
      enableSorting: true,
      cell: ({ row }) => {
        const data = row.original;
        return <span>{data?.currency?.code}</span>;
      },
    },

    // Actions
    // {
    //   accessorKey: "actions",
    //   header: "Actions",
    //   id: "actions",
    //   cell: ({ row }) => {
    //     setSelectedRowData(row.original);
    //     return (
    //       <>
    //         <div className="flex items-center gap-2">
    //           <Button
    //             variant="ghost"
    //             className="text-gray-400 hover:text-red-600 p-1"
    //             onClick={() => setOpenDeleteModal(true)}
    //             disabled={!hasPermission(PERMISSIONS?.DELETE_BANK_ACCOUNT)}
    //           >
    //             <Trash className="h-4 w-4" />
    //           </Button>
    //           <Button
    //             variant="ghost"
    //             className="text-gray-400 hover:text-purple-600 p-1"
    //             onClick={() => setOpenEditModal(true)}
    //             disabled={!hasPermission(PERMISSIONS?.UPDATE_BANK_ACCOUNT)}
    //           >
    //             <Edit className="h-4 w-4" />
    //           </Button>
    //         </div>
    //       </>
    //     );
    //   },
    //   enableSorting: false,
    //   enableHiding: false,
    // },
  ];
  return (
    <div>
      <DataTableCommon
        // filters={filters}
        columns={columns}
        data={[]}
        isLoading={false}
        // selectedFilter={selectedFilter}
        // setSelectedFilter={setSelectedFilter}
        // totalDataCount={bankAccountsData.count}
        // onFetchData={(offset, limit) =>
        //   dispatch(getAllBankAccounts({ offset, limit }))
        // }
      />
    </div>
  );
}

export default Users

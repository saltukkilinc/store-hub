"use client";

import { redirect } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-group/data-table-column-header";
import DataTableSelectCheckbox from "@/components/data-table-group/data-table-select-checkbox";
import DataTableActionDropdown from "@/components/data-table-group/data-table-action-dropdown";
import { deleteInventoryItem } from "@/lib/actions/inventory-actions";

export type InventoryType = {
  id: string;
  productName: string;
  category: string;
  stockQuantity: number;
  productDescription: string;
};

export const inventoryDataTableColumns: ColumnDef<InventoryType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <DataTableSelectCheckbox table={table} type="header" />
    ),
    cell: ({ row, table }) => (
      <DataTableSelectCheckbox row={row} table={table} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "stockQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock Quantity" />
    ),
    cell: ({ row }) => {
      const stockQuantity = row.getValue("stockQuantity") as number;
      return <div>{stockQuantity}</div>;
    },
  },
  {
    accessorKey: "productDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Description" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const deleteHandler = () => deleteInventoryItem(id);
      const editHandler = () => redirect(`/inventory/edit/${id}`);
      return (
        <DataTableActionDropdown
          onDeleteClick={deleteHandler}
          onEditClick={editHandler}
        />
      );
    },
  },
];

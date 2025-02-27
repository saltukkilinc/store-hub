"use client";

import { ColumnDef, Row, Table } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../../components/data-table-group/data-table-column-header";
import { deleteInventoryItem } from "@/lib/actions/inventory-actions";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useDialogContext } from "@/lib/context/dialog-provider";

export type InventoryType = {
  id: string;
  productName: string;
  category: string;
  stockQuantity: number;
  productDescription: string;
};

type SelectCheckboxPropsType = {
  table: Table<InventoryType>;
  row?: Row<InventoryType>;
  type?: "header" | "cell";
};

export const inventoryDataTableColumns: ColumnDef<InventoryType>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectCheckbox table={table} type="header" />,
    cell: ({ row, table }) => <SelectCheckbox row={row} table={table} />,
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => redirect(`/inventory/edit/${id}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Move to Sale</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteInventoryItem(id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const SelectCheckbox = ({
  row,
  table,
  type = "cell",
}: SelectCheckboxPropsType) => {
  const { dispatch } = useDialogContext();
  return (
    <Checkbox
      checked={
        type === "cell"
          ? (row as Row<InventoryType>).getIsSelected()
          : table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => {
        if (type === "cell") {
          (row as Row<InventoryType>).toggleSelected(!!value);
        }
        if (type === "header") {
          table.toggleAllPageRowsSelected(!!value);
        }
        if (value) {
          toast("Inventory Item Selected", {
            description: "Do you want to delete selected items?",
            position: "top-right",
            action: {
              label: "YES",
              onClick: () => {
                dispatch({
                  type: "OPEN",
                  selectedIds: table
                    .getSelectedRowModel()
                    .rows.map((row) => row.original.id),
                });
                table.toggleAllPageRowsSelected(false);
              },
            },
          });
        }
      }}
      aria-label={type === "cell" ? "Select row" : "Select all"}
    />
  );
};

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../../components/data-table-group/data-table-column-header";

export type ProductType = {
  id: string;
  productName: string;
  description: string;
};

export const productDataTableColumns: ColumnDef<ProductType>[] = [
  {
    id: "nu",
    header: "Nu",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    id: "actions",
    header: () => {
      return <ActionHeader />;
    },
    cell: () => {
      // { row }
      // const id = row.original.id;
      return <ActionCell />;
    },
  },
];

const ActionHeader = () => {
  return (
    <div className="grid grid-flow-col items-center">
      <p>Actions</p>
      <Button onClick={() => console.log("Open")}>Add Item</Button>
    </div>
  );
};

const ActionCell = () => {
  // { id }: { id: string }
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
        <DropdownMenuItem onClick={() => console.log("EDIT")}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("DELETE")}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

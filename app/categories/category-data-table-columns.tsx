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
import { useDialogContext } from "@/lib/context/dialog-provider";
import { deleteCategoryItem } from "@/lib/actions/category-actions";

export type CategoryType = {
  id: string;
  category: string;
  description: string;
};

export const categoryDataTableColumns: ColumnDef<CategoryType>[] = [
  {
    id: "nu",
    header: "Nu",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
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
    cell: ({ row }) => {
      const id = row.original.id;
      return <ActionCell id={id} />;
    },
  },
];

// ** row.original to access data object
// ** value: row.getValue("accessorKey")

const ActionHeader = () => {
  const { dispatch } = useDialogContext();
  return (
    <div className="grid grid-flow-col items-center">
      <p>Actions</p>
      <Button onClick={() => dispatch({ type: "OPEN" })}>Add Item</Button>
    </div>
  );
};

const ActionCell = ({ id }: { id: string }) => {
  const { dispatch } = useDialogContext();
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
        <DropdownMenuItem onClick={() => dispatch({ type: "CLOSE", id })}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => await deleteCategoryItem(id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

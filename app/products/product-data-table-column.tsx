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
import { deleteProductItem } from "@/lib/actions/product-actions";
import Link from "next/link";

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
    cell: ({ row }) => {
      const id = row.original.id;
      return <ActionCell id={id} />;
    },
  },
];

const ActionHeader = () => {
  return (
    <div className="grid grid-flow-col items-center">
      <p>Actions</p>
      <Button asChild>
        <Link href="/products/?dialog=open">Add New</Link>
      </Button>
    </div>
  );
};

const ActionCell = ({ id }: { id: string }) => {
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
        <DropdownMenuItem asChild>
          <Link href={`/products/?dialog=open&id=${id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => await deleteProductItem(id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

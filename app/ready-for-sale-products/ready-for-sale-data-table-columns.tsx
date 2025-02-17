"use client";

import { ColumnDef } from "@tanstack/react-table";

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
import { deleteReadyForSaleProductItem } from "@/lib/actions/ready-for-sale-products-actions";
import { redirect } from "next/navigation";

export type ReadyForSaleProductsType = {
  id: string;
  productName: string;
  category: string;
  availableQuantity: number;
  costPrice: number;
  expenses: number;
  profitMarginPercentage: number;
  productDescription: string;
};

export const inventoryDataTableColumns: ColumnDef<ReadyForSaleProductsType>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
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
      accessorKey: "availableQuantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Available Quantity" />
      ),
      cell: ({ row }) => {
        const stockQuantity = row.getValue("availableQuantity") as number;
        return <div>{stockQuantity}</div>;
      },
    },
    {
      accessorKey: "costPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cost Price" />
      ),
    },
    {
      accessorKey: "expenses",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Expenses" />
      ),
    },
    {
      accessorKey: "profitMarginPercentage",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Profit Margin Percentage"
        />
      ),
      cell: ({ row }) => {
        const profitMarginPercentage = row.getValue(
          "profitMarginPercentage"
        ) as number;
        return <div>{profitMarginPercentage} %</div>;
      },
    },
    {
      id: "salePrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sale Price" />
      ),
      cell: ({ row }) => {
        const expenses = row.getValue("expenses") as number;
        const costPrice = row.getValue("costPrice") as number;
        const profitMarginPercentage = row.getValue(
          "profitMarginPercentage"
        ) as number;
        const profitAmount = costPrice * (profitMarginPercentage / 100);
        const calculatedSalePrice = costPrice + expenses + profitAmount;
        const formattedSalePrice = calculatedSalePrice.toFixed(2);
        return <div>{formattedSalePrice}</div>;
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
              <DropdownMenuItem
                onClick={() => redirect(`/ready-for-sale-products/edit/${id}`)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteReadyForSaleProductItem(id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

// ** row.original to access data object
// ** value: row.getValue("accessorKey")

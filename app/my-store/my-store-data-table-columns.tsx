"use client";

import { redirect } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../components/data-table-group/data-table-column-header";
import { deleteReadyForSaleProductItem } from "@/lib/actions/my-store";
import DataTableSelectCheckbox from "@/components/data-table-group/data-table-select-checkbox";
import DataTableActionDropdown from "@/components/data-table-group/data-table-action-dropdown";

export type MyStoreType = {
  id: string;
  productName: string;
  category: string;
  availableQuantity: number;
  costPrice: number;
  expenses: number;
  profitMarginPercentage: number;
  productDescription: string;
};

export const myStoreDataTableColumns: ColumnDef<MyStoreType>[] =
  [
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
        const deleteHandler = () => deleteReadyForSaleProductItem(id);
        const editHandler = () =>
          redirect(`/my-store/edit/${id}`);
        return (
          <DataTableActionDropdown
            onDeleteClick={deleteHandler}
            onEditClick={editHandler}
          />
        );
      },
    },
  ];

// ** row.original to access data object
// ** value: row.getValue("accessorKey")

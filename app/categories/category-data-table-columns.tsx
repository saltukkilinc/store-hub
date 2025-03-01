"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "../../components/data-table-group/data-table-column-header";
import { useDialogContext } from "@/lib/context/dialog-provider";
import { deleteCategoryItem } from "@/lib/actions/category-actions";
import DataTableActionDropdown from "@/components/data-table-group/data-table-action-dropdown";

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
  const editHandler = () => dispatch({ type: "EDIT_ID", id });
  const deleteHandler = async () => await deleteCategoryItem(id);
  return (
    <DataTableActionDropdown
      onDeleteClick={deleteHandler}
      onEditClick={editHandler}
    />
  );
};

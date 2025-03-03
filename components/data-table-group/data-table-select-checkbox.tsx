import { toast } from "sonner";
import { Row, Table } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { useDialogContext } from "@/lib/context/dialog-provider";
import { Button } from "../ui/button";

type DataTableSelectCheckboxPropsType<TData extends { id: string }> = {
  table: Table<TData>;
  row?: Row<TData>;
  type?: "header" | "cell";
};

export default function DataTableSelectCheckbox<TData extends { id: string }>({
  row,
  table,
  type = "cell",
}: DataTableSelectCheckboxPropsType<TData>) {
  const { dispatch } = useDialogContext();
  return (
    <Checkbox
      checked={
        type === "cell"
          ? (row as Row<TData>).getIsSelected()
          : table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => {
        if (type === "cell") {
          (row as Row<TData>).toggleSelected(!!value);
        }
        if (type === "header") {
          table.toggleAllPageRowsSelected(!!value);
        }
        if (toast.getToasts().length > 0) {
          toast.dismiss(toast.getToasts()[0].id);
        }
        if (value) {
          toast.info("Inventory Item Selected", {
            description: "Do you want to delete selected items?",
            position: "top-center",
            action: {
              label: <Button size="sm">YES</Button>,
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
      className="mb-2.5"
    />
  );
}

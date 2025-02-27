import { toast } from "sonner";
import { Row, Table } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { useDialogContext } from "@/lib/context/dialog-provider";

type SelectCheckboxPropsType<TData extends { id: string }> = {
  table: Table<TData>;
  row?: Row<TData>;
  type?: "header" | "cell";
};

export default function SelectCheckbox<TData extends { id: string }>({
  row,
  table,
  type = "cell",
}: SelectCheckboxPropsType<TData>) {
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
}

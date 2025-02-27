"use client";

import CustomDialog from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { deleteSelectedReadyForSaleProductItems } from "@/lib/actions/ready-for-sale-products-actions";

import { useDialogContext } from "@/lib/context/dialog-provider";

export default function ClientDialogLayer() {
  const { dispatch, state } = useDialogContext();

  const handleDelete = () => {
    deleteSelectedReadyForSaleProductItems(state.selectedIds);
    dispatch({ type: "CLOSE" });
  };
  const handleCancel = () => {
    dispatch({ type: "CLOSE" });
  };

  return (
    <CustomDialog
      title="Delete Selected Item"
      description="Do you want to delete selected items? This action cannot be undone."
    >
      <div className="flex justify-end gap-3">
        <Button variant="destructive" onClick={handleDelete}>
          DELETE
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          CANCEL
        </Button>
      </div>
    </CustomDialog>
  );
}

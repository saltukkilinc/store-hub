"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogContext } from "@/lib/context/dialog-provider";
import { X } from "lucide-react";

type CustomDialogPropsType = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export default function CustomDialog({
  children,
  title,
  description,
}: CustomDialogPropsType) {
  const { state, dispatch } = useDialogContext();
  return (
    <Dialog
      open={state.isDialogOpen}
      onOpenChange={(open) => dispatch({ type: open ? "CLOSE" : "OPEN" })}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <X
          className="h-5 w-5 absolute right-6 top-6 "
          onClick={() => dispatch({ type: "CLOSE" })}
        />
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

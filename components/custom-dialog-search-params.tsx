"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type CustomDialogPropsType = {
  title: string;
  children: React.ReactNode;
  description?: string;
  isDialogOpen: boolean;
  openLink: string;
  closeLink: string;
};

export default function CustomSearchParamsDialog({
  children,
  title,
  description,
  isDialogOpen,
  openLink,
  closeLink,
}: CustomDialogPropsType) {
  const router = useRouter();
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => router.replace(open ? closeLink : openLink)}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <X
          className="h-5 w-5 absolute right-6 top-6 "
          onClick={() => router.replace(closeLink)}
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

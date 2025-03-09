import Link from "next/link";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type CustomAlertType = {
  title: string;
  desc: string;
  href: string;
};
export default function CustomAlert({ title, desc, href }: CustomAlertType) {
  return (
    <Alert>
      <Terminal />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{desc}</AlertDescription>
      <div className="flex justify-end mt-2">
        <Button asChild>
          <Link href={href}>Add</Link>
        </Button>
      </div>
    </Alert>
  );
}

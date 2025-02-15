"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuSubButton } from "@/components/ui/sidebar";

type SidebarMenuSubButtonPropsType = {
  title: string;
  url: string;
};
export default function SidebarMenuSubButtonClient({
  title,
  url,
}: SidebarMenuSubButtonPropsType) {
  const pathname = usePathname();
  const isUrlActive = pathname === url;

  return (
    <SidebarMenuSubButton asChild isActive={isUrlActive}>
      <Link href={url}>{title}</Link>
    </SidebarMenuSubButton>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton } from "@/components/ui/sidebar";

type SidebarMenuButtonPropsType = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};
export default function SidebarMenuButtonClient({
  title,
  url,
  icon,
}: SidebarMenuButtonPropsType) {
  const pathname = usePathname();
  const isUrlActive = pathname === url;
  return (
    <SidebarMenuButton asChild isActive={isUrlActive}>
      <Link href={url}>
        {icon && icon}
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
}

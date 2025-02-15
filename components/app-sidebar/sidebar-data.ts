import { Database, Store } from "lucide-react";

export const data = {
  header: {
    title: "Store Hub",
    logoSrc: "/favicon.ico",
  },
  navMain: [
    {
      title: "Inventory",
      icon: Database,
      items: [
        {
          title: "View Inventory",
          url: "/inventory",
        },
        {
          title: "Add Inventory",
          url: "/inventory/add",
        },
      ],
    },
    {
      title: "Ready For Sale Products",
      icon: Store,
      items: [
        {
          title: "View Products",
          url: "/ready-for-sale-products",
        },
        {
          title: "Add Product",
          url: "/ready-for-sale-products/add",
        },
      ],
    },
  ],
};

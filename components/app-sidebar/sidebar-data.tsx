import {
  Database,
  Store,
  LayoutGrid,
  Shapes,
  ChartColumnBig,
} from "lucide-react";

export const data = {
  header: {
    title: "Store Hub",
    logoSrc: "/favicon.ico",
  },
  navMain: [
    {
      title: "Visual Reports",
      url: "/visual-reports",
      icon: <ChartColumnBig />,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: <LayoutGrid />,
    },
    {
      title: "Products",
      url: "/products",
      icon: <Shapes />,
    },
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
          title: "View Store",
          url: "/ready-for-sale-products",
        },
        {
          title: "Add Product into Store",
          url: "/ready-for-sale-products/add",
        },
      ],
    },
  ],
};

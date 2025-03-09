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
      title: "My Store",
      icon: Store,
      items: [
        {
          title: "View My Store",
          url: "/my-store",
        },
        {
          title: "Add Item into My Store",
          url: "/my-store/add",
        },
      ],
    },
  ],
};

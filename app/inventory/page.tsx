import {
  InventoryType,
  inventoryDataTableColumns,
} from "./inventory-data-table-columns";
import { DataTableGroup } from "../../components/data-table-group";

async function getData(): Promise<InventoryType[]> {
  const productNames = [
    "Laptop",
    "Smartphone",
    "Tablet",
    "Headphones",
    "Keyboard",
    "Mouse",
    "Monitor",
    "Printer",
    "Camera",
    "Speaker",
  ];
  const categories = [
    "Electronics",
    "Computers",
    "Accessories",
    "Home Appliances",
    "Gadgets",
  ];

  const randomPayments: InventoryType[] = Array.from(
    { length: 30 },
    (_, index) => ({
      id: `728ed${Math.random().toString(36).substring(2, 8)}`,
      productName:
        productNames[Math.floor(Math.random() * productNames.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      stockQuantity: Math.floor(Math.random() * 100) + 1,
      productDescription: `Description for ${
        productNames[Math.floor(Math.random() * productNames.length)]
      }`,
      actions: "Edit, Delete, Move",
    })
  );

  return randomPayments;
}

export default async function InventoryManagementPage() {
  const data = await getData();
  return (
    <main className="container mx-auto p-8">
      <h1>Inventory Management</h1>
      <DataTableGroup
        columns={inventoryDataTableColumns}
        data={data}
        filterId="productName"
        filterPlaceholder="Filter by product name..."
      />
    </main>
  );
}

import {
  Payment,
  inventoryDataTableColumns,
} from "./inventory-data-table-columns";
import { DataTableGroup } from "../../components/data-table-group";

async function getData(): Promise<Payment[]> {
  const randomPayments: Payment[] = Array.from({ length: 15 }, (_, index) => ({
    id: `728ed${Math.random().toString(36).substring(2, 8)}`,
    amount: Math.floor(Math.random() * 1000) + 1,
    status: ["pending", "processing", "success", "failed"][
      Math.floor(Math.random() * 4)
    ] as "pending" | "processing" | "success" | "failed",
    email: `user${index + 1}@example.com`,
  }));

  return randomPayments;
}

export default async function InventoryManagementPage() {
  const data = await getData();
  return (
    <main className="container mx-auto p-8">
      <h1>Inventory Management</h1>
      <DataTableGroup columns={inventoryDataTableColumns} data={data} />
    </main>
  );
}

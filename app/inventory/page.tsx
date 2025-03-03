import { inventoryDataTableColumns } from "./inventory-data-table-columns";
import { DataTableGroup } from "../../components/data-table-group";
import { getInventory } from "@/lib/actions/inventory-actions";
import ClientDialogLayer from "./client-dialog-layer";

export default async function InventoryManagementPage() {
  const data = await getInventory();
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">Inventory Management</h1>
      <DataTableGroup
        columns={inventoryDataTableColumns}
        data={data}
        filterId="productName"
        filterPlaceholder="Filter by product name..."
      />
      <ClientDialogLayer />
    </main>
  );
}

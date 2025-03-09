import { DataTableGroup } from "@/components/data-table-group";
import { myStoreDataTableColumns } from "./my-store-data-table-columns";
import { getAllMyStore } from "@/lib/actions/my-store";
import ClientDialogLayer from "./client-dialog-layer";

export default async function MyStorePage() {
  const data = await getAllMyStore();
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">My Store</h1>
      <DataTableGroup
        columns={myStoreDataTableColumns}
        data={data}
        filterId="productName"
        filterPlaceholder="Filter by product name..."
      />
      <ClientDialogLayer />
    </main>
  );
}

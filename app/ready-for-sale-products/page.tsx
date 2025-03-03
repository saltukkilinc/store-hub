import { DataTableGroup } from "@/components/data-table-group";
import { inventoryDataTableColumns } from "./ready-for-sale-data-table-columns";
import { getReadyForSaleProducts } from "@/lib/actions/ready-for-sale-products-actions";
import ClientDialogLayer from "./client-dialog-layer";

export default async function ReadyForSaleProductsPage() {
  const data = await getReadyForSaleProducts();
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">Ready For Sale Products</h1>
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

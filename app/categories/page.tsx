import { DataTableGroup } from "@/components/data-table-group";
import { categoryDataTableColumns } from "./category-data-table-columns";
import { getCategories } from "@/lib/actions/category-actions";
import ClientDialogLayer from "./client-dialog-layer";

export default async function CategoryPage() {
  const data = await getCategories();

  return (
    <main className="container p-8 mx-auto">
      <h1>Category Management</h1>
      <DataTableGroup
        columns={categoryDataTableColumns}
        data={data}
        filterId="category"
        filterPlaceholder="Filter by category name..."
      />
      <ClientDialogLayer />
    </main>
  );
}

import { DataTableGroup } from "@/components/data-table-group";
import { categoryDataTableColumns } from "./category-data-table-columns";
import { addCategoryItem, getCategories } from "@/lib/actions/category-actions";
import CustomDialog from "@/components/custom-dialog";
import CategoryForm, { CategoryFormValues } from "./category-form";

const handleAddCategory = async (values: CategoryFormValues) => {
  "use server";
  await addCategoryItem(values);
};
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
      <CustomDialog title="Add Category">
        <CategoryForm submitHandler={handleAddCategory} />
      </CustomDialog>
    </main>
  );
}

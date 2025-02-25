import InventoryForm from "../inventory-form";
import { addInventoryItem } from "@/lib/actions/inventory-actions";
import { getProducts } from "@/lib/actions/product-actions";
import { getCategories } from "@/lib/actions/category-actions";

export default async function AddInventoryPage() {
  const productsData = getProducts();
  const categoriesData = getCategories();
  const [products, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center">Add Inventory Form</h1>
      <InventoryForm
        submitHandler={addInventoryItem}
        products={products}
        categories={categories}
      />
    </main>
  );
}

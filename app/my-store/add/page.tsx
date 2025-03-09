import MyStoreForm from "../my-store-form";
import { addReadyForSaleProductItem } from "@/lib/actions/my-store";
import { getProducts } from "@/lib/actions/product-actions";
import { getCategories } from "@/lib/actions/category-actions";

export default async function AddItemIntoMyStorePage() {
  const productsData = getProducts();
  const categoriesData = getCategories();
  const [products, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center text-2xl">Add Item into My Store</h1>
      <MyStoreForm
        submitHandler={addReadyForSaleProductItem}
        products={products}
        categories={categories}
      />
    </main>
  );
}

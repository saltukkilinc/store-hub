import ReadyForSaleProductsForm from "../ready-for-sale-products-form";
import { addReadyForSaleProductItem } from "@/lib/actions/ready-for-sale-products-actions";
import { getProducts } from "@/lib/actions/product-actions";
import { getCategories } from "@/lib/actions/category-actions";

export default async function AddProductPage() {
  const productsData = getProducts();
  const categoriesData = getCategories();
  const [products, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center text-2xl">Add Product Form</h1>
      <ReadyForSaleProductsForm
        submitHandler={addReadyForSaleProductItem}
        products={products}
        categories={categories}
      />
    </main>
  );
}

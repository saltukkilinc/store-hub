import { getInventory } from "@/lib/actions/inventory-actions";
import PieChartInventoryProduct from "./pie-chart-inventory-product";
import { getProducts } from "@/lib/actions/product-actions";
import PieChartInventoryCategory from "./pie-chart-inventory-category";
import { getCategories } from "@/lib/actions/category-actions";

// import ExampleChart from "./example-chart";

export default async function VisualReportsPage() {
  const inventory = await getInventory();
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">Visual Reports</h1>
      {/* <ExampleChart /> */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-4">
        <PieChartInventoryProduct data={inventory} products={products} />
        <PieChartInventoryCategory data={inventory} categories={categories} />
      </section>
    </main>
  );
}

import { getInventory } from "@/lib/actions/inventory-actions";
import PieChartProduct from "./pie-chart-product";
import { getProducts } from "@/lib/actions/product-actions";
import PieChartInventoryCategory from "./pie-chart-inventory-category";
import { getCategories } from "@/lib/actions/category-actions";
import { getReadyForSaleProducts } from "@/lib/actions/ready-for-sale-products-actions";
import PieChartReadyForSaleCategory from "./pie-chart-ready-for-sale-category";

// import ExampleChart from "./example-chart";
// I didn't make a one big PieChart component because it increases complexity and reduces flexibility.
export default async function VisualReportsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const inventory = await getInventory();
  const readyForSaleProducts = await getReadyForSaleProducts();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">Visual Reports</h1>
      {/* <ExampleChart /> */}
      <section className="grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 mt-12">
        <h2 className="text-xl sm:col-span-2">Inventory</h2>
        <PieChartProduct
          data={inventory}
          products={products}
          title="Inventory Product Pie Chart"
          description="This chart shows the product distribution in inventory data."
          dataKey="stockQuantity"
        />
        <PieChartInventoryCategory data={inventory} categories={categories} />
        <h2 className="text-xl sm:col-span-2">Ready For Sale Products</h2>
        <PieChartProduct
          data={readyForSaleProducts}
          products={products}
          title="Ready For Sale Product Pie Chart"
          description="This chart shows the product distribution in Ready for sale products."
          dataKey="availableQuantity"
        />
        <PieChartReadyForSaleCategory
          data={readyForSaleProducts}
          categories={categories}
        />
      </section>
    </main>
  );
}

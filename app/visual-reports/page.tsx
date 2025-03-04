import { getInventory } from "@/lib/actions/inventory-actions";
import ExampleChart from "./example-chart";
import PieChartInventoryProduct from "./pie-chart-inventory-product";

export default async function VisualReportsPage() {
  const inventory = await getInventory();
  console.log(inventory);
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">Visual Reports</h1>
      <ExampleChart />
      <PieChartInventoryProduct data={inventory} />
    </main>
  );
}

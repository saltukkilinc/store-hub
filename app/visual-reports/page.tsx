import CustomPieChart from "./custom-pie-chart";
import CustomBarChart from "./custom-bar-chart";

import { getAllMyStore } from "@/lib/actions/my-store";
import { getCategories } from "@/lib/actions/category-actions";
import { getProducts } from "@/lib/actions/product-actions";
import { getInventory } from "@/lib/actions/inventory-actions";
import {
  handleCategoryPieChartConfig,
  handleEditInventoryCategoryPieChartData,
  handleEditMyStoreCategoryPieChartData,
  handleInventoryProductNamePieChartData,
  handleMyStoreProductNamePieChartData,
  handleProductPieChartConfig,
  inventoryStockQuantityBarChartConfig,
  myStoreCostPriceBarChartConfig,
} from "./lib/helper";
import CustomAlert from "@/components/custom-alert";

export default async function VisualReportsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const inventory = await getInventory();
  const myStoreData = await getAllMyStore();
  // ** Pie Chart Configs
  const productPieChartConfig = handleProductPieChartConfig(products);
  const categoryPieChartConfig = handleCategoryPieChartConfig(categories);
  // ** Pie Chart Edited Data
  const editedInventoryProductNamePieChartData =
    handleInventoryProductNamePieChartData(inventory);
  const editedMyStoreProductNamePieChartData =
    handleMyStoreProductNamePieChartData(myStoreData);
  const editedInventoryCategoryPieChartData =
    handleEditInventoryCategoryPieChartData(inventory);
  const editedMyStoreCategoryPieChart =
    handleEditMyStoreCategoryPieChartData(myStoreData);

  const isHaveData = (data: Record<string, string | number>[]) =>
    data && data.length > 0;
  const isInventoryData = isHaveData(inventory);
  const isMyStoreData = isHaveData(myStoreData);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">Visual Reports</h1>
      {/* <ExampleChart /> */}
      <section className="grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 mt-12">
        <h2 className="text-xl sm:col-span-2">Inventory Charts</h2>
        {!isInventoryData && (
          <CustomAlert
            title="Inventory Charts Not Found!"
            desc="To add inventory data you can click the add button."
            href="/inventory/add"
          />
        )}
        {isInventoryData && (
          <CustomPieChart
            data={editedInventoryProductNamePieChartData}
            chartConfig={productPieChartConfig}
            title="Inventory Product Pie Chart"
            description="This chart shows the product distribution in inventory data."
            dataKey="stockQuantity"
            nameKey="productName"
          />
        )}
        {isInventoryData && (
          <CustomPieChart
            data={editedInventoryCategoryPieChartData}
            chartConfig={categoryPieChartConfig}
            title="Inventory Category Pie Chart"
            description="This chart shows the category distribution in inventory data."
            dataKey="stockQuantity"
            nameKey="category"
          />
        )}
        {isInventoryData && (
          <CustomBarChart
            data={inventory}
            xAxisDataKey="productName"
            yAxisDataKey="stockQuantity"
            barDataKey="stockQuantity"
            barFill="var(--color-stockQuantity)"
            chartConfig={inventoryStockQuantityBarChartConfig}
            title="Inventory Product Bar Chart"
            description="This bar chart shows the product stock quantity distribution in the inventory data."
          />
        )}
        <h2 className="text-xl sm:col-span-2">My Store Charts</h2>
        {!isMyStoreData && (
          <CustomAlert
            title="My Store Charts Not Found!"
            desc="To add my store data you can click the add button."
            href="/my-store/add"
          />
        )}
        {isMyStoreData && (
          <CustomPieChart
            data={editedMyStoreProductNamePieChartData}
            chartConfig={productPieChartConfig}
            title="Ready For Sale Product Pie Chart"
            description="This chart shows the product distribution in Ready for sale products."
            dataKey="availableQuantity"
            nameKey="productName"
          />
        )}
        {isMyStoreData && (
          <CustomPieChart
            data={editedMyStoreCategoryPieChart}
            chartConfig={categoryPieChartConfig}
            title="Ready For Sale Category Pie Chart"
            description="This chart shows the ready for sale category distribution in ready for sale
          data."
            dataKey="availableQuantity"
            nameKey="category"
          />
        )}
        {isMyStoreData && (
          <CustomBarChart
            data={myStoreData}
            xAxisDataKey="productName"
            yAxisDataKey="costPrice"
            barDataKey="costPrice"
            barFill="var(--color-costPrice)"
            chartConfig={myStoreCostPriceBarChartConfig}
            title="Ready For Sale Product Bar Chart"
            description="This bar chart shows the product cost price distribution in the ready for sale products data."
          />
        )}
      </section>
    </main>
  );
}

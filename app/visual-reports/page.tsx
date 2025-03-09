import CustomPieChart from "./custom-pie-chart";
import BarChartProduct from "./bar-chart-inventory-stock-quantity";

import { getReadyForSaleProducts } from "@/lib/actions/ready-for-sale-products-actions";
import { getCategories } from "@/lib/actions/category-actions";
import { getProducts } from "@/lib/actions/product-actions";
import { getInventory } from "@/lib/actions/inventory-actions";
import { ChartConfig } from "@/components/ui/chart";
import { getRandomHslColor } from "@/lib/utils";

export default async function VisualReportsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const inventory = await getInventory();
  const readyForSaleProducts = await getReadyForSaleProducts();
  const inventoryStockQuantityBarChartConfig = {
    stockQuantity: {
      label: "Stock Qty",
      color: "hsl(var(--chart-1))",
    },
  };
  const readyForSaleProductsBarChartConfig = {
    costPrice: {
      label: "Cost Price",
      color: "hsl(var(--chart-2))",
    },
  };
  const productPieChartConfig = products?.reduce(
    (acc: ChartConfig, product) => {
      acc[product.productName.replace(" ", "")] = {
        label: product.productName,
        color: getRandomHslColor(),
      };
      return acc;
    },
    {}
  );
  const categoryPieChartConfig = categories.reduce((acc: ChartConfig, item) => {
    acc[item.category.replace(/\s/g, "")] = {
      label: item.category,
      color: getRandomHslColor(),
    };
    return acc;
  }, {});
  const editedInventoryProductPieChartData = inventory.map((i) => ({
    ...i,
    fill: `var(--color-${i.productName.replace(" ", "")})`,
  }));
  const editedReadyForSaleProductsPieChartData = readyForSaleProducts.map(
    (i) => ({
      ...i,
      fill: `var(--color-${i.productName.replace(" ", "")})`,
    })
  );
  const handleEditInventoryCategoryPieChartData = () => {
    const array: { category: string; fill: string; stockQuantity: number }[] =
      [];
    inventory.forEach((i) => {
      const foundIndex = array.findIndex(
        (item) => item.category === i.category
      );
      if (foundIndex === -1) {
        array.push({
          category: i.category,
          stockQuantity: i.stockQuantity,
          fill: `var(--color-${i.category.replace(/\s/g, "")})`,
        });
      }
      if (foundIndex !== -1) {
        array[foundIndex].stockQuantity += i.stockQuantity;
      }
    });
    return array;
  };
  const handleEditReadyForSaleProductCategoryPieChart = () => {
    const array: {
      category: string;
      fill: string;
      availableQuantity: number;
    }[] = [];
    readyForSaleProducts.forEach((i) => {
      const foundIndex = array.findIndex(
        (item) => item.category === i.category
      );
      if (foundIndex === -1) {
        array.push({
          category: i.category,
          availableQuantity: i.availableQuantity,
          fill: `var(--color-${i.category.replace(/\s/g, "")})`,
        });
      }
      if (foundIndex !== -1) {
        array[foundIndex].availableQuantity += i.availableQuantity;
      }
    });
    return array;
  };
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl">Visual Reports</h1>
      {/* <ExampleChart /> */}
      <section className="grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 mt-12">
        <h2 className="text-xl sm:col-span-2">Inventory</h2>
        <CustomPieChart
          data={editedInventoryProductPieChartData}
          chartConfig={productPieChartConfig}
          title="Inventory Product Pie Chart"
          description="This chart shows the product distribution in inventory data."
          dataKey="stockQuantity"
          nameKey="productName"
        />
        <CustomPieChart
          data={handleEditInventoryCategoryPieChartData()}
          chartConfig={categoryPieChartConfig}
          title="Inventory Category Pie Chart"
          description="This chart shows the category distribution in inventory data."
          dataKey="stockQuantity"
          nameKey="category"
        />
        <BarChartProduct
          data={inventory}
          xAxisDataKey="productName"
          yAxisDataKey="stockQuantity"
          barDataKey="stockQuantity"
          barFill="var(--color-stockQuantity)"
          chartConfig={inventoryStockQuantityBarChartConfig}
          title="Inventory Product Bar Chart"
          description="This bar chart shows the product stock quantity distribution in the inventory data."
        />
        <h2 className="text-xl sm:col-span-2">Ready For Sale Products</h2>
        <CustomPieChart
          data={editedReadyForSaleProductsPieChartData}
          chartConfig={productPieChartConfig}
          title="Ready For Sale Product Pie Chart"
          description="This chart shows the product distribution in Ready for sale products."
          dataKey="availableQuantity"
          nameKey="productName"
        />

        <CustomPieChart
          data={handleEditReadyForSaleProductCategoryPieChart()}
          chartConfig={categoryPieChartConfig}
          title="Ready For Sale Category Pie Chart"
          description="This chart shows the ready for sale category distribution in ready for sale
          data."
          dataKey="availableQuantity"
          nameKey="category"
        />
        <BarChartProduct
          data={readyForSaleProducts}
          xAxisDataKey="productName"
          yAxisDataKey="costPrice"
          barDataKey="costPrice"
          barFill="var(--color-costPrice)"
          chartConfig={readyForSaleProductsBarChartConfig}
          title="Ready For Sale Product Bar Chart"
          description="This bar chart shows the product cost price distribution in the ready for sale products data."
        />
      </section>
    </main>
  );
}

import { CategoryType } from "@/app/categories/category-data-table-columns";
import { InventoryType } from "@/app/inventory/inventory-data-table-columns";
import { MyStoreType } from "@/app/my-store/my-store-data-table-columns";
import { ProductType } from "@/app/products/product-data-table-column";
import { ChartConfig } from "@/components/ui/chart";
import { getRandomHslColor } from "@/lib/utils";

// ** Bar Chart Configs
const inventoryStockQuantityBarChartConfig = {
  stockQuantity: {
    label: "Stock Qty",
    color: "hsl(var(--chart-1))",
  },
};
const myStoreCostPriceBarChartConfig = {
  costPrice: {
    label: "Cost Price",
    color: "hsl(var(--chart-2))",
  },
};

// ** Pie Chart Configs
const handleProductPieChartConfig = (products: ProductType[]) =>
  products?.reduce((acc: ChartConfig, product) => {
    acc[product.productName.replace(" ", "")] = {
      label: product.productName,
      color: getRandomHslColor(),
    };
    return acc;
  }, {});
const handleCategoryPieChartConfig = (categories: CategoryType[]) =>
  categories.reduce((acc: ChartConfig, item) => {
    acc[item.category.replace(/\s/g, "")] = {
      label: item.category,
      color: getRandomHslColor(),
    };
    return acc;
  }, {});

// ** Pie Chart Edit Data
const handleInventoryProductNamePieChartData = (inventory: InventoryType[]) =>
  inventory.map((i) => ({
    ...i,
    fill: `var(--color-${i.productName.replace(" ", "")})`,
  }));

const handleMyStoreProductNamePieChartData = (myStoreData: MyStoreType[]) =>
  myStoreData.map((i) => ({
    ...i,
    fill: `var(--color-${i.productName.replace(" ", "")})`,
  }));

const handleEditInventoryCategoryPieChartData = (
  inventory: InventoryType[]
) => {
  const array: { category: string; fill: string; stockQuantity: number }[] = [];
  inventory.forEach((i) => {
    const foundIndex = array.findIndex((item) => item.category === i.category);
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

const handleEditMyStoreCategoryPieChartData = (myStoreData: MyStoreType[]) => {
  const array: {
    category: string;
    fill: string;
    availableQuantity: number;
  }[] = [];
  myStoreData.forEach((i) => {
    const foundIndex = array.findIndex((item) => item.category === i.category);
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

export {
  inventoryStockQuantityBarChartConfig,
  myStoreCostPriceBarChartConfig,
  handleProductPieChartConfig,
  handleCategoryPieChartConfig,
  handleInventoryProductNamePieChartData,
  handleMyStoreProductNamePieChartData,
  handleEditInventoryCategoryPieChartData,
  handleEditMyStoreCategoryPieChartData
};

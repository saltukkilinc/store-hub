import { DataTableGroup } from "@/components/data-table-group";
import {
  inventoryDataTableColumns,
  ReadyForSaleProductsType,
} from "./ready-for-sale-data-table-columns";

async function getReadyForSaleProducts(): Promise<ReadyForSaleProductsType[]> {
  const productNames = [
    "Laptop",
    "Smartphone",
    "Tablet",
    "Headphones",
    "Keyboard",
    "Mouse",
    "Monitor",
    "Printer",
    "Camera",
    "Speaker",
  ];
  const categories = [
    "Electronics",
    "Computers",
    "Accessories",
    "Home Appliances",
    "Gadgets",
  ];

  const randomProducts: ReadyForSaleProductsType[] = Array.from(
    { length: 15 },
    (_, index) => {
      const costPrice = Math.floor(Math.random() * 500) + 50;
      const expenses = Math.floor(Math.random() * 50) + 10;
      const profitMarginPercentage = Math.floor(Math.random() * 50) + 10;

      return {
        id: `728ed${Math.random().toString(36).substring(2, 8)}`,
        productName:
          productNames[Math.floor(Math.random() * productNames.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        availableQuantity: Math.floor(Math.random() * 100) + 1,
        costPrice: costPrice,
        expenses: expenses,
        profitMarginPercentage: profitMarginPercentage,
        productDescription: `Description for ${
          productNames[Math.floor(Math.random() * productNames.length)]
        }`,
      };
    }
  );

  return randomProducts;
}

export default async function ReadyForSaleProductsPage() {
  const data = await getReadyForSaleProducts();
  return (
    <main className="container mx-auto p-8">
      <h1>Ready For Sale Products</h1>
      <DataTableGroup
        columns={inventoryDataTableColumns}
        data={data}
        filterId="productName"
        filterPlaceholder="Filter by product name..."
      />
    </main>
  );
}

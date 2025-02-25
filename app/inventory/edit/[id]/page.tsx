import React from "react";
import InventoryForm, { InventoryFormValues } from "../../inventory-form";
import {
  getInventoryItem,
  updateInventoryItem,
} from "@/lib/actions/inventory-actions";
import { getProducts } from "@/lib/actions/product-actions";
import { getCategories } from "@/lib/actions/category-actions";

type EditInventoryPagePropsType = {
  params: Promise<{ id: string }>;
};
export default async function EditInventoryPage({
  params,
}: EditInventoryPagePropsType) {
  const inventoryId = (await params).id;
  const inventoryItem = await getInventoryItem(inventoryId);
  const getInventoryItemWithoutId = () => {
    if (!inventoryItem) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...inventoryItemWithoutId } = inventoryItem;
    return inventoryItemWithoutId;
  };

  const productsData = getProducts();
  const categoriesData = getCategories();
  const [products, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  const handleEditInventory = async (values: InventoryFormValues) => {
    "use server";
    await updateInventoryItem({ ...values, id: inventoryId });
  };
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center">Edit Inventory Form</h1>
      <InventoryForm
        submitHandler={handleEditInventory}
        values={getInventoryItemWithoutId()}
        products={products}
        categories={categories}
      />
    </main>
  );
}

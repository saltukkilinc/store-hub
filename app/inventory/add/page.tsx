import React from "react";
import InventoryForm, { InventoryFormValues } from "../inventory-form";
import { addInventoryItem } from "@/lib/actions/inventory-actions";

const handleAddInventory = async (values: InventoryFormValues) => {
  "use server";
  await addInventoryItem(values);
};

export default function AddInventoryPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center">Add Inventory Form</h1>
      <InventoryForm submitHandler={handleAddInventory} />
    </main>
  );
}

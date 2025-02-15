import React from "react";
import InventoryForm, { InventoryFormValues } from "../inventory-form";

export default function AddInventoryPage() {
  const handleAddInventory = async (values: InventoryFormValues) => {
    "use server";

    console.log("Form SUbmitted", values);
  };
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center">Add Inventory Form</h1>
      <InventoryForm submitHandler={handleAddInventory} />
    </main>
  );
}

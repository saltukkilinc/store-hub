import React from "react";
import ReadyForSaleProductsForm, {
  ReadyForSaleProductsFormValues,
} from "../ready-for-sale-products-form";
import { addReadyForSaleProductItem } from "@/lib/actions/ready-for-sale-products-actions";

export default function AddProductPage() {
  const handleAddInventory = async (values: ReadyForSaleProductsFormValues) => {
    "use server";
    await addReadyForSaleProductItem(values);
  };
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-center">Add Product Form</h1>
      <ReadyForSaleProductsForm submitHandler={handleAddInventory} />
    </main>
  );
}

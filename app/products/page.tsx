import React from "react";

import { DataTableGroup } from "@/components/data-table-group";
import { productDataTableColumns } from "./product-data-table-column";
import ProductForm, { ProductFormValues } from "./product-form";

import { addProductItem, getProducts } from "@/lib/actions/product-actions";

const handleAddProduct = async (values: ProductFormValues) => {
  "use server";
  await addProductItem(values);
};

export default async function ProductsPage() {
  const data = await getProducts();
  return (
    <main className="container p-8 mx-auto">
      <h1>Product Management</h1>
      <DataTableGroup
        columns={productDataTableColumns}
        data={data}
        filterId="productName"
        filterPlaceholder="Filter by product name..."
      />
      <ProductForm submitHandler={handleAddProduct} />
    </main>
  );
}

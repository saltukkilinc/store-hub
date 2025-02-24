import { DataTableGroup } from "@/components/data-table-group";
import React from "react";
import { productDataTableColumns } from "./product-data-table-column";

export default function ProductsPage() {
  return (
    <main className="container p-8 mx-auto">
      <h1>Product Management</h1>
      <DataTableGroup
        columns={productDataTableColumns}
        data={[
          { id: "1", productName: "Product 1", description: "Description 1" },
          { id: "2", productName: "Product 2", description: "Description 2" },
        ]}
        filterId="productName"
        filterPlaceholder="Filter by product name..."
      />
    </main>
  );
}

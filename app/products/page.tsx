import React from "react";

import { DataTableGroup } from "@/components/data-table-group";
import { productDataTableColumns } from "./product-data-table-column";
import ProductForm, { ProductFormValues } from "./product-form";

import {
  addProductItem,
  getProductItem,
  getProducts,
  updateProductItem,
} from "@/lib/actions/product-actions";
import CustomSearchParamsDialog from "@/components/custom-dialog-search-params";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type ProductsPagePropsType = {
  searchParams: SearchParams;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPagePropsType) {
  const params = await searchParams;
  const data = await getProducts();
  const productItem = await getProductItem(params.id as string);
  const getItemWithoutId = () => {
    if (!productItem) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...itemWithoutId } = productItem;
    return itemWithoutId;
  };

  const isDialogOpen = params.dialog === "open";

  const IS_EDIT_FORM = isDialogOpen && !!params.id;

  const handleEditProductItem = async (values: ProductFormValues) => {
    "use server";
    await updateProductItem({ ...values, id: params.id as string });
    redirect("/products");
  };

  return (
    <main className="container p-8 mx-auto">
      <h1>Product Management</h1>
      <DataTableGroup
        columns={productDataTableColumns}
        data={data}
        filterId="productName"
        filterPlaceholder="Filter by product name..."
      />

      <CustomSearchParamsDialog
        title={IS_EDIT_FORM ? "Edit Product" : "Add Product"}
        isDialogOpen={isDialogOpen}
        openLink="/products/?dialog=open"
        closeLink="/products"
      >
        <ProductForm
          submitHandler={IS_EDIT_FORM ? handleEditProductItem : addProductItem}
          values={getItemWithoutId()}
        />
      </CustomSearchParamsDialog>
    </main>
  );
}

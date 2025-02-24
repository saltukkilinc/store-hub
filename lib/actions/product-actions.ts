"use server";

import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

import { ProductType } from "@/app/products/product-data-table-column";
import { ProductFormValues } from "@/app/products/product-form";

const filePath = path.join(process.cwd(), "lib", "data", "product.json");

export async function getProducts(): Promise<ProductType[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductItem(id: string) {
  try {
    const data = await getProducts();
    return data.find((i) => i.id === id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addProductItem(item: ProductFormValues) {
  const data = await getProducts();
  data.push({ ...item, id: uuidv4() });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/products");
  return data;
}

export async function updateProductItem(item: ProductType) {
  let data = await getProducts();
  data = data.map((i) => (i.id === item.id ? item : i));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/products");
}

export async function deleteProductItem(id: string) {
  let data = await getProducts();
  data = data.filter((i) => i.id !== id);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/products");
  return data;
}

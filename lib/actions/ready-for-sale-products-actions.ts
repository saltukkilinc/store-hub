"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

import { ReadyForSaleProductsType } from "@/app/ready-for-sale-products/ready-for-sale-data-table-columns";
import { ReadyForSaleProductsFormValues } from "@/app/ready-for-sale-products/ready-for-sale-products-form";

const filePath = path.join(
  process.cwd(),
  "lib",
  "data",
  "ready-for-sale-products.json"
);

export async function getReadyForSaleProducts(): Promise<
  ReadyForSaleProductsType[]
> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getReadyForSaleProductItem(id: string) {
  try {
    const data = await getReadyForSaleProducts();
    return data.find((item) => item.id === id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addReadyForSaleProductItem(
  item: ReadyForSaleProductsFormValues
) {
  const data = await getReadyForSaleProducts();
  data.push({ ...item, id: uuidv4() });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return data;
}

export async function updateReadyForSaleProductItem(
  item: ReadyForSaleProductsType
) {
  let data = await getReadyForSaleProducts();
  data = data.map((i) => (i.id === item.id ? item : i));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/ready-for-sale-products");
  redirect("/ready-for-sale-products");
}

export async function deleteReadyForSaleProductItem(id: string) {
  let inventory = await getReadyForSaleProducts();
  inventory = inventory.filter((item) => item.id !== id);
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  revalidatePath("/ready-for-sale-products");
  return inventory;
}

export async function deleteSelectedReadyForSaleProductItems(ids: string[]) {
  let inventory = await getReadyForSaleProducts();
  inventory = inventory.filter((item) => !ids.includes(item.id));
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  revalidatePath("/ready-for-sale-products");
  return inventory;
}

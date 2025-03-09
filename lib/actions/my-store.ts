"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

import { MyStoreType } from "@/app/my-store/my-store-data-table-columns";
import { MyStoreFormValues } from "@/app/my-store/my-store-form";

const filePath = path.join(process.cwd(), "lib", "data", "my-store.json");

export async function getAllMyStore(): Promise<MyStoreType[]> {
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
    const data = await getAllMyStore();
    return data.find((item) => item.id === id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addReadyForSaleProductItem(item: MyStoreFormValues) {
  const data = await getAllMyStore();
  data.push({ ...item, id: uuidv4() });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return data;
}

export async function updateReadyForSaleProductItem(item: MyStoreType) {
  let data = await getAllMyStore();
  data = data.map((i) => (i.id === item.id ? item : i));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/my-store");
  redirect("/my-store");
}

export async function deleteReadyForSaleProductItem(id: string) {
  let inventory = await getAllMyStore();
  inventory = inventory.filter((item) => item.id !== id);
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  revalidatePath("/my-store");
  return inventory;
}

export async function deleteSelectedReadyForSaleProductItems(ids: string[]) {
  let inventory = await getAllMyStore();
  inventory = inventory.filter((item) => !ids.includes(item.id));
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  revalidatePath("/my-store");
  return inventory;
}

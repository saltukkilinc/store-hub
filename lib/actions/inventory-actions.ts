"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

import { InventoryType } from "@/app/inventory/inventory-data-table-columns";
import { InventoryFormValues } from "@/app/inventory/inventory-form";

const filePath = path.join(process.cwd(), "lib", "data", "inventory.json");

export async function getInventory(): Promise<InventoryType[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getInventoryItem(id: string) {
  try {
    const inventory = await getInventory();
    return inventory.find((item) => item.id === id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addInventoryItem(item: InventoryFormValues) {
  const inventory = await getInventory();
  inventory.push({ ...item, id: uuidv4() });
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  return inventory;
}

export async function updateInventoryItem(item: InventoryType) {
  let inventory = await getInventory();
  inventory = inventory.map((i) => (i.id === item.id ? item : i));
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  revalidatePath("/inventory");
  redirect("/inventory");
}

export async function deleteInventoryItem(id: string) {
  let inventory = await getInventory();
  inventory = inventory.filter((item) => item.id !== id);
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  revalidatePath("/inventory");
  return inventory;
}

export async function deleteSelectedInventoryItems(ids: string[]) {
  let inventory = await getInventory();
  inventory = inventory.filter((item) => !ids.includes(item.id));
  await fs.writeFile(filePath, JSON.stringify(inventory, null, 2));
  revalidatePath("/inventory");
  return inventory;
}

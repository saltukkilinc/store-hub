"use server";

import { CategoryType } from "@/app/categories/category-data-table-columns";
import { CategoryFormValues } from "@/app/categories/category-form";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(process.cwd(), "lib", "data", "category.json");

export async function getCategories(): Promise<CategoryType[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCategoryItem(id: string) {
  try {
    const data = await getCategories();
    return data.find((i) => i.id === id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addCategoryItem(item: CategoryFormValues) {
  const data = await getCategories();
  data.push({ ...item, id: uuidv4() });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return data;
}

export async function updateCategoryItem(item: CategoryType) {
  let data = await getCategories();
  data = data.map((i) => (i.id === item.id ? item : i));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/categories");
}

export async function deleteCategoryItem(id: string) {
  let data = await getCategories();
  data = data.filter((i) => i.id !== id);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath("/categories");
  return data;
}

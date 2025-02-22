"use client";
import CustomDialog from "@/components/custom-dialog";
import React, { useEffect, useState } from "react";
import CategoryForm, { CategoryFormValues } from "./category-form";
import {
  addCategoryItem,
  getCategoryItem,
  updateCategoryItem,
} from "@/lib/actions/category-actions";
import { useDialogContext } from "@/lib/context/dialog-provider";

const handleAddCategory = async (values: CategoryFormValues) => {
  await addCategoryItem(values);
};
const getCategoryItemWithoutId = async (categoryId: string | null) => {
  if (!categoryId) return undefined;
  const categoryItem = await getCategoryItem(categoryId);
  if (!categoryItem) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...categoryItemWithoutId } = categoryItem;
  return categoryItemWithoutId;
};

export default function ClientDialogLayer() {
  const { state, dispatch } = useDialogContext();
  const [item, setItem] = useState<CategoryFormValues | undefined>();
  const IS_EDIT = !!state.id;

  const handleEditCategory = async (values: CategoryFormValues) => {
    await updateCategoryItem({ ...values, id: state.id as string });
    dispatch({ type: "CLOSE" });
  };
  useEffect(() => {
    (async () => {
      const categoryItem = await getCategoryItemWithoutId(state.id);
      setItem(categoryItem);
      if (categoryItem) dispatch({ type: "OPEN" });
    })();
  }, [state.id, dispatch]);

  return (
    <CustomDialog title={`${IS_EDIT ? "Edit" : "Add"} Category`}>
      <CategoryForm
        submitHandler={IS_EDIT ? handleEditCategory : handleAddCategory}
        values={item}
      />
    </CustomDialog>
  );
}

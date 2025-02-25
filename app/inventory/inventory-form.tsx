"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductType } from "../products/product-data-table-column";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CategoryType } from "../categories/category-data-table-columns";
import { useDialogContext } from "@/lib/context/dialog-provider";

const formSchema = z.object({
  productName: z
    .string({ required_error: "Product name is required." })
    .min(1, "Product name is required."),
  category: z
    .string({ required_error: "Category is required." })
    .min(1, "Category is required."),
  stockQuantity: z.coerce
    .number({
      required_error: "Stock quantity is required.",
      invalid_type_error: "Stock quantity must be an number.",
    })
    .int("Stock quantity must be an integer.")
    .min(0, "Stock quantity must be at least 1."),
  productDescription: z.string().min(2, "Description is too short."),
});

export type InventoryFormValues = z.infer<typeof formSchema>;

type InventoryFormPropsType = {
  values?: InventoryFormValues;
  submitHandler: (values: InventoryFormValues) => void;
  products: ProductType[];
  categories: CategoryType[];
};

export default function InventoryForm({
  values,
  submitHandler,
  products,
  categories,
}: InventoryFormPropsType) {
  const { dispatch } = useDialogContext();

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: values ?? {
      productName: "",
      category: "",
      stockQuantity: 0,
      productDescription: "",
    },
  });

  function onSubmit(values: InventoryFormValues) {
    try {
      submitHandler(values);
      toast(
        "Form submitted successfully. You can check the inventory page to see the changes."
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Product name..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products?.length > 0 ? (
                    products?.map((product) => (
                      <SelectItem key={product.id} value={product.productName}>
                        {product.productName}
                      </SelectItem>
                    ))
                  ) : (
                    <Link
                      href="/products?dialog=open"
                      className={buttonVariants({ variant: "link" })}
                    >
                      <Plus className="w-4 h-4" />
                      Please click here to add a product.
                    </Link>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Select your product name above list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Category..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.length > 0 ? (
                    categories?.map((category) => (
                      <SelectItem key={category.id} value={category.category}>
                        {category.category}
                      </SelectItem>
                    ))
                  ) : (
                    <Link
                      href="/categories"
                      className={buttonVariants({ variant: "link" })}
                      onClick={() => dispatch({ type: "OPEN" })}
                    >
                      <Plus className="w-4 h-4" />
                      Please click here to add a category.
                    </Link>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Select your category above list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stockQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>
              <FormControl>
                <Input placeholder="10" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your stock quantity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This product..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can enter your description for this product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

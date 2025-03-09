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
import { CategoryType } from "../categories/category-data-table-columns";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useDialogContext } from "@/lib/context/dialog-provider";

const formSchema = z.object({
  productName: z
    .string({ required_error: "Product name is required." })
    .min(1, "Product name is required."),
  category: z
    .string({ required_error: "Category is required." })
    .min(1, "Category is required."),
  availableQuantity: z.coerce
    .number({
      required_error: "Stock quantity is required.",
      invalid_type_error: "Stock quantity must be an number.",
    })
    .int("Stock quantity must be an integer.")
    .min(0, "Stock quantity must be at least 1."),
  costPrice: z.coerce
    .number({
      required_error: "Cost Price is required.",
      invalid_type_error: "Cost Price must be an number.",
    })
    .min(0, "Cost Price must be at least 0."),
  expenses: z.coerce
    .number({
      required_error: "Expenses is required.",
      invalid_type_error: "Expenses must be an number.",
    })
    .min(0, "Expenses must be at least 0."),
  profitMarginPercentage: z.coerce
    .number({
      required_error: "Profit margin percentage is required.",
      invalid_type_error: "Profit margin percentage must be an number.",
    })
    .min(1, "Profit margin percentage must be at least 1."),
  productDescription: z.string().min(2, "Description is too short."),
});

export type MyStoreFormValues = z.infer<typeof formSchema>;

type MyStoreFormPropsType = {
  values?: MyStoreFormValues;
  submitHandler: (values: MyStoreFormValues) => void;
  products: ProductType[];
  categories: CategoryType[];
};

const DEFAULT_FORM = {
  productName: "",
  category: "",
  availableQuantity: 0,
  costPrice: 0,
  expenses: 0,
  profitMarginPercentage: 0,
  productDescription: "",
};

export default function MyStoreForm({
  values,
  submitHandler,
  products,
  categories,
}: MyStoreFormPropsType) {
  const { dispatch } = useDialogContext();
  const form = useForm<MyStoreFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: values ?? DEFAULT_FORM,
  });

  function onSubmit(values: MyStoreFormValues) {
    try {
      submitHandler?.(values);
      toast(
        "Form submitted successfully. You can check the ready-for-sale products page to see the changes."
      );
      form.reset(DEFAULT_FORM);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto py-10 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Product name..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products?.length > 0 ? (
                    products.map(({ id, productName }) => (
                      <SelectItem key={id} value={productName}>
                        {productName}
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
              <Select onValueChange={field.onChange} value={field.value}>
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
          name="availableQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Quantity</FormLabel>
              <FormControl>
                <Input placeholder="10" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your available quantity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="costPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost Price</FormLabel>
              <FormControl>
                <Input placeholder="10" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your cost price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expenses</FormLabel>
              <FormControl>
                <Input placeholder="10" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your expenses.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profitMarginPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profit Margin Percentage</FormLabel>
              <FormControl>
                <Input placeholder="10" type="text" {...field} />
              </FormControl>
              <FormDescription>
                Enter your profit margin percentage.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
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
        <Button type="submit" className="justify-self-start">
          Submit
        </Button>
      </form>
    </Form>
  );
}

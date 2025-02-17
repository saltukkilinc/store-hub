"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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

export type ReadyForSaleProductsFormValues = z.infer<typeof formSchema>;

type ReadyForSaleProductsFormPropsType = {
  values?: ReadyForSaleProductsFormValues;
  submitHandler?: (values: ReadyForSaleProductsFormValues) => void;
};

export default function ReadyForSaleProductsForm({
  values,
  submitHandler,
}: ReadyForSaleProductsFormPropsType) {
  const form = useForm<ReadyForSaleProductsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: values ?? {
      productName: "",
      category: "",
      availableQuantity: 0,
      costPrice: 0,
      expenses: 0,
      profitMarginPercentage: 0,
      productDescription: "",
    },
  });

  function onSubmit(values: ReadyForSaleProductsFormValues) {
    try {
      submitHandler?.(values);
      toast(
        "Form submitted successfully. You can check the ready-for-sale products page to see the changes."
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
        className="max-w-3xl mx-auto py-10 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-2"
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
                  <SelectItem value="headphones">Headphones</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="keyboard">Keyboard</SelectItem>
                  <SelectItem value="mouse">Mouse</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
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
                  <SelectItem value="computers">Computers</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="homeAppliances">
                    Home Appliances
                  </SelectItem>
                  <SelectItem value="gadgets">Gadgets</SelectItem>
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

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
  productName: z.string({ required_error: "Product name is required." }),
  category: z.string({ required_error: "Category is required." }),
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
};

export default function InventoryForm({
  values,
  submitHandler,
}: InventoryFormPropsType) {
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
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
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

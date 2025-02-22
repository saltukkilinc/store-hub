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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  category: z
    .string({ required_error: "Category is required." })
    .min(1, "Category is required."),
  description: z.string().min(2, "Description is too short."),
});

export type CategoryFormValues = z.infer<typeof formSchema>;

type InventoryFormPropsType = {
  values?: CategoryFormValues;
  submitHandler: (values: CategoryFormValues) => void;
};

export default function CategoryForm({
  values,
  submitHandler,
}: InventoryFormPropsType) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: values ?? {
      category: "",
      description: "",
    },
  });
  function onSubmit(values: CategoryFormValues) {
    try {
      submitHandler(values);
      toast(
        "Form submitted successfully. You can check the categories page to see the changes."
      );
     form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 w-full"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category name..." type="text" {...field} />
              </FormControl>
              <FormDescription>Enter your category name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This category..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can enter your description for this category.
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

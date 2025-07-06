"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/CategoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Minimum amount should be 1" }),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }),
  category: z.enum(categories),
});
const Budget = () => {
      const router=useRouter()
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      month: new Date().toISOString().split("T")[0],
      category: "Food",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/budgets", values);
      const data = await response.data;
      if (data.success) {
        toast("Budget has been created");
        form.reset();
        router.push("/")
      } else {
        toast(data.message || "Failed to create Budget");
      }
    } catch (error) {
      console.error("Failed to create Budget", error);
      toast("Failed to create Budget");
    }
  }
  return (
    <section className="flex-1 flex items-center max-w-7xl justify-center w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full flex flex-col  sm:w-2/3 bg-white py-6 px-8 rounded-md "
        >
          <h1 className="text-3xl text-black text-center font-semibold">
            Add Budget
          </h1>
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="month"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-indigo-700 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-indigo-800 disabled:opacity-50"
          >
            {form.formState.isSubmitting ? "Adding..." : "Add Budget"}
          </button>
        </form>
      </Form>
    </section>
  );
};

export default Budget;

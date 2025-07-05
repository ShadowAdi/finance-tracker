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
import { categories } from "@/data/CategoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  amount: z.number().min(1, {
    message: "Minumum Elemenet Should Be 1",
  }),
  date: z.date(),
  description: z.string(),
  category: z.enum(categories),
});
const Add = () => {
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      date: new Date(),
      category: "Food",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Values ", values);
  }
  return (
    <section className="flex-1 flex items-center max-w-7xl justify-center w-full ">
       <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full sm:w-2/3 ">
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrption</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="A Little description" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
               <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrption</FormLabel>
                  <FormControl>
                    <Input type="Select" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </form>
        </Form>
    </section>
  );
};

export default Add;

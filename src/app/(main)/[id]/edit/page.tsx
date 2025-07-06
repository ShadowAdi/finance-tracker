"use client";

import { useEffect, useState } from "react";
import { useParams,useRouter } from "next/navigation";
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

const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Minimum element should be 1" }),
  date: z.string(),
  description: z.string(),
  category: z.enum(categories),
});

type Transaction = z.infer<typeof formSchema>;

const EditTransaction = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const router=useRouter()

  const form = useForm<Transaction>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      date: new Date().toISOString().split("T")[0],
      category: "Food",
      description: "",
    },
  });

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/transactions/${id}`);
      const { success, singleTransaction, message } = response.data;

      if (success && singleTransaction) {
        setTransaction(singleTransaction);
        form.reset({
          amount: singleTransaction.amount,
          date: singleTransaction.date,
          description: singleTransaction.description,
          category: singleTransaction.category,
        });
      } else {
        toast(message || "Failed to fetch transaction");
      }
    } catch (error) {
      console.error("Failed to fetch transaction:", error);
      toast("Failed to fetch transaction");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchTransaction();
    }
  }, [id, form]);

  async function onSubmit(values: Transaction) {
    try {
      const response = await axios.put(`/api/transactions/${id}`, values);
      const { success, message } = response.data;

      if (success) {
        toast("Transaction has been updated successfully");
        fetchTransaction();
        router.push("/")
      } else {
        toast(message || "Failed to update transaction");
      }
    } catch (error) {
      console.error("Failed to update transaction:", error);
      toast("Failed to update transaction");
    }
  }

  if (loading) {
    return (
      <section className="flex-1 flex items-center max-w-7xl justify-center w-full">
        <div className="w-full sm:w-2/3 bg-white py-6 px-8 rounded-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading transaction...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!transaction) {
    return (
      <section className="flex-1 flex items-center max-w-7xl justify-center w-full">
        <div className="w-full sm:w-2/3 bg-white py-6 px-8 rounded-md text-center">
          <h1 className="text-3xl text-red-600 font-semibold">
            Transaction Not Found
          </h1>
          <p className="mt-4 text-gray-600">
            The transaction you're looking for doesn't exist or has been
            deleted.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex items-center max-w-7xl justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full sm:w-2/3 my-6 bg-white py-6 px-8 rounded-md"
        >
          <h1 className="text-3xl text-black text-center font-semibold">
            Edit Transaction
          </h1>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Current Transaction Details:
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Amount:</span> $
                {transaction.amount}
              </div>
              <div>
                <span className="font-medium">Date:</span>
                {new Date(transaction.date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Category:</span>{" "}
                {transaction.category}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Description:</span>{" "}
                {transaction.description}
              </div>
            </div>
          </div>

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
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="A Little description"
                    {...field}
                  />
                </FormControl>
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
            className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800 disabled:opacity-50 w-full cursor-pointer"
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      </Form>
    </section>
  );
};

export default EditTransaction;

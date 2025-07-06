"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Budget } from "@/lib/types";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const getBudgets = async () => {
    try {
      const res = await axios.get("/api/budgets");
      setBudgets(res.data.budgets);
    } catch (error) {
      toast("Failed to load budgets");
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  return (
    <div className="space-y-4 max-w-6xl mx-auto flex items-center justify-start my-8 flex-col ">
      <h1 className="text-4xl font-semibold">Budgets</h1>

      <div className="space-y-2 grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 ">
        {budgets.length === 0 ? (
          <p className="text-gray-500">No budgets set yet.</p>
        ) : (
          budgets.map((b) => (
            <Card
              key={b._id}
              className="flex justify-between border  px-5 py-6  rounded-md"
            >
              <CardTitle className="text-2xl">{b.category}</CardTitle>
              <CardDescription className="text-lg">₹{b.amount}</CardDescription>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

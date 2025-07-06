"use client";
import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import RecentTransactions from "./RecentTransactions";
import { MonthlyExpensesChart } from "./MonthlyExpensesChart";
import { CategoryPieChart } from "./CategoryPieChart";
import { Transaction } from "@/lib/types";
import axios from "axios";
import { toast } from "sonner";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const GetAllTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions`);
      const { message, success, transactions } = await response.data;
      if (success) {
        setTransactions(transactions);
      } else {
        console.log("Message ", message);
        toast(message);
      }
    } catch (error: any) {
      console.log("Error in getting transactions: ", error);
      toast(error);
    }
  };
  useEffect(() => {
    GetAllTransactions();
  }, []);

  return (
    <div className="w-full space-y-8">
      <SummaryCards transactions={transactions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MonthlyExpensesChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>
      <RecentTransactions transactions={transactions} GetAllTransactions={GetAllTransactions} />
    </div>
  );
};

export default Dashboard;

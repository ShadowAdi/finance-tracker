import React from "react";
import SummaryCards from "./SummaryCards";
import RecentTransactions from "./RecentTransactions";

const transactions = [
  {
    amount: 500,
    date: new Date("2025-07-01"),
    description: "Grocery shopping",
    category: "Food",
  },
  {
    amount: 200,
    date: new Date("2025-07-02"),
    description: "Bus fare",
    category: "Transport",
  },
  {
    amount: 1000,
    date: new Date("2025-07-03"),
    description: "Movie tickets",
    category: "Entertainment",
  },
  {
    amount: 300,
    date: new Date("2025-07-04"),
    description: "Electricity bill",
    category: "Utilities",
  },
  {
    amount: 150,
    date: new Date("2025-07-05"),
    description: "Coffee",
    category: "Food",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full space-y-8">
      <SummaryCards transactions={transactions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <MonthlyExpensesChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} /> */}
      </div>
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;

"use client"
import { ChartProps } from "@/lib/types";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Line,
} from "recharts";

export const MonthlyExpensesChart: React.FC<ChartProps> = ({transactions}) => {
  const monthlyDataObj = transactions.reduce((acc, transaction) => {
    const dateObj = new Date(transaction.date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    const key = `${year}-${dateObj.getMonth()}`; // e.g., "2025-6"

    if (!acc[key]) {
      acc[key] = {
        month: `${month} ${year}`,
        amount: 0,
        year,
        monthNumber: dateObj.getMonth(),
      };
    }
    acc[key].amount += transaction.amount;
    return acc;
  }, {} as Record<string, { month: string; amount: number; year: number; monthNumber: number }>);

  const chartData = Object.values(monthlyDataObj).sort(
    (a, b) => a.year - b.year || a.monthNumber - b.monthNumber
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Monthly Expenses
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

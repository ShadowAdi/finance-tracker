"use client"
import { CategoryData, ChartProps } from "@/lib/types";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { renderCustomizedLabel } from "../utils/rendeCustomizedLabel";

export const CategoryPieChart: React.FC<ChartProps> = ({ transactions }) => {
  const categoryData: Record<string, CategoryData> = transactions.reduce(
    (acc, transaction) => {
      const category = transaction.category;

      if (!acc[category]) {
        acc[category] = { name: category, value: 0 };
      }
      acc[category].value += transaction.amount;
      return acc;
    },
    {} as Record<string, CategoryData>
  );

  const chartData: CategoryData[] = Object.values(categoryData);

  const COLORS: string[] = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Expenses by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`₹${value}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

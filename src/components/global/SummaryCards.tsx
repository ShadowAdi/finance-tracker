import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  amount: number;
  date: Date;
  description: string;
  category: string;
}

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const transactionCount = transactions.length;
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  const topCategory = Object.entries(categoryTotals).reduce((a, b) => (a[1] > b[1] ? a : b), ["None", 0])[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹{totalExpenses}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{topCategory} — ₹{categoryTotals[topCategory]}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{transactionCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}

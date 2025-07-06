import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import { Transaction } from "@/lib/types";
import { useRouter } from "next/navigation";

interface RecentTransactionsProps {
  transactions: Transaction[];
  GetAllTransactions:()=>void;
}

export default function RecentTransactions({
  transactions,
   GetAllTransactions
}: RecentTransactionsProps) {
  const router = useRouter();
  const DeleteTransaction = async (id: string) => {
    try {
      const response = await axios.delete(`/api/transactions/${id}`);
      const { success, message } = await response.data;
      if (success) {
        console.log("Message in deleting transaction ", message);
        toast(message);
      }
    } catch (error: any) {
      console.error(`Error in getting delete transaction `, error);
      toast.error(error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                <TableCell>₹{t.amount}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push(`/${t._id}/edit`);
                    }}
                    className="mr-2 bg-indigo-600 cursor-pointer text-white hover:bg-indigo-700 hover:text-white"
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your transaction and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            DeleteTransaction(t._id);
                            GetAllTransactions()
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(
      {
        success: true,
        message: "Transaction Fetching Successfully",
        transactions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to Get Transactions.", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Transactions." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { amount, date, category, description } = await req.json();
    if (amount < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Amount must be greater than 0.",
        },
        { status: 401 }
      );
    }
    await connectDB();
    const transaction = await Transaction.create({
      amount,
      date,
      category,
      description,
    });
    return NextResponse.json(
      { success: true, message: "Transaction Created", transaction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to Create Transactions", error);
    return NextResponse.json(
      { success: false, message: "Failed to Create Transactions" },
      { status: 500 }
    );
  }
}

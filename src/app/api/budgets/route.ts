import { connectDB } from "@/lib/db";
import Budget from "@/lib/models/Budget";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const budgets = await Budget.find().sort({ date: -1 });
    return NextResponse.json(
      {
        success: true,
        message: "Budget Fetching Successfully",
        budgets,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to Get Budget.", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Budget." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { amount, month, category } = await req.json();
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
    const transaction = await Budget.create({
      amount,
      month,
      category,
    });
    return NextResponse.json(
      { success: true, message: "Budget Created", transaction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to Create Budget", error);
    return NextResponse.json(
      { success: false, message: "Failed to Create Budget" },
      { status: 500 }
    );
  }
}

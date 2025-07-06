import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/Transaction";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  connectDB();
  try {
    const data = await req.json();
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction id not provided",
        },
        {
          status: 401,
        }
      );
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json({
      success: true,
      message: "Transaction has been updated",
      updatedTransaction,
    });
  } catch (error) {
    console.error("Faied to update Transaction.", error);
    return NextResponse.json(
      { success: false, message: "Faied to update Transaction." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  connectDB();
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction id not provided",
        },
        {
          status: 401,
        }
      );
    }
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Transaction has been deleted",
    });
  } catch (error) {
    console.error("Faied to delete Transaction.", error);
    return NextResponse.json(
      { success: false, message: "Faied to delete Transaction." },
      { status: 500 }
    );
  }
}

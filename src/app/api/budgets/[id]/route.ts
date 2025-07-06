import { connectDB } from "@/lib/db";
import Budget from "@/lib/models/Budget";
import { NextResponse } from "next/server";

export async function GET(
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
          message: "Budget id not provided",
        },
        {
          status: 401,
        }
      );
    }
    const singleBudget = await Budget.findById(id);
    return NextResponse.json({
      success: true,
      message: "Budget has been found",
      singleBudget,
    });
  } catch (error) {
    console.error("Faied to found Budget.", error);
    return NextResponse.json(
      { success: false, message: "Faied to found Budget." },
      { status: 500 }
    );
  }
}

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
          message: "Budget id not provided",
        },
        {
          status: 401,
        }
      );
    }
    if (data.date) {
      data.date = new Date(data.date);
    }

    const updatedBudget = await Budget.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json({
      success: true,
      message: "Budget has been updated",
      updatedBudget,
    });
  } catch (error) {
    console.error("Faied to update Budget.", error);
    return NextResponse.json(
      { success: false, message: "Faied to update Budget." },
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
          message: "Budget id not provided",
        },
        {
          status: 401,
        }
      );
    }
    await Budget.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Budget has been deleted",
    });
  } catch (error) {
    console.error("Faied to delete Budget.", error);
    return NextResponse.json(
      { success: false, message: "Faied to delete Budget." },
      { status: 500 }
    );
  }
}

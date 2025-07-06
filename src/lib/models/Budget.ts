import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      default: "Food",
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Utilities",
        "Health",
        "Entertainment",
        "Other",
      ],
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Budget ||
  mongoose.model("Budget", budgetSchema);

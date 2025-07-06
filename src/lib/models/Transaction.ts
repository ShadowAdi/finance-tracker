import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
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
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

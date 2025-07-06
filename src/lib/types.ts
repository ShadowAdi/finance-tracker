export interface Transaction {
  amount: number;
  description: string;
  category:
    | "Food"
    | "Transport"
    | "Shopping"
    | "Utilities"
    | "Health"
    | "Entertainment"
    | "Other";
  date: Date;
  _id: string;
}

export interface Budget {
  amount: number;
  month: string;
  category:
    | "Food"
    | "Transport"
    | "Shopping"
    | "Utilities"
    | "Health"
    | "Entertainment"
    | "Other";
  _id: string;
}

export interface MonthlyData {
  month: string;
  amount: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface ChartProps {
  transactions: Transaction[];
}

export type CustomLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
};

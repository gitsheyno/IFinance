import { Category } from "./Category";
import { Transaction } from "./Transaction";

export type SpendingChartProps = {
  transactions: Transaction[];
  categories: Category[];
};

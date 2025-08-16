import { Category } from "./Category";
import { Transaction } from "./Transaction";

export type TransactionListProps = {
  transactions: Transaction[];
  categories: Category[];
  currency: string;
};

import { Budget } from "./Budget";
import { Category } from "./Category";
import { Transaction } from "./Transaction";

export type BudgetOverviewProps = {
  budgets: Budget[];
  transactions: Transaction[];
  categories: Category[];
  currency: string;
};

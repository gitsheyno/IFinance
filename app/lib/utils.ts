import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Budget, Transaction, Category } from "../types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  value: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
};

export function getBudgetProgress(
  budget: Budget,
  transactions: Transaction[],
  categories: Category[]
): {
  spent: number;
  remaining: number;
  percentage: number;
  status: "on-track" | "warning" | "over-budget";
} {
  const spent = Math.abs(
    transactions
      .filter((t) => t.categoryId === budget.categoryId && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const remaining = budget.limitAmount - spent;
  const percentage = (spent / budget.limitAmount) * 100;

  let status: "on-track" | "warning" | "over-budget" = "on-track";
  if (percentage >= 100) status = "over-budget";
  else if (percentage >= 80) status = "warning";

  return { spent, remaining, percentage, status };
}

export function getSpendingByCategory(
  transactions: Transaction[],
  categories: Category[]
): { categoryId: string; name: string; amount: number; icon?: string }[] {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const categorySpending = categories
    .filter((c) => c.type === "expense")
    .map((category) => {
      const amount = Math.abs(
        expenseTransactions
          .filter((t) => t.categoryId === category.categoryId)
          .reduce((sum, t) => sum + t.amount, 0)
      );

      return {
        categoryId: category.categoryId,
        name: category.name,
        amount,
        icon: category.icon,
      };
    })
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return categorySpending;
}

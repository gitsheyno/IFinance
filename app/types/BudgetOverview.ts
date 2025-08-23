export type BudgetOverviewProps = {
  budgetData: {
    spent: number;
    remaining: number;
    percentage: number;
    status: "over-budget" | "warning" | "on-track";
    categoryName: string;
    categoryIcon: string;
    budgetId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    limitAmount: number;
  }[];
  onEdit: () => void;
  onDelete: () => void;
  currency: string;
};

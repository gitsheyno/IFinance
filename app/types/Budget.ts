export type Budget = {
  budgetId: string;
  userId: string;
  householdId?: string | null;
  categoryId: string;
  limitAmount: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

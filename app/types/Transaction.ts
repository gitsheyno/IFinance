export type Transaction = {
  transactionId: string;
  userId: string;
  householdId?: string | null;
  title: string;
  amount: number;
  type: "income" | "expense";
  categoryId: string;
  date: Date;
  isRecurring: boolean;
  recurrenceRule?: string | null;
  note?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

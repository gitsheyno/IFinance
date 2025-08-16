export type Category = {
  categoryId: string;
  name: string;
  type: "income" | "expense";
  icon?: string;
  userCreated: boolean;
  createdAt: Date;
  updatedAt: Date;
};

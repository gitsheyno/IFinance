import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BudgetOverviews } from "../BudgetOverviews";
import { mockBudgets } from "@/app/lib/mocks/budget";
import { mockTransactions } from "@/app/lib/mocks/transactions";
import { mockCategories } from "@/app/lib/mocks/categories";
import { SpendingChart } from "../charts/Spending-chart";

export default function Budgets() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Track your spending limits and stay on budget
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetOverviews
          budgets={mockBudgets}
          transactions={mockTransactions}
          categories={mockCategories}
          currency="USD"
        />
        <SpendingChart
          transactions={mockTransactions}
          categories={mockCategories}
        />
      </div>
    </div>
  );
}

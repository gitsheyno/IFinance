import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type BudgetOverviewProps } from "@/app/types";
import { Progress } from "@/components/ui/progress";
import { getBudgetProgress } from "@/app/lib/utils";

export const BudgetOverviews = ({
  budgets,
  transactions,
  categories,
  currency,
}: BudgetOverviewProps) => {
  const budgetData = budgets.map((budget) => {
    const category = categories.find((c) => c.categoryId === budget.categoryId);
    const progress = getBudgetProgress(budget, transactions, categories);

    return {
      ...budget,
      categoryName: category?.name || "Unknown",
      categoryIcon: category?.icon || "📊",
      ...progress,
    };
  });

  const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "over-budget":
        return <AlertTriangle className="h-4 w-4" />;
      case "warning":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "over-budget":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "default";
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>
          Track your spending against your budget limits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgetData.map((budget) => (
          <div key={budget.budgetId} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{budget.categoryIcon}</span>
                <div>
                  <h4 className="font-medium">{budget.categoryName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent, currency)} of{" "}
                    {formatCurrency(budget.limitAmount, currency)}
                  </p>
                </div>
              </div>
              <Badge
                variant={getStatusColor(budget.status)}
                className="flex items-center gap-1"
              >
                {getStatusIcon(budget.status)}
                <span className="capitalize">
                  {budget.status.replace("-", " ")}
                </span>
              </Badge>
            </div>

            <div className="space-y-2">
              <Progress
                value={Math.min(budget.percentage, 100)}
                className="h-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{budget.percentage.toFixed(1)}% used</span>
                <span>
                  {budget.remaining >= 0
                    ? `${formatCurrency(budget.remaining, currency)} remaining`
                    : `${formatCurrency(
                        Math.abs(budget.remaining),
                        currency
                      )} over budget`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

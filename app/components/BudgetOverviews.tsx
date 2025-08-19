"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type BudgetOverviewProps } from "@/app/types";
import { Progress } from "@/components/ui/progress";
import { getBudgetProgress } from "@/app/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
export const BudgetOverviews = ({
  budgets,
  transactions,
  categories,
  currency,
  onEdit,
  onDelete,
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
          <div
            key={budget.budgetId}
            className="space-y-3 flex items-center justify-between gap-4"
          >
            <div className="flex items-center justify-between flex-1 ">
              <div className="flex items-center gap-2 ">
                <span className="text-lg">{budget.categoryIcon}</span>
                <div>
                  <h4 className="font-medium text-sm lg:text-lg">
                    {budget.categoryName}
                  </h4>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {formatCurrency(budget.spent, currency)} of{" "}
                    {formatCurrency(budget.limitAmount, currency)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2  flex-3">
              <Badge
                variant={getStatusColor(budget.status)}
                className="flex items-center gap-1"
              >
                {getStatusIcon(budget.status)}
                <span className="capitalize">
                  {budget.status.replace("-", " ")}
                </span>
              </Badge>
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

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

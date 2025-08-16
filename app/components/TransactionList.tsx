"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Transaction, Category } from "@/app/types";
import { Filter, ArrowUpDown } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  currency: string;
}

export function TransactionList({
  transactions,
  categories,
  currency,
}: TransactionListProps) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      if (filter === "all") return true;
      return transaction.type === filter;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = Math.abs(a.amount) - Math.abs(b.amount);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find((c) => c.categoryId === categoryId);
    return {
      name: category?.name || "Unknown",
      icon: category?.icon || "📄",
    };
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filter}
              onValueChange={(value: "all" | "income" | "expense") =>
                setFilter(value)
              }
            >
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "desc" ? "Latest" : "Oldest"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredAndSortedTransactions.map((transaction) => {
            const categoryInfo = getCategoryInfo(transaction.categoryId);

            return (
              <div
                key={transaction.transactionId}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                    <span className="text-lg">{categoryInfo.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{categoryInfo.name}</span>
                      <span>•</span>
                      <span>{formatDate(transaction.date)}</span>
                      {transaction.isRecurring && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            Recurring
                          </Badge>
                        </>
                      )}
                    </div>
                    {transaction.note && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {transaction.note}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : ""}
                    {formatCurrency(transaction.amount, currency)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

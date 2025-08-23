"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BudgetOverviews } from "../BudgetOverviews";
import { mockBudgets } from "@/app/lib/mocks/budget";
import { mockTransactions } from "@/app/lib/mocks/transactions";
import { mockCategories } from "@/app/lib/mocks/categories";
import { SpendingChart } from "../charts/Spending-chart";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BurdgetForm from "../BurdgetForm";
import { getBudgetProgress } from "@/app/lib/utils";
export default function Budgets() {
  const [createBudgetOpen, setCreateBudgetOpen] = useState(false);
  const [editBudgetOpen, setEditBudgetOpen] = useState(false);
  const [deleteBudgetOpen, setDeleteBudgetOpen] = useState(false);

  const handleEdit = () => {
    console.log("clicked edit");
    setEditBudgetOpen(true);
  };

  const handleDelete = () => {
    console.log("clicked edit");
    setDeleteBudgetOpen(true);
  };

  console.log("budget", mockBudgets, mockTransactions);

  const budgetData = mockBudgets.map((budget) => {
    const category = mockCategories.find(
      (c) => c.categoryId === budget.categoryId
    );
    const progress = getBudgetProgress(
      budget,
      mockTransactions,
      mockCategories
    );

    return {
      ...budget,
      categoryName: category?.name || "Unknown",
      categoryIcon: category?.icon || "📊",
      ...progress,
    };
  });

  const budgetLimit = mockBudgets.reduce((sum, budget) => {
    return sum + budget.limitAmount;
  }, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Track your spending limits and stay on budget
          </p>
        </div>
        {/* Create Budget Button */}
        <Dialog open={createBudgetOpen} onOpenChange={setCreateBudgetOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>
                Set spending limits for a specific category
              </DialogDescription>
            </DialogHeader>
            {/* Form */}
            <BurdgetForm
              categories={mockCategories}
              budgetLimit={budgetLimit}
            />
            <DialogFooter>
              <Button type="submit">Create Budget</Button>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  onClick={() => setCreateBudgetOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Edit Budget Button */}
        <Dialog open={editBudgetOpen} onOpenChange={setEditBudgetOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Budget</DialogTitle>
              <DialogDescription>Update your budget settings</DialogDescription>
            </DialogHeader>
            {/* Form */}
            <BurdgetForm categories={mockCategories} />
            <DialogFooter>
              <Button type="submit">Update Budget</Button>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  onClick={() => setEditBudgetOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Delete Budget Button */}
        <AlertDialog open={deleteBudgetOpen} onOpenChange={setDeleteBudgetOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Budget</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this budget? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  console.log("Budget deleted");
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <SpendingChart
          transactions={mockTransactions}
          categories={mockCategories}
        />
        <BudgetOverviews
          budgetData={budgetData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currency="USD"
        />
      </div>
    </div>
  );
}

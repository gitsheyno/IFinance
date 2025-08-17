import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BudgetOverviews } from "../BudgetOverviews";
import { mockBudgets } from "@/app/lib/mocks/budget";
import { mockTransactions } from "@/app/lib/mocks/transactions";
import { mockCategories } from "@/app/lib/mocks/categories";
import { SpendingChart } from "../charts/Spending-chart";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
        <Dialog>
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
            <div className="space-y-4 flex flex-col gap-4  pb-8">
              <div className="flex flex-col gap-8">
                <div className="space-y-2 w-full">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {mockCategories.map((category) => (
                          <SelectItem
                            key={category.categoryId}
                            value={category.name}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="budget-limit">Budget Limit</Label>
                  <Input
                    id="budget-limit"
                    type="number"
                    placeholder="Enter Amount"
                  />
                  {
                    //Todo add Budget Limit Validation
                  }
                </div>
              </div>
              {
                //Todo Add Datepicker
              }
            </div>
            <DialogFooter>
              <Button type="submit">Create Budget</Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

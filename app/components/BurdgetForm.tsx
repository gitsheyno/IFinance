import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Budget, Category } from "../types";

type BudgetForm = {
  categories: Category[];
  budget?: Budget;
};
export default function BurdgetForm({ categories }: BudgetForm) {
  return (
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
                {categories.map((category) => (
                  <SelectItem key={category.categoryId} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="budget-limit">Budget Limit</Label>
          <Input id="budget-limit" type="number" placeholder="Enter Amount" />
          {
            //Todo add Budget Limit Validation
          }
        </div>
      </div>
      {
        //Todo Add Datepicker
      }
    </div>
  );
}

import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import { StatCard } from "./ui/Card-stat";
import { statCards } from "@/app/lib/mocks/statCards";
import { TransactionList } from "./TransactionList";
import { mockTransactions } from "../lib/mocks/transactions";
import { mockCategories } from "../lib/mocks/categories";
export default function Transactions() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage all your income and expenses
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Fill in the details of your new transaction.
              </DialogDescription>
            </DialogHeader>
            {/* Form */}
            <div className="space-y-4 flex flex-col gap-4  pb-8">
              <div className="flex gap-8">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="transaction-title">Title</Label>
                  <Input
                    id="transaction-title"
                    type="text"
                    placeholder="Enter Transaction Title"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amounte"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>
              </div>
              <div className="flex gap-8">
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
                <div className="space-y-2 w-full">
                  <Label htmlFor="transaction-type">Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Expense" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="message">Note (Optional)</Label>
                <Textarea
                  placeholder="Add a note about this transaction"
                  id="message"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Transaction</Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
          />
        ))}
      </div>
      <TransactionList
        transactions={mockTransactions}
        categories={mockCategories}
        currency="USD"
      />
    </div>
  );
}

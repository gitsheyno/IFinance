import { Button } from "@/components/ui/button";
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
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
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

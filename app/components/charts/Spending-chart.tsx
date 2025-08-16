"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getSpendingByCategory } from "@/app/lib/utils";
import { SpendingChartProps } from "@/app/types";

const COLORS = [
  "#3B82F6", // blue
  "#EF4444", // red
  "#10B981", // green
  "#F59E0B", // amber
  "#8B5CF6", // violet
  "#F97316", // orange
  "#06B6D4", // cyan
  "#84CC16", // lime
];

export function SpendingChart({
  transactions,
  categories,
}: SpendingChartProps) {
  const spendingData = getSpendingByCategory(transactions, categories);

  // Filter out categories with zero spending and ensure we have data
  const chartData = spendingData.filter((item) => item.amount > 0);

  const formatTooltip = (value: number, name: string) => [
    `$${value.toFixed(2)}`,
    name,
  ];

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>
            Your expense breakdown for this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No spending data available</p>
              <p className="text-sm">
                Add some expense transactions to see the chart
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Your expense breakdown for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="amount"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={formatTooltip}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

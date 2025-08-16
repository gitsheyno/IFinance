import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { type StatCardProps } from "@/app/types";

const STAT_CONFIG: Record<
  StatCardProps["title"],
  { style: string; icon: React.ReactNode }
> = {
  "Total Income": {
    style: "border-l-4 border-l-green-500",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  "Total Expenses": {
    style: "border-l-4 border-l-red-500",
    icon: <TrendingDown className="h-4 w-4" />,
  },
  "Net Income": {
    style: "border-l-4 border-l-blue-500",
    icon: <DollarSign className="h-4 w-4" />,
  },
  Savings: {
    style: "border-l-4 border-l-yellow-500",
    icon: <PiggyBank className="h-4 w-4" />,
  },
};

export function StatCard({ title, value, change }: StatCardProps) {
  const { style, icon } = STAT_CONFIG[title];
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-lg", style)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={cn(
              "text-xs mt-1 flex items-center",
              change.trend === "up" ? "text-green-600" : "text-red-600"
            )}
          >
            <span className="mr-1">{change.trend === "up" ? "↗" : "↘"}</span>
            {change.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}

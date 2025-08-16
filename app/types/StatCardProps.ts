export type StatCardProps = {
  title: "Total Income" | "Total Expenses" | "Net Income" | "Savings";
  value: string;

  change?: {
    value: string;
    trend: "up" | "down";
  };
};

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  Home,
  CreditCard,
  Target,
  PieChart,
  ShoppingCart,
  Settings,
  Menu,
  X,
  Wallet,
  TrendingUp,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: Wallet,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: PieChart,
  },
  {
    name: "Shopping List",
    href: "/shopping",
    icon: ShoppingCart,
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavItem = ({ item, onClick }: { item: any; onClick?: () => void }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent ",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-accent-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.name}
        {item.badge && (
          <Badge variant="secondary" className="ml-auto">
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">BudgetFlow</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-1">
              {secondaryNavigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xs font-medium text-primary">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

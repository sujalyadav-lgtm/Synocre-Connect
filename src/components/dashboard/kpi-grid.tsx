"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Package, AlertTriangle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIGridProps {
  revenue: number;
  expenses: number;
  profit: number;
  lowStockCount: number;
}

export function KPIGrid({ revenue, expenses, profit, lowStockCount }: KPIGridProps) {
  const kpis = [
    {
      label: "Total Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: DollarSign,
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500",
      trendText: "+100% vs last month"
    },
    {
      label: "Total Expenses",
      value: `$${expenses.toFixed(2)}`,
      icon: ArrowDown,
      trendIcon: TrendingUp,
      trendColor: "text-destructive",
      trendText: "All-time expenses"
    },
    {
      label: "Net Profit",
      value: `$${profit.toFixed(2)}`,
      icon: DollarSign,
      trendIcon: profit >= 0 ? TrendingUp : TrendingDown,
      trendColor: profit >= 0 ? "text-emerald-500" : "text-destructive",
      trendText: "Based on fulfilled orders"
    },
    {
      label: "Low Stock Items",
      value: lowStockCount.toString(),
      icon: Package,
      trendIcon: AlertTriangle,
      trendColor: lowStockCount > 0 ? "text-amber-500" : "text-muted-foreground",
      trendText: lowStockCount > 0 ? "Action needed" : "All good"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trendIcon;

        return (
          <Card key={kpi.label} className="overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                </div>
                <div className="p-2 rounded-xl bg-foreground/5 text-foreground">
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <TrendIcon className={cn("size-4", kpi.trendColor)} />
                <span className={cn("text-xs font-semibold ml-1 text-muted-foreground")}>
                  {kpi.trendText}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

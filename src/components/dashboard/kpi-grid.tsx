
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { mockKPIs } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  'Total Revenue': DollarSign,
  'Active Orders': ShoppingBag,
  'Inventory Value': Package,
  'Pending Shipments': Truck,
};

export function KPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mockKPIs.map((kpi) => {
        const Icon = icons[kpi.label as keyof typeof icons] || DollarSign;
        const isUp = kpi.status === 'up';

        return (
          <Card key={kpi.label} className="overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                </div>
                <div className="p-2 rounded-xl bg-primary/5 text-primary">
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                {isUp ? (
                  <TrendingUp className="size-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="size-4 text-destructive" />
                )}
                <span className={cn(
                  "text-xs font-semibold",
                  isUp ? "text-emerald-500" : "text-destructive"
                )}>
                  {kpi.trend}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

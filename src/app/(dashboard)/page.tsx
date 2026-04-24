"use client";

import { useState, useEffect } from "react";
import { KPIGrid } from "@/components/dashboard/kpi-grid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowUpRight, Plus, Sparkles, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { getOrders, getProducts } from "@/lib/firebase/db";
import { Order, Product } from "@/lib/types/schema";
import { format } from "date-fns";

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [allOrders, allProducts] = await Promise.all([getOrders(), getProducts()]);
      setOrders(allOrders);
      setProducts(allProducts);
      setLoading(false);
    }
    fetchData();
  }, []);

  const salesOrders = orders.filter(o => o.type === "sales_order" && o.status === "confirmed");
  const purchaseOrders = orders.filter(o => o.type === "purchase_order" && o.status === "fulfilled");
  const totalRevenue = salesOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalExpenses = purchaseOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const profit = totalRevenue - totalExpenses;

  const lowStockProducts = products.filter(p => p.currentStock <= p.lowStockThreshold);

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin size-8" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time KPIs and critical alerts from Synocre ERP.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">Export Data</Button>
          <Link href="/sales/new">
            <Button className="bg-foreground hover:bg-foreground/90 text-background">
              <Plus className="size-4 mr-2" /> New Order
            </Button>
          </Link>
        </div>
      </div>

      <KPIGrid 
        revenue={totalRevenue} 
        expenses={totalExpenses} 
        profit={profit} 
        lowStockCount={lowStockProducts.length} 
      />

      <Card className="border-none shadow-sm bg-foreground text-background overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="size-32 text-background" />
        </div>
        <CardContent className="p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-background/20 hover:bg-background/30 text-background border-none font-bold uppercase tracking-wider text-[10px] px-3">
                AI Status Report
              </Badge>
              <div className="flex items-center gap-1.5 text-background/80 text-xs font-medium">
                <Clock className="size-3" /> Updated just now
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Business Health: {profit >= 0 ? "Positive" : "Warning"}
            </h2>
            <p className="text-background/80 leading-relaxed mb-6">
              Total realized revenue sits at ${totalRevenue.toFixed(2)}, with expenses at ${totalExpenses.toFixed(2)}.
              Current profit is ${profit.toFixed(2)}. 
              {lowStockProducts.length > 0 && ` There are ${lowStockProducts.length} products currently running low on stock.`}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" className="bg-background text-foreground hover:bg-background/90 font-bold px-6">
                Analyze Growth Plan
              </Button>
              <Button variant="ghost" className="text-background hover:bg-background/10 font-bold border-background/20 border">
                View Full Audit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recent Sales Orders</CardTitle>
              <CardDescription>A list of the most recent confirmed orders.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sales" className="text-foreground font-medium flex items-center gap-1">
                View all <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-medium text-xs font-mono">{order.id}</TableCell>
                    <TableCell>{format(new Date(order.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="capitalize">{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">${Number(order.totalAmount).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts.slice(0, 4).map(product => (
              <div key={product.id} className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-destructive">Inventory Low</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Stock: {product.currentStock}</span>
                </div>
                <p className="text-xs text-muted-foreground">{product.name} ({product.sku}) is below threshold.</p>
                <Link href="/purchases/new">
                  <Button variant="link" size="sm" className="h-auto p-0 text-destructive text-xs font-semibold mt-2">
                    Order Restock
                  </Button>
                </Link>
              </div>
            ))}
            {lowStockProducts.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                All systems healthy. No critical alerts.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

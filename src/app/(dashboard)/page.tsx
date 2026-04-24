
"use client";

import { KPIGrid } from "@/components/dashboard/kpi-grid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { mockOrders } from "@/lib/mock-data";
import { ArrowUpRight, Plus, ExternalLink, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time KPIs and critical alerts from Synocre ERP.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">Export Data</Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="size-4 mr-2" /> New Order
          </Button>
        </div>
      </div>

        <KPIGrid />

        <Card className="border-none shadow-sm bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="size-32" />
          </div>
          <CardContent className="p-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none font-bold uppercase tracking-wider text-[10px] px-3">
                  AI Status Report
                </Badge>
                <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                  <Clock className="size-3" /> Updated 2m ago
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Business Health: Excellent (92%)</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-6">
                Your monthly revenue is on track to hit $1.4M. Active support tickets are down 12% this week. 
                However, I've detected a potential stock-out for 'Premium Sprockets' in 14 days based on current sales velocity.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 font-bold px-6">
                  Analyze Growth Plan
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10 font-bold border-white/20 border">
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
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>A list of the most recent orders across all regions.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/entities?tab=orders" className="text-primary font-medium flex items-center gap-1">
                View all <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === 'Shipped' ? 'default' : 
                        order.status === 'Processing' ? 'secondary' : 
                        'outline'
                      } className={
                        order.status === 'Shipped' ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none' : 
                        order.status === 'Processing' ? 'bg-primary/10 text-primary border-none' : ''
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{order.amount}</TableCell>
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
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-destructive">Inventory Low</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Priority: High</span>
              </div>
              <p className="text-xs text-muted-foreground">SKU: SYN-Y200 (Premium Sprocket) is below threshold.</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-destructive text-xs font-semibold mt-2">
                Order Restock
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-600">Sync Warning</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Priority: Med</span>
              </div>
              <p className="text-xs text-muted-foreground">Region South API took longer than expected (4.2s).</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-amber-600 text-xs font-semibold mt-2">
                View Logs
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">New Report</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Priority: Low</span>
              </div>
              <p className="text-xs text-muted-foreground">AI Quarterly analysis is now available for review.</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs font-semibold mt-2">
                View Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

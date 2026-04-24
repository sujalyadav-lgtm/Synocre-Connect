"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrders } from "@/lib/firebase/db";
import { Order } from "@/lib/types/schema";
import { format } from "date-fns";
import { Loader2, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LedgerEntry {
  id: string;
  date: number;
  description: string;
  type: "credit" | "debit";
  amount: number;
  status: string;
}

export default function AccountingPage() {
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccountingData() {
      const allOrders = await getOrders();
      
      const entries: LedgerEntry[] = allOrders
        .filter(o => o.status === "confirmed" || o.status === "fulfilled")
        .map(order => ({
          id: order.id,
          date: order.createdAt,
          description: order.type === "sales_order" ? `Sales Invoice #${order.id.slice(0,6)}` : `Purchase Order #${order.id.slice(0,6)}`,
          type: order.type === "sales_order" ? "credit" : "debit",
          amount: order.totalAmount,
          status: order.status,
        }));

      // Sort by newest first
      entries.sort((a, b) => b.date - a.date);
      setLedger(entries);
      setLoading(false);
    }
    fetchAccountingData();
  }, []);

  const totalRevenue = ledger.filter(l => l.type === "credit").reduce((sum, l) => sum + l.amount, 0);
  const totalExpenses = ledger.filter(l => l.type === "debit").reduce((sum, l) => sum + l.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting & Ledger</h1>
          <p className="text-muted-foreground mt-1">Real-time profit and loss tracking based on transactions.</p>
        </div>
        <Button variant="outline">
          <Download className="size-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl font-bold text-emerald-600 flex items-center">
              ${totalRevenue.toFixed(2)}
              <ArrowUpRight className="size-5 ml-2" />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Expenses / COGS</CardDescription>
            <CardTitle className="text-3xl font-bold text-destructive flex items-center">
              ${totalExpenses.toFixed(2)}
              <ArrowDownRight className="size-5 ml-2" />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className={netProfit >= 0 ? "bg-foreground text-background" : "bg-destructive text-destructive-foreground"}>
          <CardHeader className="pb-2">
            <CardDescription className={netProfit >= 0 ? "text-background/80" : "text-destructive-foreground/80"}>
              Net Profit
            </CardDescription>
            <CardTitle className="text-3xl font-bold">
              ${netProfit.toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Ledger</CardTitle>
          <CardDescription>All confirmed financial transactions affecting your balance sheet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="size-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : ledger.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No financial entries found.
                  </TableCell>
                </TableRow>
              ) : ledger.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{format(new Date(entry.date), "MMM d, yyyy")}</TableCell>
                  <TableCell className="font-medium">{entry.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{entry.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-destructive font-mono">
                    {entry.type === "debit" ? `$${entry.amount.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell className="text-right text-emerald-600 font-mono font-bold">
                    {entry.type === "credit" ? `$${entry.amount.toFixed(2)}` : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

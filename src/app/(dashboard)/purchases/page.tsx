"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getOrders, receivePurchaseOrder } from "@/lib/firebase/db";
import { Order } from "@/lib/types/schema";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function PurchasesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchPurchaseOrders = async () => {
    setLoading(true);
    const allOrders = await getOrders();
    const purchaseOrders = allOrders.filter(o => o.type === "purchase_order");
    setOrders(purchaseOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const handleReceiveOrder = async (orderId: string) => {
    try {
      await receivePurchaseOrder(orderId);
      toast({ title: "Success", description: "Stock received and inventory updated." });
      fetchPurchaseOrders(); // refresh
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const filteredOrders = orders.filter(o => o.id.includes(searchTerm));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground mt-1">Manage vendor POs and incoming stock replenishment.</p>
        </div>
        <Link href="/purchases/new">
          <Button className="bg-foreground hover:bg-foreground/90 text-background">
            <Plus className="size-4 mr-2" /> New PO
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Inbound Shipments</CardTitle>
            <CardDescription>A log of outward expenses and expected stock.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search PO ID..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="size-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No purchase orders found.
                  </TableCell>
                </TableRow>
              ) : filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "fulfilled" ? "default" : "secondary"} className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold">${Number(order.totalAmount).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="size-4" />
                      </Button>
                      {order.status !== "fulfilled" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReceiveOrder(order.id)}
                          className="border-foreground text-foreground hover:bg-foreground hover:text-background"
                        >
                          <CheckCircle2 className="size-4 mr-1" /> Receive
                        </Button>
                      )}
                    </div>
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

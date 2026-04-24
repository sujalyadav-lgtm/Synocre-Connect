
"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreHorizontal, Download, Users, ShoppingCart, Package } from "lucide-react";
import { mockCustomers, mockOrders, mockInventory } from "@/lib/mock-data";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function EntitiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('tab') || 'customers';
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = useMemo(() => 
    mockCustomers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())), 
  [searchTerm]);

  const filteredOrders = useMemo(() => 
    mockOrders.filter(o => o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.includes(searchTerm)), 
  [searchTerm]);

  const filteredInventory = useMemo(() => 
    mockInventory.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.sku.includes(searchTerm)), 
  [searchTerm]);

  const handleTabChange = (value: string) => {
    router.push(`/entities?tab=${value}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Data Search</h1>
          <p className="text-muted-foreground mt-1">Efficiently search and filter Synocre ERP entities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10">
            <Download className="size-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <div className="px-6 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="customers" className="gap-2">
                <Users className="size-4" /> Customers
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <ShoppingCart className="size-4" /> Orders
              </TabsTrigger>
              <TabsTrigger value="inventory" className="gap-2">
                <Package className="size-4" /> Inventory
              </TabsTrigger>
            </TabsList>
            <div className="flex w-full md:w-auto items-center gap-2">
              <div className="relative flex-1 md:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                  placeholder="Quick search..." 
                  className="pl-9 h-10 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="size-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-0 mt-6">
            <TabsContent value="customers" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-[120px] pl-6 uppercase text-[10px] font-bold">ID</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Company Name</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Industry</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Orders</TableHead>
                    <TableHead className="text-right uppercase text-[10px] font-bold pr-6">Lifetime Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((cust) => (
                    <TableRow key={cust.id}>
                      <TableCell className="font-mono text-xs pl-6">{cust.id}</TableCell>
                      <TableCell className="font-semibold">{cust.name}</TableCell>
                      <TableCell>{cust.industry}</TableCell>
                      <TableCell>{cust.orders}</TableCell>
                      <TableCell className="text-right pr-6 font-bold text-primary">{cust.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="orders" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-[120px] pl-6 uppercase text-[10px] font-bold">Order ID</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Customer</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Date</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Status</TableHead>
                    <TableHead className="text-right uppercase text-[10px] font-bold pr-6">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs pl-6">{order.id}</TableCell>
                      <TableCell className="font-semibold">{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-background">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 font-bold">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="inventory" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-[120px] pl-6 uppercase text-[10px] font-bold">SKU</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Product Name</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Stock</TableHead>
                    <TableHead className="uppercase text-[10px] font-bold">Status</TableHead>
                    <TableHead className="text-right uppercase text-[10px] font-bold pr-6">Unit Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.sku}>
                      <TableCell className="font-mono text-xs pl-6">{item.sku}</TableCell>
                      <TableCell className="font-semibold">{item.name}</TableCell>
                      <TableCell>{item.stock.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'In Stock' ? 'default' : item.status === 'Low Stock' ? 'secondary' : 'destructive'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 font-bold">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default function EntitiesPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <EntitiesContent />
    </Suspense>
  );
}

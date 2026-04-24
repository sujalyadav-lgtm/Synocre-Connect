
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Mail, Phone, ExternalLink, MoreVertical } from "lucide-react";
import { mockCustomers } from "@/lib/mock-data";

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Relationship Management</h1>
          <p className="text-muted-foreground mt-1">Manage leads, customers, and business communication history.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="size-4 mr-2" /> Add Contact
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Contact Directory</CardTitle>
            <CardDescription>A complete list of your business contacts and their lifetime value.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search contacts..." 
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
                <TableHead>Contact Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Lifetime Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="group">
                  <TableCell>
                    <div>
                      <div className="font-semibold">{customer.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Mail className="size-3" /> contact@{customer.name.toLowerCase().replace(' ', '')}.com
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal capitalize border-none bg-muted/50">
                      {customer.industry}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="font-bold text-primary">{customer.value}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="size-8">
                        <Phone className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8">
                        <ExternalLink className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreVertical className="size-4" />
                      </Button>
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

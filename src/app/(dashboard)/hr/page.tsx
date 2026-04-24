
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, Clock, CreditCard, Receipt, Briefcase, Plus, TrendingUp } from "lucide-react";

const mockEmployees = [
  { id: 'EMP-001', name: 'Sarah Connor', role: 'Lead Technician', dept: 'Hardware', status: 'Active', salary: '$85,000' },
  { id: 'EMP-002', name: 'John Doe', role: 'Support Agent', dept: 'Helpdesk', status: 'Active', salary: '$55,000' },
  { id: 'EMP-003', name: 'Kyle Reese', role: 'Warehouse Mgr', dept: 'Inventory', status: 'Active', salary: '$65,000' },
];

export default function HRPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Human Resources</h1>
          <p className="text-muted-foreground mt-1">Manage employee records, attendance, and corporate payroll.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="size-4 mr-2" /> View Attendance
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="size-4 mr-2" /> Add Employee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary text-primary-foreground">
                <Users className="size-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Headcount</p>
                <h3 className="text-2xl font-bold">12 Staff</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-emerald-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500 text-white">
                <CreditCard className="size-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Monthly Payroll</p>
                <h3 className="text-2xl font-bold">$74,200</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-orange-500 text-white">
                <Receipt className="size-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pending Expenses</p>
                <h3 className="text-2xl font-bold">12 Claims</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="gap-2"><Briefcase className="size-4" /> Directory</TabsTrigger>
          <TabsTrigger value="payroll" className="gap-2"><TrendingUp className="size-4" /> Payroll Cycles</TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2"><Clock className="size-4" /> Attendance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEmployees.map((emp) => (
              <Card key={emp.id} className="group overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="size-12 rounded-2xl bg-muted flex items-center justify-center font-bold text-muted-foreground">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{emp.name}</CardTitle>
                    <CardDescription>{emp.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 border-t bg-muted/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Department</p>
                      <p className="text-sm font-semibold">{emp.dept}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Salary (Annual)</p>
                      <p className="text-sm font-semibold">{emp.salary}</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-between mt-2">
                       <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none px-3 font-medium">
                         {emp.status}
                       </Badge>
                       <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-primary">
                         View Details
                       </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="payroll" className="mt-6">
          <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-xl bg-muted/30">
            <div className="text-center">
              <TrendingUp className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-muted-foreground">Payroll processing logic will be implemented here.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

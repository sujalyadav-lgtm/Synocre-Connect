
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Download, TrendingUp, TrendingDown, ArrowUpRight, DollarSign, PieChart } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { cn } from "@/lib/utils";

const data = [
  { month: 'Jan', income: 45000, expenses: 32000 },
  { month: 'Feb', income: 52000, expenses: 34000 },
  { month: 'Mar', income: 48000, expenses: 31000 },
  { month: 'Apr', income: 61000, expenses: 42000 },
  { month: 'May', income: 55000, expenses: 38000 },
  { month: 'Jun', income: 67000, expenses: 45000 },
];

export default function AccountingPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting & Financials</h1>
          <p className="text-muted-foreground mt-1">General ledger, cash flow analysis, and financial reporting.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="size-4 mr-2" /> Export Ledger
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <TrendingUp className="size-4 mr-2" /> Add Transaction
          </Button>
        </div>
      </div>

      <div className="bg-black text-white p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Net Profit (Current Quarter)</p>
          <h3 className="text-5xl font-black">$284,500.00</h3>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-emerald-500 text-white border-none text-[10px]">+14.2%</Badge>
            <span className="text-xs text-gray-500">since last quarter</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Total Revenue</p>
            <p className="text-xl font-bold text-emerald-400">+$1.2M</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Total Expenses</p>
            <p className="text-xl font-bold text-rose-400">-$412k</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Tax Liability</p>
            <p className="text-xl font-bold">$124k</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Accounts Receivable</p>
            <p className="text-xl font-bold text-blue-400">$84k</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm h-96">
          <CardHeader>
            <CardTitle>Cash Flow Trends</CardTitle>
            <CardDescription>Visual representation of monthly income vs expenses.</CardDescription>
          </CardHeader>
          <CardContent className="h-full pb-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  cursor={{fill: 'hsl(var(--muted))', opacity: 0.4}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                 />
                <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(var(--muted-foreground))" opacity={0.3} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                 <DollarSign className="size-4" /> Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Cloud Hosting Monthly', type: 'Expense', amount: '-$120.00', date: 'Oct 24', icon: TrendingDown, color: 'text-rose-500' },
                { label: 'Sale: INV-089 (Acme Corp)', type: 'Income', amount: '+$4,500.00', date: 'Oct 23', icon: TrendingUp, color: 'text-emerald-500' },
                { label: 'Payroll Oct Cycle', type: 'Expense', amount: '-$15,400.00', date: 'Oct 22', icon: TrendingDown, color: 'text-rose-500' },
                { label: 'Inventory Restock - Basic Bolt', type: 'Expense', amount: '-$840.00', date: 'Oct 21', icon: TrendingDown, color: 'text-rose-500' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-muted/50", tx.color)}>
                      <tx.icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{tx.label}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{tx.date} • {tx.type}</p>
                    </div>
                  </div>
                  <p className={cn("text-sm font-bold", tx.color)}>{tx.amount}</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs font-bold text-primary mt-2">
                View Full Ledger <ArrowUpRight className="size-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-none shadow-lg">
             <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="size-4" /> Quick Insights
                </CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  Your net profit is up 14% compared to this time last year. 
                  Low operational costs in 'Standard Widgets' are driving this growth.
                </p>
                <Button variant="secondary" className="w-full mt-4 bg-white/20 border-none text-white hover:bg-white/30 font-bold">
                  Generate Full Audit
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

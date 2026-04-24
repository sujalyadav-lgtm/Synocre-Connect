
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ticket, AlertCircle, Clock, Search, MessageSquare, Plus, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const mockTickets = [
  { id: 'TCK-1042', customer: 'TechNova Solutions', subject: 'Motorola Edge 50 Fusion - IC Replacement', status: 'Open', priority: 'High', date: '2h ago' },
  { id: 'TCK-1043', customer: 'Acme Corp', subject: 'Inconsistent billing in INV-892', status: 'Pending', priority: 'Medium', date: '5h ago' },
  { id: 'TCK-1044', customer: 'Globex Ltd', subject: 'Unable to login to portal', status: 'Closed', priority: 'Low', date: '1d ago' },
];

export default function HelpdeskPage() {
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Helpdesk</h1>
          <p className="text-muted-foreground mt-1">Direct customer support tickets and issue resolution management.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> New Ticket
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Ticket List */}
        <Card className="w-80 flex flex-col border-none shadow-sm overflow-hidden bg-card">
          <CardHeader className="p-4 border-b bg-muted/20">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search tickets..." className="pl-9 h-9 text-xs" />
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {mockTickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-muted/30 transition-colors border-l-4",
                    selectedTicket.id === ticket.id ? "bg-primary/5 border-primary" : "border-transparent"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{ticket.id}</span>
                    <span className="text-[10px] text-muted-foreground">{ticket.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold truncate">{ticket.subject}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={cn(
                      "text-[10px] h-5 px-1.5 border-none",
                      ticket.priority === 'High' ? "bg-destructive/10 text-destructive" :
                      ticket.priority === 'Medium' ? "bg-orange-500/10 text-orange-600" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {ticket.priority}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground truncate">{ticket.customer}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Ticket Detail */}
        <Card className="flex-1 flex flex-col border-none shadow-sm overflow-hidden">
          <CardHeader className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{selectedTicket.subject}</h2>
                  <Badge className={cn(
                    "border-none",
                    selectedTicket.status === 'Open' ? "bg-emerald-500/10 text-emerald-600" :
                    selectedTicket.status === 'Pending' ? "bg-orange-500/10 text-orange-600" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {selectedTicket.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Ticket className="size-4" /> {selectedTicket.id}</span>
                  <span className="flex items-center gap-1.5"><Search className="size-4" /> {selectedTicket.customer}</span>
                  <span className="flex items-center gap-1.5"><Clock className="size-4" /> Created {selectedTicket.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Mark Resolved</Button>
                <Button variant="outline" size="icon" className="size-9">
                  <AlertCircle className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col bg-muted/10">
            <ScrollArea className="flex-1 p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                    JD
                  </div>
                  <div className="space-y-1">
                    <div className="bg-background border p-4 rounded-2xl rounded-tl-none shadow-sm">
                      <p className="text-sm">Hi support team, our Motorola Edge 50 Fusion is failing to charge. We suspect the power IC needs replacement. Can you provide a quote and ETA for this repair?</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground">10:45 AM</span>
                  </div>
                </div>
                
                <div className="flex gap-4 flex-row-reverse">
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground shrink-0">
                    SA
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none shadow-sm inline-block">
                      <p className="text-sm">Hello Acme, we've received your request. One of our lead technicians is reviewing the IC requirements. We'll have a quote ready for you shortly.</p>
                    </div>
                    <br />
                    <span className="text-[10px] text-muted-foreground text-right inline-block">11:12 AM</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-emerald-500/5 text-emerald-600 border-none flex items-center gap-1 px-4 py-1">
                    <CheckCircle2 className="size-3" /> System: Added to priority queue
                  </Badge>
                </div>
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t bg-background">
              <div className="max-w-3xl mx-auto flex gap-2">
                <div className="flex-1 relative">
                   <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                   <Input placeholder="Type your reply here..." className="pl-10 h-11" />
                </div>
                <Button className="h-11 px-6">Send Reply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

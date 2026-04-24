
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { ProtectedRoute } from "@/components/providers/protected-route";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur px-4">
            <SidebarTrigger />
            <div className="flex-1 max-w-md ml-4 hidden md:flex items-center gap-2 bg-muted/50 rounded-full px-4 h-10 border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="size-4 text-muted-foreground" />
              <input 
                placeholder="Search customers, orders, inventory..." 
                className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-muted-foreground"
              />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full border-2 border-background" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="hidden lg:block text-right">
                  <p className="text-sm font-medium leading-none">Alex Sterling</p>
                  <p className="text-xs text-muted-foreground mt-1">Admin Analyst</p>
                </div>
                <Avatar className="size-9 border-2 border-primary/20">
                  <AvatarImage src="https://picsum.photos/seed/synocre_user/150/150" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <AIAssistant />
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

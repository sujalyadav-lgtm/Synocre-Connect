
"use client";

import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  Settings, 
  Bell, 
  LogOut, 
  Package, 
  Users, 
  ShoppingCart, 
  LifeBuoy, 
  Briefcase, 
  Calculator,
  MessageSquare
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: FileText, label: "AI Reports", href: "/reports" },
  { icon: Search, label: "Detailed Search", href: "/entities" },
];

const erpModules = [
  { icon: Users, label: "CRM", href: "/crm" },
  { icon: ShoppingCart, label: "Sales & Orders", href: "/sales" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Briefcase, label: "Purchases", href: "/purchases" },
  { icon: Calculator, label: "Accounting", href: "/accounting" },
  { icon: LifeBuoy, label: "Helpdesk", href: "/helpdesk" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-none bg-foreground flex items-center justify-center text-background font-bold text-xl shadow-lg border border-border">
            S
          </div>
          <span className="font-headline font-bold text-lg tracking-tight group-data-[collapsible=icon]:hidden">
            Synocre Connect
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">ERP Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {erpModules.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Notifications">
              <Bell className="size-4" />
              <span>Notifications</span>
              <div className="ml-auto size-2 rounded-full bg-destructive group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="size-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

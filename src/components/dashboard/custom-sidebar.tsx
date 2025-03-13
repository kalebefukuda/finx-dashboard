'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  Home,
  ListOrdered,
  BarChart3,
  Target,
  LineChart,
  Timer,
} from "lucide-react"

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/" },
  { title: "Lançamentos", icon: ListOrdered, href: "/lancamentos" },
  { title: "Gráficos", icon: BarChart3, href: "/graficos" },
  { title: "Metas", icon: Target, href: "/metas" },
  { title: "Investimentos", icon: LineChart, href: "/investimentos" },
  { title: "Orçamento", icon: Timer, href: "/orcamento" },
]

export function CustomSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Image src="/images/finx-logo.svg" width={60} height={24} alt="FinX logo" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 mt-10">
        <SidebarMenu className="flex flex-col gap-1">
          {menuItems.map(({ title, icon: Icon, href }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === href}
                tooltip={title}
                size="lg"
              >
                <Link href={href}>
                  <Icon className="h-4 w-4" />
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 pt-1">
        <div className="flex items-center gap-2 px-4 py-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-muted" />
          <span className="text-muted-foreground">John Doe</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

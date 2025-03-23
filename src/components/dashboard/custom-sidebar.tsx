'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { signOut } from "next-auth/react"

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
  Bot,
  Settings,
} from "lucide-react"

import { useMountedTheme } from "@/hooks/use-mounted-theme"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useUser } from "@/contexts/userContext"

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/" },
  { title: "Lançamentos", icon: ListOrdered, href: "/movements" },
  { title: "Gráficos", icon: BarChart3, href: "/graficos" },
  { title: "Metas", icon: Target, href: "/goals" },
  { title: "Investimentos", icon: LineChart, href: "/investments" },
  { title: "Análise", icon: Bot, href: "/ai-review" },
]

export function CustomSidebar() {
  const router = useRouter()
  const { user, loading } = useUser()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/sign-in" })
  }

  const pathname = usePathname()
  const { theme, setTheme, mounted } = useMountedTheme()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          {mounted && (
            <Image
              src={theme === "dark" ? "/images/finx-logo-light.svg" : "/images/finx-logo.svg"}
              width={70}
              height={24}
              alt="FinX Logo"
            />
          )}
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
            <div className="px-2 py-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-1 px-2 h-8 text-xs">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/placeholder.svg?height=34&width=34" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-xs ml-2 font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-xs">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-3 w-3" />
                    <span className="text-xs">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-2">
                    {theme === "dark" ? <Sun className="mr-2 h-3 w-3" /> : <Moon className="mr-2 h-3 w-3" />}
                    <span className="text-xs">{theme === "dark" ? "Light" : "Dark"} Theme</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <span className="text-xs">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
    </Sidebar>
  )
}

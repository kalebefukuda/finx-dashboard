'use client'
import { SidebarProvider } from "@/components/ui/sidebar"
import { CustomSidebar } from "@/components/dashboard/custom-sidebar"
import { UserProvider } from "@/contexts/userContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <CustomSidebar />
        <div className="flex flex-col flex-1 overflow-auto bg-background">
          {children}
        </div>
      </div>
    </SidebarProvider>
    </UserProvider>
  )
}

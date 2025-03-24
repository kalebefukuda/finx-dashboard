import { SidebarProvider } from "@/components/ui/sidebar"
import { CustomSidebar } from "@/components/dashboard/custom-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <CustomSidebar />
        <div className="flex flex-col flex-1 overflow-auto bg-background">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

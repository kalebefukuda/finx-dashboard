'use client'

import { AssetsList } from "@/components/dashboard/assets-list"
import { MonthlySummary } from "@/components/dashboard/monthly-summary"
import { HighlightCards } from "@/components/dashboard/highlight-cards"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { CustomSidebar } from "@/components/dashboard/custom-sidebar"
import { AssetsChart } from "@/components/dashboard/assets-chart"
import { PortfolioDonutChart } from "@/components/dashboard/portfolio-donut"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <div className="flex flex-col flex-1 overflow-auto bg-background w-screen">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4 md:px-6">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filtros</span>
                </Button>
              </div>
            </div>
          </header>
          <main className="container mx-auto p-4 md:p-6 flex-1 overflow-auto">
            <div className=" flex flex-col gap-6">
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <HighlightCards />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AssetsChart />
              <PortfolioDonutChart />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <AssetsList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
